"use client";

import { SignInPage } from "@/components/ui/sign-in";

export default function Home() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Sign In submitted:", data);
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
  };

  return (
    <div className="bg-background text-foreground">
      <SignInPage
        heroImageSrc="/hero-bg.png"
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </div>
  );
}
