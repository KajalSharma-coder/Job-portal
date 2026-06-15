import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

const AuthPage = ({ mode = "login" }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, loginWithGoogleDemo } = useAuth();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      await loginWithGoogleDemo();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign in failed");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google sign in did not return a token");
      return;
    }

    setBusy(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign in failed");
    } finally {
      setBusy(false);
    }
  };

  const hasGoogleClientId = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-2">
        <div className="hidden flex-col justify-center lg:flex">
          <span className="inline-flex w-fit rounded-full border border-brand-200 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-600 dark:border-brand-900 dark:bg-slate-900/70">
            AI-powered career intelligence
          </span>
          <h1 className="mt-8 font-display text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Build your next application with <span className="gradient-text">real feedback</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Track resume quality, discover roles matched to your skills, and compare your standing on the leaderboard.
          </p>
        </div>

        <div className="glass-panel mx-auto w-full max-w-xl p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <Logo />
            <ThemeToggle />
          </div>
          <div className="mt-10">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {isLogin
                ? "Login to continue exploring your resume intelligence dashboard."
                : "Start analyzing resumes and getting smart job recommendations."}
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                className="input-field"
                placeholder="Full name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
            )}
            <input
              className="input-field"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            <input
              className="input-field"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />
            <button type="submit" className="btn-primary w-full" disabled={busy}>
              {busy ? "Please wait..." : isLogin ? "Login" : "Sign up"}
            </button>
          </form>

          <div className="mt-5">
            {hasGoogleClientId ? (
              <div className="overflow-hidden rounded-2xl">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google sign in failed")}
                  theme="outline"
                  size="large"
                  text={isLogin ? "signin_with" : "signup_with"}
                  shape="pill"
                  width="100%"
                />
              </div>
            ) : (
              <button type="button" onClick={handleGoogle} disabled={busy} className="btn-secondary w-full">
                Continue with Google Demo
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <Link className="font-semibold text-brand-600" to={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Create an account" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
