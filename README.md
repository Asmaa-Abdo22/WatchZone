# 🎬 WatchZone - Video Streaming Platform Clone

WatchZone is a modern video streaming platform clone built with **React**, **Tailwind CSS**, and **React Query**. It allows users to browse, search, and watch videos, view channel information, and explore recommended videos.

---

### 🔗 Live Demo  
[🚀 SwiftShop Ecommerce - Live Demo](https://asmaa-abdo22.github.io/WatchZone/)  

## Features

- Responsive design with **light** and **dark** modes.
- Video playback with embedded video player.
- Fetch video details including views, likes, description, and publishing date.
- Display channel information with subscriber count.
- Comments section with avatars, likes, and replies.
- Search functionality with live results.
- Recommended videos sidebar with clickable video previews.
- Mobile-friendly navigation and sidebar.
- Smooth scrolling to top when switching videos.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Flowbite, React Router DOM
- **State Management:** React Query
- **API:** Axios
- **Icons:** Lucide React
- **Utilities:** Day.js
- **Notifications:** React Hot Toast

---

## Folder Structure

   ```bash
watchzone-clone/
│
├─ public/                 
├─ src/
│  ├─ api/                  # Axios instance & API functions
│  ├─ assets/               # Images, videos, icons
│  ├─ components/           # Reusable components (Navbar, Sidebar, VideoCard, etc.)
│  ├─ pages/                # Page components (Home, VideoPlayer, SearchResults)             
│  ├─ App.jsx               # Main App component
│  └─ main.jsx              # Entry point
├─ .env                     # Environment variables
├─ package.json
└─ README.md
 ```

## Key Components
- Navbar: Search input, theme toggle, microphone, notifications, and avatar
- Sidebar: Categories navigation and collapse/expand functionality
- PlayVideo: Video player, details, channel info, description, comments, and recommended videos
- Loading: Loading spinner for async fetch operations
- ThemeToggle: Light and dark mode switching with localStorage persistence

## Usage
- Browse the homepage for trending videos.
- Click any video to watch it with details, channel info, and comments
- Use the search bar to find videos by keywords.
- Click on recommended videos to navigate to their pages
- Toggle between light and dark themes using the icon in the navbar

👩‍💻 Developed by [Asmaa Abdo](https://github.com/asmaa-abdo22) 



