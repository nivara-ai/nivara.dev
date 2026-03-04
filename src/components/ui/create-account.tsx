"use client";

import React, { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signup } from "@/app/auth/actions";

interface CreateAccountPageProps {
  heroImageSrc?: string;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-emerald-400/70 focus-within:bg-emerald-500/10">
    {children}
  </div>
);

export const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ heroImageSrc }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignUp = async (formData: FormData) => {
    setError(null);
    setSuccess(null);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await signup(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-geist w-full">
      <section className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              <span className="font-light text-foreground tracking-tighter">Create Account</span>
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              Join our platform and start your journey today
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl p-3">
                {success}
              </div>
            )}

            <form className="space-y-5" action={handleSignUp}>
              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <GlassInputWrapper>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-transparent text-foreground text-sm p-4 rounded-2xl focus:outline-none placeholder:text-muted-foreground/60"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent text-foreground text-sm p-4 rounded-2xl focus:outline-none placeholder:text-muted-foreground/60"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-500">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      className="w-full bg-transparent text-foreground text-sm p-4 pr-12 rounded-2xl focus:outline-none placeholder:text-muted-foreground/60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword
                        ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-600">
                <label className="text-sm font-medium text-muted-foreground">Confirm Password</label>
                <GlassInputWrapper>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    className="w-full bg-transparent text-foreground text-sm p-4 rounded-2xl focus:outline-none placeholder:text-muted-foreground/60"
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-700 flex items-center gap-3 text-sm">
                <input type="checkbox" name="terms" required className="custom-checkbox" />
                <span className="text-foreground/90">I agree to the Terms of Service and Privacy Policy</span>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="animate-element animate-delay-800 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/" className="text-emerald-400 hover:underline transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </section>

      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
        </section>
      )}
    </div>
  );
};
