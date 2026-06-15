import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-2xl border border-white/20 bg-white/70 p-3 text-slate-700 transition hover:scale-105 dark:bg-slate-900/70 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;

