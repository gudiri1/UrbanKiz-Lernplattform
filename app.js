/* app.js — Tree render, search/filter, detail view, local progress. */
(() => {
  const STORAGE_KEY = "uk_skilltree_completed_v1";

  const els = {
    tree: document.getElementById("tree"),
    detail: document.getElementById("detail"),
    emptyState: document.getElementById("emptyState"),
    detailTitle: document.getElementById("detailTitle"),
    detailCategory: document.getElementById("detailCategory"),
    detailRole: document.getElementById("detailRole"),
    detailDifficulty: document.getElementById("detailDifficulty"),
    detailGoal: document.getElementById("detailGoal"),
    detailPrereq: document.getElementById("detailPrereq"),
    detailCues: document.getElementById("detailCues"),
    detailFixes: document.getElementById("detailFixes"),
    detailDrills: document.getElementById("detailDrills"),
    detailTags: document.getElementById("detailTags"),
    videoWrap: document.getElementById("videoWrap"),
    toggleComplete: document.getElementById("toggleComplete"),
    copyLink: document.getElementById("copyLink"),
    searchInput: document.getElementById("searchInput"),
    clearSearch: document.getElementById("clearSearch"),
    roleFilter: document.getElementById("roleFilter"),
    difficultyFilter: document.getElementById("difficultyFilter"),
    resetFilters: document.getElementById("resetFilters"),
    expandAll: document.getElementById("expandAll"),
    collapseAll: document.getElementById("collapseAll"),
    progressFill: document.getElementById("progressFill"),
    progressText: document.getElementById("progressText"),
    year: document.getElementById("year"),
  };

  els.year.textContent = new Date().getFullYear();

  const state = {
    activeId: null,
    expanded: new Set(),
    completed: loadCompleted(),
    nodesById: new Map(),
    flattened: [],
    filters: { query: "", role: "all", maxDifficulty: 5 },
  };

  // Build lookup maps
  function indexTree(node, parentId = null) {
    const normalized = normalizeNode(node, parentId);
    state.nodesById.set(normalized.id, normalized);
    state.flattened.push(normalized);
    if (normalized.children?.length) normalized.children.forEach(ch => indexTree(ch, normalized.id));
  }

  function normalizeNode(node, parentId) {
    const n = { ...node };
    n.parentId = parentId;
    n.children = (n.children || []).map(ch => normalizeNode(ch, n.id));
    n.prereq = n.prereq || [];
    n.cues = n.cues || [];
    n.fixes = n.fixes || [];
    n.drills = n.drills || [];
    n.tags = n.tags || [];
    n.goal = n.goal || "";
    n.video = n.video || "";
    return n;
  }

  indexTree(window.SKILL_TREE);

  // Default expand top-level
  (window.SKILL_TREE.children || []).forEach(n => state.expanded.add(n.id));

  // Render
  function render() {
    els.tree.innerHTML = "";
    const rootUl = document.createElement("ul");
    window.SKILL_TREE.children.forEach(node => {
      const li = renderBranch(node);
      if (li) rootUl.appendChild(li);
    });
    els.tree.appendChild(rootUl);

    updateProgress();
    syncDetailCompleteButton();
  }

  function renderBranch(node) {
    const visible = isNodeVisible(node);
    const anyVisibleChild = (node.children || []).some(ch => hasVisible(ch));
    if (!visible && !anyVisibleChild) return null;

    const li = document.createElement("li");
    li.className = "branch";

    const row = document.createElement("div");
    row.className = "row";
    row.setAttribute("role", "treeitem");
    row.dataset.id = node.id;

    const isGroup = (node.children || []).length > 0;
    const expanded = state.expanded.has(node.id);

    const chev = document.createElement("div");
    chev.className = "chev";
    chev.textContent = isGroup ? (expanded ? "▾" : "▸") : "•";
    row.appendChild(chev);

    const check = document.createElement("div");
    check.className = "check" + (state.completed.has(node.id) ? " done" : "");
    check.title = "Abgeschlossen (lokal)";
    check.textContent = state.completed.has(node.id) ? "✓" : "✓";
    row.appendChild(check);

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = node.name;
    row.appendChild(name);

    const badges = document.createElement("div");
    badges.className = "badges";
    badges.appendChild(badge(node.role || "both"));
    badges.appendChild(badge("Lvl " + (node.difficulty || 1)));
    row.appendChild(badges);

    if (state.activeId === node.id) row.classList.add("active");

    // Interactions
    row.addEventListener("click", (e) => {
      // If clicking the checkbox area, toggle complete.
      const isOnCheck = e.target === check || (e.target?.classList?.contains("check"));
      const isOnChev = e.target === chev || (e.target?.classList?.contains("chev"));

      if (isOnCheck) {
        toggleComplete(node.id);
        e.stopPropagation();
        return;
      }

      if (isGroup && isOnChev) {
        toggleExpanded(node.id);
        e.stopPropagation();
        return;
      }

      // Default: select node
      setActive(node.id);

      // Also allow toggling group by clicking chevron area; if group selected and user clicks row, keep it open.
      if (isGroup && !expanded) {
        state.expanded.add(node.id);
        render();
      }
    });

    li.appendChild(row);

    if (isGroup && expanded) {
      const ul = document.createElement("ul");
      (node.children || []).forEach(child => {
        const childLi = renderBranch(child);
        if (childLi) ul.appendChild(childLi);
      });
      li.appendChild(ul);
    }

    return li;
  }

  function badge(text) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = text;
    return b;
  }

  function hasVisible(node) {
    if (isNodeVisible(node)) return true;
    return (node.children || []).some(ch => hasVisible(ch));
  }

  function isNodeVisible(node) {
    const { query, role, maxDifficulty } = state.filters;

    const dOk = (node.difficulty || 1) <= maxDifficulty;

    const roleNorm = (node.role || "both").toLowerCase();
    const rOk =
      role === "all" ||
      roleNorm === role ||
      roleNorm === "both" ||
      role === "both";

    const q = query.trim().toLowerCase();
    if (!q) return dOk && rOk;

    const hay = [
      node.name,
      node.category,
      node.goal,
      ...(node.tags || []),
      ...(node.cues || []),
      ...(node.fixes || []),
      ...(node.drills || []),
    ].join(" ").toLowerCase();

    const qOk = hay.includes(q);

    return dOk && rOk && qOk;
  }

  function setActive(id) {
    state.activeId = id;
    const node = state.nodesById.get(id);
    if (!node) return;

    els.emptyState.classList.add("hidden");
    els.detail.classList.remove("hidden");

    els.detailTitle.textContent = node.name;
    els.detailCategory.textContent = labelCategory(node.category);
    els.detailRole.textContent = "Rolle: " + (node.role || "both");
    els.detailDifficulty.textContent = "Schwierigkeit: " + (node.difficulty || 1);

    els.detailGoal.textContent = node.goal || "—";

    renderList(els.detailPrereq, (node.prereq || []).map(id => {
      const n = state.nodesById.get(id);
      return n ? n.name : id;
    }), "Keine");

    renderList(els.detailCues, node.cues, "—");
    renderList(els.detailFixes, node.fixes, "—");
    renderList(els.detailDrills, node.drills, "—");

    els.detailTags.innerHTML = "";
    (node.tags || []).forEach(t => {
      const el = document.createElement("span");
      el.className = "tag";
      el.textContent = t;
      els.detailTags.appendChild(el);
    });
    if (!(node.tags || []).length) {
      const el = document.createElement("span");
      el.className = "muted";
      el.textContent = "—";
      els.detailTags.appendChild(el);
    }

    renderVideo(node.video);

    syncDetailCompleteButton();

    // Update URL hash
    const newHash = "#node=" + encodeURIComponent(id);
    if (location.hash !== newHash) history.replaceState(null, "", newHash);

    // Ensure all ancestors expanded so selection stays visible after filter changes
    expandAncestors(id);
    render();
  }

  function renderList(ul, items, emptyText) {
    ul.innerHTML = "";
    if (!items || !items.length) {
      const li = document.createElement("li");
      li.textContent = emptyText;
      ul.appendChild(li);
      return;
    }
    items.forEach(it => {
      const li = document.createElement("li");
      li.textContent = it;
      ul.appendChild(li);
    });
  }

  function renderVideo(url) {
    els.videoWrap.innerHTML = "";
    if (!url) {
      const placeholder = document.createElement("div");
      placeholder.className = "video-placeholder";
      placeholder.innerHTML = '<div class="muted">Füge pro Node eine Video-URL hinzu (YouTube Embed oder MP4). Siehe <code>data.js</code>.</div>';
      els.videoWrap.appendChild(placeholder);
      return;
    }

    const isMp4 = /\.mp4(\?.*)?$/i.test(url);

    if (isMp4) {
      const v = document.createElement("video");
      v.controls = true;
      v.src = url;
      els.videoWrap.appendChild(v);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      els.videoWrap.appendChild(iframe);
    }
  }

  function labelCategory(cat) {
    const m = {
      "skill-group": "Skill-Gruppe",
      "skill": "Skill",
      "basics-group": "Basics-Gruppe",
      "basic": "Basic",
      "elements-group": "Elemente-Gruppe",
      "element-group": "Element-Familie",
      "element": "Element",
      "variation": "Variation",
      "combos-group": "Kombis",
      "combo": "Kombi",
      "root": "Root",
    };
    return m[cat] || (cat || "—");
  }

  function toggleExpanded(id) {
    if (state.expanded.has(id)) state.expanded.delete(id);
    else state.expanded.add(id);
    render();
  }

  function expandAncestors(id) {
    let cur = state.nodesById.get(id);
    while (cur && cur.parentId) {
      state.expanded.add(cur.parentId);
      cur = state.nodesById.get(cur.parentId);
    }
  }

  function toggleComplete(id) {
    if (state.completed.has(id)) state.completed.delete(id);
    else state.completed.add(id);

    saveCompleted(state.completed);
    updateProgress();
    syncDetailCompleteButton();
    render();
  }

  function syncDetailCompleteButton() {
    const id = state.activeId;
    if (!id) return;
    const done = state.completed.has(id);
    els.toggleComplete.textContent = done ? "Als offen markieren" : "Als abgeschlossen markieren";
  }

  function loadCompleted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  function saveCompleted(set) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  }

  function updateProgress() {
    // Only count leaf-ish content nodes (exclude groups/root) as "trackable"
    const trackable = state.flattened.filter(n => !String(n.category || "").endsWith("group") && n.category !== "root");
    const done = trackable.filter(n => state.completed.has(n.id)).length;
    const total = trackable.length || 1;
    const pct = Math.round((done / total) * 100);
    els.progressFill.style.width = pct + "%";
    els.progressText.textContent = `${done}/${trackable.length} abgeschlossen`;
  }

  // UI wiring
  els.toggleComplete.addEventListener("click", () => {
    if (!state.activeId) return;
    toggleComplete(state.activeId);
  });

  els.copyLink.addEventListener("click", async () => {
    if (!state.activeId) return;
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      els.copyLink.textContent = "Kopiert";
      setTimeout(() => (els.copyLink.textContent = "Link kopieren"), 900);
    } catch {
      // Fallback: select text via prompt
      window.prompt("Kopiere den Link:", url);
    }
  });

  els.searchInput.addEventListener("input", () => {
    state.filters.query = els.searchInput.value || "";
    render();
  });

  els.clearSearch.addEventListener("click", () => {
    els.searchInput.value = "";
    state.filters.query = "";
    render();
    els.searchInput.focus();
  });

  els.roleFilter.addEventListener("change", () => {
    state.filters.role = els.roleFilter.value;
    render();
  });

  els.difficultyFilter.addEventListener("change", () => {
    state.filters.maxDifficulty = parseInt(els.difficultyFilter.value, 10) || 5;
    render();
  });

  els.resetFilters.addEventListener("click", () => {
    els.searchInput.value = "";
    els.roleFilter.value = "all";
    els.difficultyFilter.value = "5";
    state.filters = { query: "", role: "all", maxDifficulty: 5 };
    render();
  });

  els.expandAll.addEventListener("click", () => {
    state.flattened.forEach(n => {
      if ((n.children || []).length) state.expanded.add(n.id);
    });
    render();
  });

  els.collapseAll.addEventListener("click", () => {
    state.expanded.clear();
    // Keep top-level groups collapsed but selectable; expand root's children? We'll keep them collapsed.
    render();
  });

  // Deep link
  function trySelectFromHash() {
    const m = location.hash.match(/node=([^&]+)/);
    if (!m) return;
    const id = decodeURIComponent(m[1]);
    if (state.nodesById.has(id)) setActive(id);
  }
  window.addEventListener("hashchange", trySelectFromHash);

  // Initial
  render();
  trySelectFromHash();
})();
