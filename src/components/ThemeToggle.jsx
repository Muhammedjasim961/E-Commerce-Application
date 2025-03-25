import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode
      ? "dark bg-gray-900 text-white"
      : "light bg-white text-black";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`m-5 border border-amber-400 flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 
      border ${
        darkMode
          ? "bg-gray-400 text-amber-400 hover:bg-gray-700 p-4"
          : "bg-white text-amber-300 hover:bg-gray-200"
      }`}
    >
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
