import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("job_portal_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncProfile = async () => {
      const token = localStorage.getItem("job_portal_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/users/profile");
        setUser(data.user);
        localStorage.setItem("job_portal_user", JSON.stringify(data.user));
      } catch (error) {
        localStorage.removeItem("job_portal_token");
        localStorage.removeItem("job_portal_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncProfile();
  }, []);

  const persistAuth = (payload) => {
    localStorage.setItem("job_portal_token", payload.token);
    localStorage.setItem("job_portal_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const signup = async (values) => {
    const { data } = await api.post("/auth/signup", values);
    persistAuth(data);
    toast.success("Account created successfully");
  };

  const login = async (values) => {
    const { data } = await api.post("/auth/login", values);
    persistAuth(data);
    toast.success("Welcome back");
  };

  const loginWithGoogle = async (token) => {
    const { data } = await api.post("/auth/google", { token });
    persistAuth(data);
    toast.success("Signed in with Google");
  };

  const loginWithGoogleDemo = async () => {
    const { data } = await api.post("/auth/google", {
      email: "demo.google.user@example.com",
      name: "Google Demo User",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    });
    persistAuth(data);
    toast.success("Signed in with Google demo");
  };

  const logout = () => {
    localStorage.removeItem("job_portal_token");
    localStorage.removeItem("job_portal_user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        loginWithGoogleDemo,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
