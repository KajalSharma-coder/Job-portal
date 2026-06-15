import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import SkeletonCard from "../components/SkeletonCard";
import StatCard from "../components/StatCard";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthContext";

const COLORS = ["#0f97ff", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444"];

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileRes, insightsRes] = await Promise.allSettled([
          api.get("/users/profile"),
          api.get("/resume/insights"),
        ]);

        if (profileRes.status === "fulfilled") {
          setProfile(profileRes.value.data);
        }

        if (insightsRes.status === "fulfilled") {
          setInsights(insightsRes.value.data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Topbar title="Dashboard" subtitle="Loading your analytics workspace." />
        <div className="grid gap-6 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </DashboardLayout>
    );
  }

  const score = profile?.latestResume?.score || user?.latestResumeScore || 0;
  const latestResume = profile?.latestResume;

  return (
    <DashboardLayout>
      <Topbar
        title={`Welcome, ${profile?.user?.name?.split(" ")[0] || user?.name?.split(" ")[0] || "User"}`}
        subtitle="Track your latest resume health, skill momentum, and role-fit predictions."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard label="Resume Score" value={score} helper="Latest AI evaluation across ATS, content, and impact." />
        <StatCard
          label="Detected Skills"
          value={latestResume?.keywords?.length || profile?.user?.skills?.length || 0}
          helper="Keywords extracted from your most recent resume."
          accent="from-emerald-500 to-teal-400"
        />
        <StatCard
          label="Top Match"
          value={`${insights?.recommendations?.[0]?.matchPercentage || 0}%`}
          helper={insights?.recommendations?.[0]?.title || "Upload a resume to unlock job matching"}
          accent="from-amber-500 to-orange-400"
        />
      </div>

      {!latestResume ? (
        <SectionCard
          title="Start with your first resume"
          subtitle="Upload a resume to unlock AI analysis, analytics, and job recommendations."
          className="mt-6"
          action={<Link to="/resume-upload" className="btn-primary">Upload Resume</Link>}
        >
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Once your resume is uploaded, we’ll generate a score, highlight strengths and gaps, and rank job opportunities by fit.
          </p>
        </SectionCard>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SectionCard title="Resume Score Breakdown" subtitle={`Latest file: ${latestResume.fileName}`}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(latestResume.scoreBreakdown || {}).map(([name, value]) => ({ name, value }))}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {Object.entries(latestResume.scoreBreakdown || {}).map(([name], index) => (
                      <Cell key={name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Skill Distribution" subtitle="Detected resume keywords weighted by confidence.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={latestResume.skillDistribution || []} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                    {(latestResume.skillDistribution || []).map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <SectionCard
          title="Strengths"
          subtitle="Highlights the strongest parts of your current resume."
          action={<Link to="/analysis-report" className="btn-secondary">Open full report</Link>}
        >
          <div className="space-y-3">
            {(latestResume?.strengths || ["Upload a resume to generate AI strengths."]).map((item) => (
              <div key={item} className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recommended Jobs"
          subtitle="Top-ranked opportunities based on your current skills and score."
          action={<Link to="/job-recommendations" className="btn-secondary">See all matches</Link>}
        >
          <div className="space-y-4">
            {(insights?.recommendations || []).slice(0, 3).map((job) => (
              <div key={job._id} className="rounded-3xl border border-white/20 bg-white/70 p-5 dark:bg-slate-900/70">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{job.company} · {job.location}</p>
                  </div>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                    {job.matchPercentage}% match
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.sharedSkills?.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {!insights?.recommendations?.length && <p className="text-sm text-slate-500 dark:text-slate-400">Recommendations will appear here after resume analysis.</p>}
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

