import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState<string>(savedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
