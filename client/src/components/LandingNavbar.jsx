import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Leaderboard", href: "/leaderboard" },
];

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 mb-8">
      <div className="glass-panel flex items-center justify-between px-4 py-3 sm:px-5">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-brand-600 dark:text-slate-300">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-brand-600 dark:text-slate-300">
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-2xl border border-white/20 bg-white/70 p-3 text-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
            aria-label="Toggle navigation"
          >
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-panel mt-3 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800/70"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800/70"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
              Login
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary w-full">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;

