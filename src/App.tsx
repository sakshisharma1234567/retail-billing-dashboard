import { useState } from "react";
import type { FormEvent } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserPlus,
  LogIn,
} from "lucide-react";

import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Billing from "./components/Billing";

type AuthMode = "signin" | "signup";
type AppPage = "dashboard" | "products" | "billing";

interface User {
  name: string;
  email: string;
  password: string;
}

function App() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [page, setPage] = useState<AppPage>("dashboard");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // SIGN UP
    if (mode === "signup") {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Please fill in all required fields.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      const existingUser = localStorage.getItem("retailpro-user");

      if (existingUser) {
        const user: User = JSON.parse(existingUser);

        if (user.email === email.trim()) {
          setError("An account with this email already exists.");
          return;
        }
      }

      const newUser: User = {
        name: name.trim(),
        email: email.trim(),
        password,
      };

      localStorage.setItem(
        "retailpro-user",
        JSON.stringify(newUser)
      );

      setSuccess(
        "Account created successfully. Please sign in."
      );

      setName("");
      setPassword("");
      setMode("signin");

      return;
    }

    // SIGN IN VALIDATION
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // MOCK ADMIN LOGIN
    if (
      email.trim() === "admin@retailpro.com" &&
      password === "admin123"
    ) {
      setIsLoggedIn(true);
      setPage("dashboard");
      return;
    }

    // REGISTERED USER LOGIN
    const savedUser = localStorage.getItem("retailpro-user");

    if (!savedUser) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    const user: User = JSON.parse(savedUser);

    if (
      user.email !== email.trim() ||
      user.password !== password
    ) {
      setError("Invalid email or password.");
      return;
    }

    setIsLoggedIn(true);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("dashboard");
    setEmail("");
    setPassword("");
  };

  // LOGGED-IN APP
  if (isLoggedIn) {
    // PRODUCTS PAGE
    if (page === "products") {
      return (
        <Products
          onBack={() => setPage("dashboard")}
        />
      );
    }

    // BILLING PAGE
    if (page === "billing") {
      return (
        <Billing
          onBack={() => setPage("dashboard")}
        />
      );
    }

    // DASHBOARD PAGE
    return (
      <Dashboard
        onProducts={() => setPage("products")}
        onBilling={() => setPage("billing")}
        onLogout={handleLogout}
      />
    );
  }

  // AUTH PAGE
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F3ED] px-4 py-8">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-7 text-center">

          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#20252B] text-white shadow-lg">
            <span className="text-2xl font-bold">
              R
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#20252B]">
            RetailPro
          </h1>

          <p className="mt-2 text-[#737B84]">
            Retail Billing Dashboard
          </p>

        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E2DDD5] bg-white p-7 shadow-xl">

          {/* Tabs */}
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#F1EEE8] p-1">

            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
                setSuccess("");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "signin"
                  ? "bg-white text-[#C26200] shadow-sm"
                  : "text-[#737B84] hover:text-[#20252B]"
              }`}
            >
              <LogIn size={17} />
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-white text-[#C26200] shadow-sm"
                  : "text-[#737B84] hover:text-[#20252B]"
              }`}
            >
              <UserPlus size={17} />
              Sign Up
            </button>

          </div>

          {/* Heading */}
          <div className="mb-6">

            <h2 className="text-xl font-semibold text-[#20252B]">
              {mode === "signin"
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p className="mt-1 text-sm text-[#737B84]">
              {mode === "signin"
                ? "Sign in to continue to your dashboard"
                : "Create an account to get started"}
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}
            {mode === "signup" && (
              <div>

                <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 py-3 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                />

              </div>
            )}

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9299A0]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9299A0]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder={
                    mode === "signup"
                      ? "Minimum 6 characters"
                      : "Enter your password"
                  }
                  className="w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9299A0] hover:text-[#4F565D]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#D97706] py-3 font-semibold text-white shadow-sm transition hover:bg-[#B85F05] hover:shadow-md active:scale-[0.99]"
            >
              {mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>

          </form>

        </div>

        <p className="mt-6 text-center text-xs text-[#8B9299]">
          © 2026 RetailPro. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default App;