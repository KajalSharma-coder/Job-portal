const StatCard = ({ label, value, helper, accent = "from-brand-500 to-cyan-500" }) => (
  <div className="glass-panel p-6">
    <div className={`inline-flex rounded-2xl bg-gradient-to-r ${accent} px-3 py-1 text-xs font-semibold text-white`}>
      {label}
    </div>
    <p className="mt-5 font-display text-4xl font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
  </div>
);

export default StatCard;

