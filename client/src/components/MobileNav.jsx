import { NavLink } from "react-router-dom";
import { getNavigationItems } from "../data/navigation";
import { useAuth } from "../context/AuthContext";

const MobileNav = () => {
  const { user } = useAuth();
  const items = getNavigationItems(user?.role);

  return (
    <div className="glass-panel sticky top-4 z-30 mb-6 flex gap-2 overflow-x-auto p-2 lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-cyan-500 text-white"
                  : "text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNav;
