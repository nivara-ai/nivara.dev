"use client";

import React, { useState, useTransition } from "react";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { resetPassword } from "@/app/auth/actions";

interface ResetPasswordPageProps {
  heroImageSrc?: string;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-emerald-400/70 focus-within:bg-emerald-500/10">
    {children}
  </div>
);

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ heroImageSrc }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleReset = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await resetPassword(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSubmitted(true);
      }
    });
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <Link href="/" className="animate-element animate-delay-100 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Sign In</span>
            </Link>

            {!submitted ? (
              <>
                <h1 className="animate-element animate-delay-200 text-4xl md:text-5xl font-semibold leading-tight">
                  <span className="font-light text-foreground tracking-tighter">Reset Password</span>
                </h1>
                <p className="animate-element animate-delay-300 text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3">
                    {error}
                  </div>
                )}

                <form className="space-y-5" action={handleReset}>
                  <div className="animate-element animate-delay-400">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <GlassInputWrapper>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input name="email" type="email" placeholder="Enter your email address" required className="w-full bg-transparent text-sm p-4 pl-12 rounded-2xl focus:outline-none" />
                      </div>
                    </GlassInputWrapper>
                  </div>

                  <button type="submit" disabled={isPending} className="animate-element animate-delay-500 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {isPending ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              <div className="animate-element animate-delay-200 flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold">Check Your Email</h2>
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
        </section>
      )}
    </div>
  );
};
