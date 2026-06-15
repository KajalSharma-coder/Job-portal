import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import Topbar from "../components/Topbar";
import api from "../services/api";

const defaultForm = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  description: "",
  skills: "",
  salaryRange: "",
  experienceLevel: "Entry",
};

const AdminPanel = () => {
  const [overview, setOverview] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const loadAdminData = async () => {
    try {
      const [overviewRes, jobsRes] = await Promise.all([api.get("/admin/overview"), api.get("/jobs")]);
      setOverview(overviewRes.data);
      setJobs(jobsRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin access required");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      await api.post("/jobs", {
        ...form,
        skills: form.skills.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean),
      });
      toast.success("Job created");
      setForm(defaultForm);
      await loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader label="Loading admin analytics..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Topbar title="Admin Panel" subtitle="Manage jobs, monitor users, and track platform analytics." />
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard label="Users" value={overview?.metrics?.userCount || 0} helper="Registered users on the platform." />
        <StatCard label="Resumes" value={overview?.metrics?.resumeCount || 0} helper="Uploaded resumes analyzed so far." accent="from-emerald-500 to-teal-400" />
        <StatCard label="Jobs" value={overview?.metrics?.jobCount || 0} helper="Live job listings in the system." accent="from-amber-500 to-orange-400" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Create Job Listing" subtitle="Add a new opening to the recommendation pool.">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {[
              ["title", "Job title"],
              ["company", "Company"],
              ["location", "Location"],
              ["salaryRange", "Salary range"],
            ].map(([key, label]) => (
              <input
                key={key}
                className="input-field"
                placeholder={label}
                value={form[key]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              />
            ))}
            <textarea
              className="input-field min-h-32"
              placeholder="Job description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            />
            <input
              className="input-field"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={(event) => setForm((current) => ({ ...current, skills: event.target.value }))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="input-field"
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              >
                <option>Full-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
              <select
                className="input-field"
                value={form.experienceLevel}
                onChange={(event) => setForm((current) => ({ ...current, experienceLevel: event.target.value }))}
              >
                <option>Entry</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy ? "Saving..." : "Create Job"}
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Recent Users" subtitle="Newest registrations and their latest resume score.">
          <div className="space-y-4">
            {overview?.recentUsers?.map((item) => (
              <div key={item._id} className="rounded-3xl border border-white/20 bg-white/70 p-4 dark:bg-slate-900/70">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand-600">{item.latestResumeScore}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Managed Jobs" subtitle="Current listings available for recommendation." className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-3xl border border-white/20 bg-white/70 p-5 dark:bg-slate-900/70">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{job.company} · {job.location}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardLayout>
  );
};

export default AdminPanel;

