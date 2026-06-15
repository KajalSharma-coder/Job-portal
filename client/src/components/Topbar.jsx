import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Topbar = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">HirePilot Workspace</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/resume-upload" className="btn-secondary hidden md:inline-flex">
          Upload Resume
        </Link>
        {user && (
          <button type="button" onClick={logout} className="btn-primary">
            {user.name?.split(" ")[0]} · Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;

