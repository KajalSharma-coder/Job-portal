const Loader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500 dark:border-slate-700 dark:border-t-brand-400" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
);

export default Loader;

