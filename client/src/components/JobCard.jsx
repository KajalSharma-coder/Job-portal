const JobCard = ({ job }) => (
  <div className="rounded-3xl border border-white/20 bg-white/70 p-5 transition hover:-translate-y-1 dark:bg-slate-900/60">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {job.company} · {job.location} · {job.type}
        </p>
      </div>
      <div className="rounded-2xl bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
        {job.matchPercentage}% match
      </div>
    </div>
    <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{job.description}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {job.skills.map((skill) => (
        <span key={skill} className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
      <span className="font-semibold text-slate-700 dark:text-slate-200">{job.salaryRange}</span>
      <span className="text-slate-500 dark:text-slate-400">Suitability: {job.suitabilityScore}/100</span>
    </div>
  </div>
);

export default JobCard;

