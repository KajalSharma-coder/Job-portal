import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SectionCard from "../components/SectionCard";
import Topbar from "../components/Topbar";
import api from "../services/api";

const AnalysisReport = () => {
  const [searchParams] = useSearchParams();
  const [resume, setResume] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const id = searchParams.get("id");
        if (id) {
          const { data } = await api.get(`/resume/${id}`);
          setResume(data);
        } else {
          const { data } = await api.get("/resume/insights");
          setResume(data.resume);
          setInsights(data);
          setLoading(false);
          return;
        }

        const insightsRes = await api.get("/resume/insights");
        setInsights(insightsRes.data);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [searchParams]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader label="Preparing your AI analysis report..." />
      </DashboardLayout>
    );
  }

  if (!resume) {
    return (
      <DashboardLayout>
        <Topbar title="Analysis Report" subtitle="Upload a resume to see your report." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Topbar title="Analysis Report" subtitle={`Detailed insights for ${resume.fileName}`} />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Strengths" subtitle="High-signal positives detected in your resume.">
          <div className="space-y-3">
            {resume.strengths.map((item) => (
              <div key={item} className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Weaknesses" subtitle="Areas that could limit ATS or recruiter response.">
          <div className="space-y-3">
            {resume.weaknesses.map((item) => (
              <div key={item} className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Improvement Suggestions" subtitle="Concrete next steps to improve your resume.">
          <div className="space-y-3">
            {resume.suggestions.map((item) => (
              <div key={item} className="rounded-2xl bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Keyword Match Analysis" subtitle="Matched and missing keywords from the analyzer vocabulary.">
          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Matched keywords</p>
              <div className="flex flex-wrap gap-2">
                {resume.matchedKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Missing keywords</p>
              <div className="flex flex-wrap gap-2">
                {resume.missingKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Regression Graph" subtitle="Suitability score versus predicted job match.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={insights?.regressionSeries || []}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="job" angle={-18} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="suitabilityScore" stroke="#0f97ff" strokeWidth={3} />
                <Line type="monotone" dataKey="matchPercentage" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Clustering Visualization" subtitle="Simple K-means-inspired grouping of jobs and your resume profile.">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis type="number" dataKey="x" name="Index" />
                <YAxis type="number" dataKey="y" name="Match" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={insights?.clusteringSeries || []} fill="#0f97ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
};

export default AnalysisReport;

