import {
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getNavigationItems } from "../data/navigation";
import Logo from "./Logo";

const Sidebar = () => {
  const { user } = useAuth();
  const navItems = getNavigationItems(user?.role);

  return (
    <aside className="glass-panel sticky top-6 hidden h-[calc(100vh-3rem)] w-72 flex-col p-6 lg:flex">
      <Logo />
      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-lg shadow-brand-500/20"
                  : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        );
        })}
      </nav>
      <div className="mt-auto rounded-3xl bg-gradient-to-br from-brand-600 to-emerald-400 p-5 text-white">
        <ArrowTrendingUpIcon className="h-8 w-8" />
        <p className="mt-4 font-display text-lg font-semibold">Grow faster with AI insights</p>
        <p className="mt-2 text-sm text-white/85">Track your score, fix gaps, and target stronger applications.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
