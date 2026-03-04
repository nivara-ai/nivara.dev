import { redirect } from "next/navigation";
import { getCurrentUser, getUserProfile } from "@/lib/data";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  const profile = await getUserProfile(user.id);

  if (!profile) redirect("/");

  if (!profile.approved) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="h-3 w-3 bg-amber-500 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pending Approval</h2>
            <p className="text-zinc-400 mb-4">
              Your account has been created. A team member will review and approve your access shortly.
            </p>
            <p className="text-zinc-500 text-sm">Logged in as: {user.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <DashboardSidebar profile={profile} />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader profile={profile} userEmail={user.email ?? ""} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
