import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const FileDropzone = ({ file, onChange, busy }) => (
  <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-brand-300 bg-brand-50/70 px-6 py-14 text-center transition hover:border-brand-500 dark:border-brand-800 dark:bg-brand-950/30">
    <CloudArrowUpIcon className="h-12 w-12 text-brand-500" />
    <p className="mt-4 font-display text-xl font-semibold text-slate-900 dark:text-white">
      Drop your resume here or click to browse
    </p>
    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Supports PDF, DOC, and DOCX up to 5MB.</p>
    <input
      type="file"
      className="hidden"
      accept=".pdf,.doc,.docx"
      disabled={busy}
      onChange={(event) => onChange(event.target.files?.[0] || null)}
    />
    {file && <p className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-600">{file.name}</p>}
  </label>
);

export default FileDropzone;

