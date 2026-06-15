import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import FileDropzone from "../components/FileDropzone";
import SectionCard from "../components/SectionCard";
import Topbar from "../components/Topbar";
import api from "../services/api";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a resume file first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setBusy(true);
    try {
      const { data } = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resume analyzed successfully");
      navigate(`/analysis-report?id=${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DashboardLayout>
      <Topbar title="Resume Upload" subtitle="Upload your latest resume to unlock AI analysis and job matching." />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Upload Resume" subtitle="We extract text, score your resume, and generate improvement insights.">
          <FileDropzone file={file} onChange={setFile} busy={busy} />
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={handleUpload} disabled={busy}>
              {busy ? "Analyzing..." : "Analyze Resume"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setFile(null)} disabled={busy}>
              Clear
            </button>
          </div>
        </SectionCard>

        <SectionCard title="What you’ll get" subtitle="A complete report instead of a simple upload confirmation.">
          <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <div className="rounded-3xl bg-white/70 p-5 dark:bg-slate-900/70">
              Resume score from 0 to 100 with ATS, impact, content, and formatting breakdown.
            </div>
            <div className="rounded-3xl bg-white/70 p-5 dark:bg-slate-900/70">
              Strengths, weaknesses, and practical suggestions to improve callbacks.
            </div>
            <div className="rounded-3xl bg-white/70 p-5 dark:bg-slate-900/70">
              Keyword match analysis and job-fit recommendations powered by simple ML logic.
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
};

export default ResumeUpload;

