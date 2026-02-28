"use client";

import { CreateAccountPage } from "@/components/ui/create-account";

export default function CreateAccount() {
  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Create Account submitted:", data);
  };

  const handleGoogleSignUp = () => {
    console.log("Continue with Google sign up clicked");
  };

  return (
    <div className="bg-background text-foreground">
      <CreateAccountPage
        heroImageSrc="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=2160&q=80"
        onCreateAccount={handleCreateAccount}
        onGoogleSignUp={handleGoogleSignUp}
      />
    </div>
  );
}
