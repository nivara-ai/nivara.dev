"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Settings, Users, Send } from "lucide-react";
import { canManageUsers, canManageInvites, getRoleBadgeColor, getRoleLabel } from "@/lib/roles";
import type { UserProfile } from "@/lib/types";

export function DashboardSidebar({ profile }: { profile: UserProfile }) {
  const pathname = usePathname();

  const navItems = [{ href: "/dashboard", label: "Products", icon: LayoutGrid }];

  if (canManageUsers(profile.role)) {
    navItems.push({ href: "/dashboard/admin/users", label: "Users", icon: Users });
  }

  if (canManageInvites(profile.role)) {
    navItems.push({ href: "/dashboard/admin/invites", label: "Invites", icon: Send });
  }

  navItems.push({ href: "/dashboard/settings", label: "Settings", icon: Settings });

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img src="/favicon.png" alt="Nivara" className="h-8 w-8 rounded" />
          <span className="text-xl font-bold">Nivara</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium">
            {profile.full_name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{profile.full_name ?? "User"}</p>
            <span
              className={`inline-block text-xs px-1.5 py-0.5 rounded border ${getRoleBadgeColor(profile.role)}`}
            >
              {getRoleLabel(profile.role)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
