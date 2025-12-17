// data.js — bearbeite/erweitere hier deinen Skill-Tree.
// Hinweis: Für YouTube nutze am besten Embed-Links (https://www.youtube.com/embed/VIDEO_ID)

window.SKILL_TREE = {
  id: "root",
  name: "UrbanKiz Lernplattform",
  category: "root",
  role: "both",
  difficulty: 1,
  children: [
    {
      id: "skills",
      name: "Universelle Skills",
      category: "skill-group",
      role: "both",
      difficulty: 1,
      children: [
        {
          id: "skill-balance-axis",
          name: "Balance & Achse",
          category: "skill",
          role: "both",
          difficulty: 2,
          goal: "Stabile Achse, sauberer Weight Transfer, kontrollierte Micro-Adjustments.",
          prereq: [],
          cues: [
            "Gewicht wirklich über dem Standbein",
            "Rippen über Becken, Kopf 'schwebt' nach oben",
            "Kleine Schritte, kontrollierte Landung"
          ],
          fixes: [
            "Wackeln → Schrittgröße reduzieren, langsamer zählen",
            "Kippen nach vorn/hinten → Becken neutral, Core aktiv"
          ],
          drills: [
            "Solo: Slow walk (8 Counts pro Schritt), Fokus auf Achse",
            "Partner: Micro-leads mit minimalem Druck/Zug"
          ],
          tags: ["foundation", "weight transfer", "axis"],
          video: ""
        },
        {
          id: "skill-frame-connection",
          name: "Frame / Connection Technik",
          category: "skill",
          role: "both",
          difficulty: 3,
          goal: "Klarer Frame ohne Steifheit; stabile Connection für Richtungswechsel & Stops.",
          prereq: [],
          cues: [
            "Tonischer Frame (nicht 'hart')",
            "Kontaktpunkte konstant halten",
            "Impulse klein, aber eindeutig"
          ],
          fixes: [
            "Zu viel Kraft → kleinere Impulse, Atmung entspannen",
            "Follower verliert Kontakt → Ellbogen 'getragen', Hand weich"
          ],
          drills: [
            "Partner: 2-Hand-Connection, nur Richtungswechsel (ohne Schritte)",
            "Partner: Stop & go (Leader initiiert, Follower bremst sauber)"
          ],
          tags: ["connection", "frame", "lead/follow"],
          video: ""
        },
        {
          id: "skill-core-tension",
          name: "Core / Körperspannung",
          category: "skill",
          role: "both",
          difficulty: 2,
          goal: "Core aktiv für Stabilität, aber Beweglichkeit bleibt erhalten.",
          prereq: [],
          cues: [
            "Core 'einpacken' – ohne Brust zu heben",
            "Becken neutral, Knie weich",
            "Spannung dosieren: nur so viel wie nötig"
          ],
          fixes: [
            "Zu steif → Spannung reduzieren, Mobilität testen",
            "Zu weich → Atem + Core-Engagement, kleinere Schritte"
          ],
          drills: [
            "Solo: Plank Variationen (kurz), danach sofort Basic Steps",
            "Partner: Pressure/Release in Zeitlupe (Kontrolle prüfen)"
          ],
          tags: ["foundation", "core"],
          video: ""
        }
      ]
    },

    {
      id: "basics",
      name: "Kizomba / UrbanKiz Basics",
      category: "basics-group",
      role: "both",
      difficulty: 1,
      children: [
        {
          id: "basic-1",
          name: "Basic 1",
          category: "basic",
          role: "both",
          difficulty: 1,
          goal: "Sauberes Timing und Weight Transfer im Grundschritt.",
          prereq: ["skill-balance-axis"],
          cues: [
            "Gewicht vollständig übertragen",
            "Oberkörper ruhig, Schritte klein",
            "Timing konstant"
          ],
          fixes: [
            "Hüpfen → Knie weich, Schritte flacher",
            "Out of time → zählen, Metronom nutzen"
          ],
          drills: [
            "Solo: 2 Minuten Basic 1 mit Metronom",
            "Partner: Basic 1 in Close Connection, Fokus auf Ruhe"
          ],
          tags: ["basic", "timing"],
          video: ""
        },
        {
          id: "basic-2",
          name: "Basic 2",
          category: "basic",
          role: "both",
          difficulty: 2,
          goal: "Stabiler Basic 2 mit klarer Direction und sauberer Connection.",
          prereq: ["basic-1", "skill-frame-connection"],
          cues: [
            "Prep im Frame (Leader) / Response im Center (Follower)",
            "Keine großen Armbewegungen",
            "Körper führt, Hände begleiten"
          ],
          fixes: [
            "Leader 'zieht' → Prep über Körperrotation/Center",
            "Follower 'fällt' → Achse, kleinere Steps"
          ],
          drills: [
            "Partner: Basic 2 nur über Center (Hände super leicht)",
            "Partner: Basic 2 + Stop auf 4/8"
          ],
          tags: ["basic", "connection"],
          video: ""
        },
        {
          id: "corridinho",
          name: "Corridinho",
          category: "basic",
          role: "both",
          difficulty: 2,
          goal: "Circular Feeling, konstante Connection, kontrollierte Schritte.",
          prereq: ["basic-1", "skill-frame-connection"],
          cues: ["Kreis aus dem Center", "Schritte klein", "Konstante Distanz"],
          fixes: ["Zu groß → Steps verkleinern", "Connection bricht → Frame stabilisieren"],
          drills: ["Partner: Corridinho 1 Minute links/rechts, dann Stop"],
          tags: ["basic", "circular"],
          video: ""
        },
        {
          id: "retrocesso",
          name: "Retrocesso",
          category: "basic",
          role: "both",
          difficulty: 3,
          goal: "Clean backward travel ohne Ziehen/Schieben.",
          prereq: ["basic-2", "skill-balance-axis"],
          cues: ["Follower: Rückwärts über Toe-heel", "Leader: Platz schaffen, nicht ziehen"],
          fixes: ["Stolpern → kleinere Steps, Tempo runter", "Leader zieht → Frame stabil, Center lead"],
          drills: ["Partner: Retrocesso in 50% Tempo, dann normal"],
          tags: ["travel", "backward"],
          video: ""
        }
      ]
    },

    {
      id: "elements",
      name: "UrbanKiz Elemente",
      category: "elements-group",
      role: "both",
      difficulty: 1,
      children: [
        {
          id: "slides",
          name: "Slides (Familie)",
          category: "element-group",
          role: "both",
          difficulty: 2,
          children: [
            {
              id: "slide-fundamentals",
              name: "Slide Fundamentals (Mechanik)",
              category: "element",
              role: "both",
              difficulty: 2,
              goal: "Gleitbewegung aus dem Center, kontrollierte Länge, keine Instabilität.",
              prereq: ["basic-2", "skill-core-tension"],
              cues: [
                "Gleiten statt 'Schritt setzen'",
                "Micro-Impulse im Frame",
                "Kontrolliertes Ende (Stop möglich)"
              ],
              fixes: [
                "Rutschen/Wegrutschen → Grip prüfen, Steps kürzer",
                "Follower verliert Achse → Tempo runter, Achse resetten"
              ],
              drills: [
                "Solo: Side glide in Zeitlupe, 8 Counts",
                "Partner: Slide + Stop (Leader markiert Stop klar)"
              ],
              tags: ["slide", "mechanics"],
              video: ""
            },
            {
              id: "slide-side-basic",
              name: "Slide Side (Basic)",
              category: "element",
              role: "both",
              difficulty: 3,
              goal: "Saubere Side-Slides mit gleichbleibender Connection.",
              prereq: ["slide-fundamentals"],
              cues: ["Körper führt", "Distanz bleibt", "Endpunkt kontrolliert"],
              fixes: ["Zu groß → Micro Slide üben", "Arme arbeiten → Center lead"],
              drills: ["Partner: 4x Slide Side rechts/links, dann Pause"],
              tags: ["slide", "side"],
              video: ""
            },
            {
              id: "slide-side-stop",
              name: "Variation: Slide Side + Stop",
              category: "variation",
              role: "both",
              difficulty: 4,
              goal: "Slide und abruptes Stoppen ohne Nachschwingen.",
              prereq: ["slide-side-basic", "skill-frame-connection"],
              cues: ["Stop über Körper, nicht Hand", "Follower bleibt 'stacked'"],
              fixes: ["Nachschwingen → kürzeres Slide, klarer Stop"],
              drills: ["Partner: Random Stops nach 1–3 Slides"],
              tags: ["slide", "stop", "variation"],
              video: ""
            }
          ]
        },

        {
          id: "contras",
          name: "Contra-saída (Familie)",
          category: "element-group",
          role: "both",
          difficulty: 3,
          children: [
            {
              id: "contra-concept",
              name: "Contra-saída Concept",
              category: "element",
              role: "both",
              difficulty: 3,
              goal: "Verstehen: Richtungswechsel/Exit-Logik ohne Kraft.",
              prereq: ["basic-2", "skill-frame-connection"],
              cues: ["Prep, dann Exit", "Follower spürt 'path'", "Leader macht Raum"],
              fixes: ["Ziehen → Prep verkleinern", "Follower blockt → Timing reduzieren"],
              drills: ["Partner: Contra Prep ohne Schritte, nur Center"],
              tags: ["contra", "direction change"],
              video: ""
            },
            {
              id: "contra-entry-basic",
              name: "Contra-saída – Basic Entry",
              category: "element",
              role: "both",
              difficulty: 4,
              goal: "Stabiler Entry, klare Achse, sauberer Exit-Punkt.",
              prereq: ["contra-concept", "skill-balance-axis"],
              cues: ["Entry langsam", "Exit-Punkt markieren", "Frame konstant"],
              fixes: ["Unklar → Entry verlangsamen, Cue zählen", "Follower fällt → Steps kürzer"],
              drills: ["Partner: 10 Wiederholungen Entry → Reset"],
              tags: ["contra", "entry"],
              video: ""
            }
          ]
        }
      ]
    },

    {
      id: "combos",
      name: "Figuren & Kombis (Beispiele)",
      category: "combos-group",
      role: "both",
      difficulty: 2,
      children: [
        {
          id: "combo-01",
          name: "Kombi 01: Basic 2 → Slide Side → Stop",
          category: "combo",
          role: "both",
          difficulty: 3,
          goal: "Anwendung: Übergänge sauber, Timing stimmt, Stop klar.",
          prereq: ["basic-2", "slide-side-basic", "slide-side-stop"],
          cues: ["Übergang über Center", "Stop bewusst setzen", "Reset danach"],
          fixes: ["Hektisch → Tempo runter, klare Counts", "Connection bricht → Frame check"],
          drills: ["Partner: Kombi 5x, dann isoliert nur Übergang üben"],
          tags: ["combo", "slides", "stop"],
          video: ""
        }
      ]
    }
  ]
};
