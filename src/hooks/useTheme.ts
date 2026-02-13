import { useState, useEffect } from "react";
import { onThemeChange, type Theme } from "../theme.ts";

function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  useEffect(() => {
    return onThemeChange(setTheme);
  }, []);

  return theme;
}
