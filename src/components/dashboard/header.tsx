import { signOut } from "@/app/auth/actions";
import type { UserProfile } from "@/lib/types";

export function DashboardHeader({
  profile,
  userEmail,
}: {
  profile: UserProfile;
  userEmail: string;
}) {
  return (
    <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 lg:px-8 bg-zinc-950">
      {/* Mobile logo (hidden on lg) */}
      <div className="flex items-center gap-3 lg:hidden">
        <img src="/favicon.png" alt="Nivara" className="h-6 w-6 rounded" />
        <span className="font-bold">Nivara</span>
      </div>

      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400 hidden sm:block">{userEmail}</span>
        <form action={signOut}>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
