"use client";

import React, { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { login } from "@/app/auth/actions";

// --- TYPE DEFINITIONS ---
interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
}

// --- SUB-COMPONENTS ---
const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-emerald-400/70 focus-within:bg-emerald-500/10">
    {children}
  </div>
);

// --- MAIN COMPONENT ---
export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row font-geist w-full">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">{description}</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3">
                {error}
              </div>
            )}

            <form className="space-y-5" action={handleSignIn}>
              <div className="animate-element animate-delay-300">
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

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
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

              <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="rememberMe" className="custom-checkbox" />
                  <span className="text-foreground/90">Keep me signed in</span>
                </label>
                <Link href="/reset-password" className="hover:underline text-emerald-400 transition-colors">Reset password</Link>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="animate-element animate-delay-700 text-center text-sm text-muted-foreground">
              New to our platform? <Link href="/create-account" className="text-emerald-400 hover:underline transition-colors">Create Account</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image */}
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
