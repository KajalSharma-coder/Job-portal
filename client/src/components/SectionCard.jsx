const SectionCard = ({ title, subtitle, action, children, className = "" }) => (
  <section className={`glass-panel p-6 ${className}`}>
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
);

export default SectionCard;

