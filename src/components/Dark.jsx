import React from "react";
import "../assets/dark.css";

const DarkMode = () => {
  return (
    <div className="min-h-screen p-8" data-theme="dark">
      <h1 className="text-4xl font-bold">Dark Mode</h1>
      <p className="mt-4 text-lg">Enjoy browsing in Dark Mode! 🌙</p>
    </div>
  );
};

export default DarkMode;
