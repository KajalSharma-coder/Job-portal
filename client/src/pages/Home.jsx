import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CpuChipIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import LandingNavbar from "../components/LandingNavbar";

const features = [
  {
    title: "AI Resume Analyzer",
    description: "Score resumes, detect missing keywords, and get tailored suggestions in seconds.",
    icon: SparklesIcon,
  },
  {
    title: "ML Job Matching",
    description: "Use clustering and regression-based scoring to recommend high-fit roles.",
    icon: CpuChipIcon,
  },
  {
    title: "Visual Analytics",
    description: "Track score breakdowns, skill distribution, and match predictions with charts.",
    icon: ChartBarIcon,
  },
];

const workflow = [
  {
    title: "Upload Resume",
    description: "Drop in your PDF or DOCX resume and let the parser extract the important content.",
    icon: DocumentArrowUpIcon,
  },
  {
    title: "Analyze with AI",
    description: "Get a structured score, strengths, weaknesses, suggestions, and keyword coverage.",
    icon: SparklesIcon,
  },
  {
    title: "Track and Apply",
    description: "Review job matches, study dashboards, and use the feedback to improve fast.",
    icon: EyeIcon,
  },
];

const Home = () => (
  <div className="relative overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <LandingNavbar />

      <section className="grid gap-10 py-12 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full border border-brand-200 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-600 shadow-sm dark:border-brand-900 dark:bg-slate-900/70">
            Internship-ready AI recruitment platform
          </span>
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Turn resumes into <span className="gradient-text">job-winning insights</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            HirePilot combines a polished job portal, AI resume analysis, leaderboard analytics, and admin workflows in one modern MERN app.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/signup" className="btn-primary">
              Launch Dashboard
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/leaderboard" className="btn-secondary">
              View Leaderboard
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["92%", "Average keyword coverage"],
              ["3x", "Faster resume review cycle"],
              ["24/7", "AI scoring and matching"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/20 bg-white/70 p-5 dark:bg-slate-900/70">
                <p className="font-display text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel relative overflow-hidden p-5 sm:p-6"
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative space-y-5">
            <div className="rounded-3xl bg-slate-950 p-5 text-white dark:bg-slate-900">
              <p className="text-sm text-slate-300">Resume score</p>
              <p className="mt-3 font-display text-5xl font-bold">89</p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/80 p-5 dark:bg-slate-900/80">
                <p className="text-sm text-slate-500 dark:text-slate-400">Job match</p>
                <p className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">94%</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Full Stack MERN Developer</p>
              </div>
              <div className="rounded-3xl bg-white/80 p-5 dark:bg-slate-900/80">
                <p className="text-sm text-slate-500 dark:text-slate-400">Top skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["React", "Node.js", "MongoDB", "Tailwind"].map((skill) => (
                    <span key={skill} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3">
                <CheckBadgeIcon className="mt-0.5 h-6 w-6 text-emerald-500" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">AI tip of the day</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Add measurable impact like percentages, user counts, or delivery improvements to raise your resume score faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="grid gap-6 pb-10 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-r from-brand-600 to-cyan-500 p-3 text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>

      <section id="workflow" className="grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Workflow</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            One portal for analysis, matching, and career visibility.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Built like a clean recruiting dashboard with modern visuals, role-based access, analytics, and AI-guided improvements.
          </p>
          <div className="mt-8 space-y-4">
            {workflow.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-3xl border border-white/20 bg-white/70 p-5 dark:bg-slate-900/70">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-cyan-500 p-3 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            ["Smart ATS scoring", "Understand how your resume performs before recruiters see it."],
            ["Cluster-based matching", "Group resumes and jobs into skill-aligned categories."],
            ["Regression predictions", "Estimate suitability for each recommended role."],
            ["Admin analytics", "Manage jobs and monitor platform growth from one workspace."],
          ].map(([title, description], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default Home;
