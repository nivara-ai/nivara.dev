import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Check if user is approved
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("approved, role")
    .eq("id", user.id)
    .single();

  const isApproved = profile?.approved ?? false;
  const isTeam = profile?.role === "team";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Nivara"
              className="h-8 w-8 rounded"
            />
            <h1 className="text-2xl font-bold">Nivara</h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {isApproved ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-emerald-500 rounded-full" />
              <span className="text-emerald-400 text-sm font-medium">
                {isTeam ? "Team Member" : "Approved User"}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.user_metadata?.full_name || user.email}</h2>
            <p className="text-zinc-400">
              You have access to the Nivara platform. More features coming soon.
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-sm font-medium">Pending Approval</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Account Created</h2>
            <p className="text-zinc-400 mb-4">
              Your account has been created successfully. A member of our team will review and approve your access shortly.
            </p>
            <p className="text-zinc-500 text-sm">
              Logged in as: {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
