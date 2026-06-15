import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => (
  <footer className="mt-12 border-t border-white/10 bg-slate-950/70 backdrop-blur-xl">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
      <div>
        <Logo />
        <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
          HirePilot helps candidates analyze resumes, discover high-fit jobs, and improve their career story with AI-driven feedback.
        </p>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-white">Explore</h3>
        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
          <Link to="/" className="transition hover:text-brand-300">Home</Link>
          <Link to="/login" className="transition hover:text-brand-300">Login</Link>
          <Link to="/signup" className="transition hover:text-brand-300">Create account</Link>
          <Link to="/leaderboard" className="transition hover:text-brand-300">Leaderboard</Link>
        </div>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-white">Built For</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-400">
          <p>Students and interns improving resume quality.</p>
          <p>Admins managing job listings and analytics.</p>
          <p>Recruitment-style dashboards with modern MERN UI.</p>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 px-4 py-4 text-center text-xs uppercase tracking-[0.25em] text-slate-500 sm:px-6 lg:px-8">
      HirePilot • AI Job Portal • MongoDB Local Ready
    </div>
  </footer>
);

export default Footer;

