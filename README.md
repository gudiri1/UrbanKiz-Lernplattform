# UrbanKiz Skill-Tree (MVP)

Eine erste, schlanke Web-Version deiner Lernplattform als **statisches** Projekt (HTML/CSS/JS).
Enthält:

- Skill-Tree Sidebar (auf-/zuklappbar)
- Suche + Filter (Rolle, max. Schwierigkeit)
- Detailansicht pro Knoten (Ziel, Prerequisites, Cues, Fixes, Drills, Tags)
- Fortschritts-Tracking (lokal via LocalStorage)
- Deep-Linking per URL-Hash (`#node=<id>`)

## Lokales Starten

Option A: direkt öffnen  
- `index.html` im Browser öffnen

Option B: kleiner lokaler Server (empfohlen)  
```bash
# Python
python -m http.server 8000
# dann: http://localhost:8000
```

## Inhalte erweitern

Bearbeite `data.js`:

- Neue Knoten unter `children` ergänzen
- Für Videos:
  - YouTube: `https://www.youtube.com/embed/VIDEO_ID`
  - MP4: z. B. `assets/videos/meinvideo.mp4`

## GitHub Pages Deployment

1. Repo erstellen, Files committen
2. GitHub → Settings → Pages
3. Source: `Deploy from a branch`, Branch: `main` / Folder: `/root`
4. URL öffnen

## Nächste sinnvolle Ausbaustufe (optional)

- Admin-Editor (Knoten per UI pflegen)
- Prerequisite-Graph (mehrere Eltern / „Baum + Links“)
- Upload/Feedback (Coach Add-on)
- User Accounts & Sync (statt LocalStorage)
