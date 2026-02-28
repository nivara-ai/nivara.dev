import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignInPage } from "@/components/ui/sign-in";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <SignInPage
      heroImageSrc="/hero-bg.png"
    />
  );
}
