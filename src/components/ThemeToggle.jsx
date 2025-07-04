import React, { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem("app_theme");
    return storedTheme || "light";
  });

  useEffect(() => {
    // Apply theme to document and store in localStorage
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div id="theme-toggle" onClick={toggleTheme}>
      <div className="action">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
        >
          <path d="M400.67-400.67q-34-34-62.17-72t-50.83-81q-7 18-10.17 36.5T274.33-480q0 85.67 60 145.67 60 60 145.67 60 18.67 0 36.83-3.34Q535-281 553-287.67q-43-22.66-80.67-50.83-37.66-28.17-71.66-62.17Zm47.66-46.66q50.34 50.33 111 86.5Q620-324.67 690-304.67q-38.67 47-93.33 72.5Q542-206.67 481-206.67q-113.67 0-193.5-79.83T207.67-480q0-61 25.5-115.67 25.5-54.66 72.5-93.33 20 70 56.16 130.67 36.17 60.66 86.5 111Zm279.34 84q-16.67-4.34-33.17-9.34t-32.17-11.66q12-22 18.17-46.17 6.17-24.17 6.17-49.5 0-86.33-60.17-146.5T480-686.67q-25.33 0-49.5 6.17t-46.17 18.17q-6-15.67-10.83-31.67t-9.17-32.67q27.34-13 56.67-19.83 29.33-6.83 60-6.83 113.67 0 193.5 79.83T754.33-480q0 30.67-6.83 60t-19.83 56.67ZM446.67-840v-120h66.66v120h-66.66Zm0 840v-120h66.66V0h-66.66Zm311.66-710.67-47.66-47.66 85-84 47.66 46.66-85 85Zm-594 593-47.66-46.66 85-85 47.66 47.66-85 84Zm675.67-329v-66.66h120v66.66H840Zm-840 0v-66.66h120v66.66H0Zm795.67 330-85-85 47.66-47.66 84 85-46.66 47.66Zm-594-594-84-85 46.66-47.66 85 85-47.66 47.66Zm199 310Z" />
        </svg>
      </div>
    </div>
  );
}

export default ThemeToggle;
