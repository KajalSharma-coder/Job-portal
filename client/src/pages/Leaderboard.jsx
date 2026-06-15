import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import Topbar from "../components/Topbar";
import api from "../services/api";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const { data } = await api.get("/users/leaderboard");
        setLeaders(data);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader label="Loading the leaderboard..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Topbar title="Leaderboard" subtitle="Top candidates ranked by their latest resume score." />
      <SectionCard title="Top Candidates" subtitle="A live ranking of the strongest resumes in the platform.">
        <div className="overflow-hidden rounded-3xl border border-white/20">
          <div className="grid grid-cols-[0.6fr_1.8fr_1fr_1.2fr] bg-slate-900 px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <span>Rank</span>
            <span>Candidate</span>
            <span>Score</span>
            <span>Skills</span>
          </div>
          <div className="divide-y divide-white/10 bg-white/70 dark:bg-slate-900/70">
            {leaders.map((candidate) => (
              <div key={candidate._id} className="grid grid-cols-[0.6fr_1.8fr_1fr_1.2fr] items-center gap-4 px-6 py-5 text-sm">
                <span className="font-display text-lg font-bold text-brand-500">#{candidate.rank}</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{candidate.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.email}</p>
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{candidate.latestResumeScore}</span>
                <div className="flex flex-wrap gap-2">
                  {(candidate.skills || []).slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
};

export default Leaderboard;

