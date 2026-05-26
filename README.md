# NexusStream — Premium Custom Video Player Platform

A production-quality, futuristic streaming web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. No frameworks, no build step — open and run.

![NexusStream](https://picsum.photos/seed/nexusreadme/1200/400)

## Project Information

| | |
|---|---|
| **Name** | NexusStream |
| **Type** | Multi-page video streaming platform demo |
| **Videos** | 320+ mock titles with metadata |
| **Pages** | 25+ fully designed screens |

## Features

- **Custom video player** — Play/pause, seek, volume, speed, fullscreen, PiP, theater & mini player modes
- **Playlist management** — Create, edit, delete, sort, auto-play (48 demo playlists)
- **Subtitle support** — Multi-language tracks, styling, sync offset UI
- **Watch history** — 120 sessions, resume playback, continue watching
- **Analytics dashboard** — Bar, line, pie charts & progress rings (Canvas)
- **Video library** — Search, filter by genre, sort by popularity/rating/date
- **Recommendations** — AI-style suggestion UI with carousels
- **Downloads** — Offline manager with progress bars
- **Comments & reviews** — 280 demo discussions with ratings
- **Notifications** — 85 activity items + toast system
- **Theme customization** — Presets, custom colors, light/dark mode (localStorage)
- **Responsive design** — Mobile, tablet, desktop optimized

## Technologies Used

- HTML5 (`<video>`, semantic markup)
- CSS3 (variables, Grid, Flexbox, animations, glassmorphism)
- Vanilla JavaScript (ES6 modules pattern via IIFEs)
- Canvas API (analytics charts)
- localStorage (themes, history, favorites, playlists)

## How to Run in VS Code

### Step 1: Install Visual Studio Code

Download from [https://code.visualstudio.com/](https://code.visualstudio.com/) and install.

### Step 2: Open the Project Folder

1. Launch VS Code
2. **File → Open Folder**
3. Select the `Video Player` folder (this project root)

### Step 3: Install Live Server Extension

1. Open Extensions (`Ctrl+Shift+X`)
2. Search **Live Server**
3. Install **Live Server** by Ritwick Dey

### Step 4: Launch the App

1. Right-click `index.html` in the Explorer
2. Click **Open with Live Server**
3. Your browser opens at `http://127.0.0.1:5500` (port may vary)

> **Important:** Use Live Server (or similar) instead of opening HTML files directly (`file://`). Video streaming and some APIs work best over HTTP.

### Alternative: Python HTTP Server

```bash
cd "Video Player"
python -m http.server 8080
```

Then visit `http://localhost:8080`

## Folder Structure

```
Video Player/
├── index.html              # Landing page
├── dashboard.html          # Main dashboard
├── player.html             # Custom video player
├── playlists.html          # Playlist management
├── history.html            # Watch history
├── analytics.html          # Analytics dashboard
├── library.html            # Video library
├── subtitles.html          # Subtitle settings
├── downloads.html          # Download manager
├── settings.html           # App settings
├── profile.html            # User profile
├── themes.html             # Theme customization
├── ... (20+ more pages)
├── css/
│   ├── style.css           # Global styles & layout
│   ├── player.css          # Video player UI
│   ├── dashboard.css       # Cards, playlists, comments
│   ├── themes.css          # Theme picker UI
│   └── responsive.css      # Breakpoints
├── js/
│   ├── data.js             # Demo datasets (320 videos, etc.)
│   ├── app.js              # Core app, navigation, cards
│   ├── player.js           # Playback controls & shortcuts
│   ├── playlists.js        # Playlist CRUD
│   ├── subtitles.js        # Subtitle preferences
│   ├── analytics.js        # Chart rendering
│   ├── themes.js           # Theme persistence
│   ├── notifications.js    # Toasts & notification list
│   └── search.js           # Search & filters
├── assets/
│   ├── videos/             # Place local video files here
│   ├── subtitles/          # Place .vtt subtitle files here
│   ├── audio/              # Audio-only assets
│   └── images/             # Local images
└── README.md
```

## Custom Player Controls

| Control | Action |
|---------|--------|
| Space / K | Play / Pause |
| F | Fullscreen |
| M | Mute |
| ← / → | Seek ±5 seconds |
| ↑ / ↓ | Volume |
| ? | Shortcuts panel |

Additional UI: 10s skip, playback speed (0.5x–2x), PiP, theater mode, mini player, bookmarks, sleep timer, cast UI, subtitles overlay.

## Playlist System

- View 48 pre-populated playlists
- **Create Playlist** adds to localStorage
- **Edit** / **Delete** modify stored playlists
- **Play All** opens first video in player

## Subtitle System

- 48+ language track entries (demo)
- Font size, color, background opacity
- Sync offset slider (−5s to +5s)
- Preferences saved to `localStorage` (`nexus_sub_prefs`)

## Analytics Dashboard

- Watch time by month (bar chart)
- Daily views (line chart)
- Category breakdown (pie chart)
- Engagement / retention / completion (SVG rings)
- Top 15 videos table & device breakdown

## Demo Datasets

All data is generated in `js/data.js`:

| Dataset | Count |
|---------|-------|
| Videos | 320 |
| Playlists | 48 |
| Comments | 280 |
| Watch history | 120 |
| Notifications | 85 |
| Downloads | 35 |
| Subtitle tracks | 48+ |
| Categories | 20 genres |

Sample videos use Google CDN test streams (Big Buck Bunny, Sintel, etc.).

## Theme Customization

1. Open **Themes** page or click 🎨 in header
2. Choose a preset (Midnight, Aurora, Forest, Sunset, Ocean, Light)
3. Or pick custom primary/accent colors
4. Settings persist via `localStorage` (`nexus_theme`)

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Safari 15+ | ✅ PiP may vary |

## Usage Guide

1. Start from **Home** (`index.html`) for the landing experience
2. Go to **Dashboard** for personalized rows and stats
3. Click any video card to open **Player**
4. Use **Library** or **Search** to browse 320 titles
5. Check **Analytics** for viewing insights

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Videos won't play | Use Live Server; check internet (CDN videos) |
| Sidebar missing | Ensure `js/app.js` loads after `js/data.js` |
| Charts empty | Resize window or refresh; canvas redraws on resize |
| Theme not saving | Enable cookies/localStorage in browser |
| Search returns nothing | Clear filters; try shorter query |

## Performance Optimization

- Lazy-loaded thumbnails (`loading="lazy"`)
- Efficient DOM templates (string builders)
- CSS animations use GPU-friendly transforms
- Intersection Observer for scroll reveals
- Debounced search input (300ms)

## License

Demo project for educational and portfolio use. Video samples are from public test CDNs. All titles, users, and metadata are fictional.

---

**NexusStream** — Cinema-grade streaming, reimagined in vanilla web tech.
