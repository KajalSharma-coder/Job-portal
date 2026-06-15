import {
  BriefcaseIcon,
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const getNavigationItems = (role = "user") => {
  const items = [
    { label: "Dashboard", icon: HomeIcon, to: "/dashboard" },
    { label: "Upload Resume", icon: ClipboardDocumentCheckIcon, to: "/resume-upload" },
    { label: "Analysis Report", icon: ChartPieIcon, to: "/analysis-report" },
    { label: "Job Matches", icon: BriefcaseIcon, to: "/job-recommendations" },
    { label: "Leaderboard", icon: TrophyIcon, to: "/leaderboard" },
  ];

  if (role === "admin") {
    items.push({ label: "Admin Panel", icon: UsersIcon, to: "/admin" });
  }

  return items;
};

