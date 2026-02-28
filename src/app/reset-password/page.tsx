"use client";

import { ResetPasswordPage } from "@/components/ui/reset-password";

export default function ResetPassword() {
  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Reset Password submitted:", data);
  };

  return (
    <div className="bg-background text-foreground">
      <ResetPasswordPage
        heroImageSrc="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=2160&q=80"
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}
