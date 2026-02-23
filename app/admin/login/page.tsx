"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (!error) {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-[360px]">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-text)] text-center mb-8">
          Mia Randria
        </h1>
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-[var(--color-bg)] border border-[var(--color-border)]"
        >
          {errorMessage && (
            <p className="text-sm text-red-600 mb-4" role="alert">
              {errorMessage}
            </p>
          )}
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] mb-4 focus:outline-none focus:border-[var(--color-accent)]"
            autoComplete="email"
          />
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 font-body text-[var(--color-text)] bg-white border border-[var(--color-border)] mb-6 focus:outline-none focus:border-[var(--color-accent)]"
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-text)] text-white font-medium tracking-widest uppercase text-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
