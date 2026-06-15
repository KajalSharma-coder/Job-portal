import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResumeUpload = lazy(() => import("./pages/ResumeUpload"));
const AnalysisReport = lazy(() => import("./pages/AnalysisReport"));
const JobRecommendations = lazy(() => import("./pages/JobRecommendations"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

const App = () => (
  <Suspense fallback={<Loader label="Preparing the portal..." />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/analysis-report" element={<AnalysisReport />} />
        <Route path="/job-recommendations" element={<JobRecommendations />} />
      </Route>
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
