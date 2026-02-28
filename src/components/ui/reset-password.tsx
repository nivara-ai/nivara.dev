import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// --- TYPE DEFINITIONS ---

interface ResetPasswordPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  onResetPassword?: (event: React.FormEvent<HTMLFormElement>) => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-emerald-400/70 focus-within:bg-emerald-500/10">
    {children}
  </div>
);

// --- MAIN COMPONENT ---

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Reset Password</span>,
  description = "Enter your email address and we'll send you a link to reset your password",
  heroImageSrc,
  onResetPassword,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    onResetPassword?.(event);
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      {/* Left column: reset password form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <Link href="/" className="animate-element animate-delay-100 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>

            {!submitted ? (
              <>
                <h1 className="animate-element animate-delay-200 text-4xl md:text-5xl font-semibold leading-tight">{title}</h1>
                <p className="animate-element animate-delay-300 text-muted-foreground">{description}</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="animate-element animate-delay-400">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <GlassInputWrapper>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input name="email" type="email" placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 pl-12 rounded-2xl focus:outline-none" />
                      </div>
                    </GlassInputWrapper>
                  </div>

                  <button type="submit" className="animate-element animate-delay-500 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="animate-element animate-delay-200 w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="animate-element animate-delay-300 text-2xl font-semibold text-foreground">Check your email</h2>
                <p className="animate-element animate-delay-400 text-muted-foreground">
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="animate-element animate-delay-500 mt-4 text-sm text-emerald-400 hover:underline transition-colors"
                >
                  Didn't receive it? Try again
                </button>
              </div>
            )}

            <p className="animate-element animate-delay-600 text-center text-sm text-muted-foreground">
              Remember your password? <Link href="/" className="text-emerald-400 hover:underline transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${heroImageSrc})` }}></div>
        </section>
      )}
    </div>
  );
};
