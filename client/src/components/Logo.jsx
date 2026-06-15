const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-emerald-400 text-lg font-extrabold text-white shadow-lg shadow-brand-500/30">
      AI
    </div>
    <div>
      <p className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">HirePilot</p>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Job Portal</p>
    </div>
  </div>
);

export default Logo;

