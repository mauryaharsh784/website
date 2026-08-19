import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid username or password");
      }

      if (!data.token) {
        throw new Error("Login successful, but token was not received");
      }

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      // Save admin information if available
      if (data.admin) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
      }

      // Optional flag
      localStorage.setItem("isAdmin", "true");

      // Redirect to admin dashboard
      navigate("/admin/grievances", { replace: true });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message || "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="w-full max-w-md rounded-3xl border border-forest/10 bg-surface p-8 shadow-[0_25px_60px_-25px_rgba(15,61,46,0.3)]">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-heading">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-ink/60">
            Gram Panchayat Administration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-heading">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className="w-full rounded-xl border border-forest/15 bg-page px-4 py-3 text-sm text-heading outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/10"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-heading">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-forest/15 bg-page px-4 py-3 text-sm text-heading outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/10"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-saffron px-4 py-3 font-semibold text-white transition hover:bg-saffron-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}