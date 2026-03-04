import type { UserRole } from "./types";

export function canSeeArchitecture(role: UserRole): boolean {
  return role === "admin" || role === "team_tech";
}

export function canSeeRepoLink(role: UserRole): boolean {
  return role === "admin" || role === "team_tech";
}

export function canSeePitch(role: UserRole): boolean {
  return role === "admin" || role === "team_business";
}

export function canSeeFactsheet(role: UserRole): boolean {
  return role !== "external" || true; // all roles can see factsheet
}

export function canSeeDemoLink(role: UserRole): boolean {
  return true; // all approved users can see demo link
}

export function canManageProducts(role: UserRole): boolean {
  return role === "admin";
}

export function canManageUsers(role: UserRole): boolean {
  return role === "admin";
}

export function canManageInvites(role: UserRole): boolean {
  return role === "admin";
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: "Administrator",
    team_tech: "Tech Team",
    team_business: "Business Team",
    external: "External User",
  };

  return labels[role] ?? role;
}

export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    team_tech: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    team_business: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    external: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  };

  return colors[role] ?? colors.external;
}
