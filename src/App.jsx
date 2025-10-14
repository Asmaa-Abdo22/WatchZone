import { useState } from "react";
import { applyTheme } from "./components/ThemeToggle";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="min-h-screen bg-[--bg-main] text-[--text-primary] dark:bg-[--bg-main-dark] dark:text-[--text-primary-dark]">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎬 YouTube Clone</h1>
        <button
          onClick={toggleTheme}
          className="p-2 border rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
        >
          {theme == "dark" ? "  🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        ❤
      </div>

      {/* Main Content */}
      <div className="p-4">
        <p className="text-lg mb-6">
          Welcome to your YouTube clone! Toggle the theme to see it in action.
        </p>

        <div className="p-6 rounded-xl bg-[--bg-card] dark:bg-[--bg-card-dark] shadow-md">
          <p>This is a sample video card in {theme} mode.</p>
        </div>
      </div>
    </div>
  );
}
