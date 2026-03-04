"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, Github } from "lucide-react";
import { canSeeRepoLink } from "@/lib/roles";
import type { Product, UserRole } from "@/lib/types";

export function ProductGrid({
  products,
  userRole,
}: {
  products: Product[];
  userRole: UserRole;
}) {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const sectors = useMemo(() => {
    const s = new Set(products.map((p) => p.sector).filter(Boolean));
    return Array.from(s).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.tagline?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesSector = sectorFilter === "all" || p.sector === sectorFilter;

      return matchesSearch && matchesSector;
    });
  }, [products, search, sectorFilter]);

  const showRepo = canSeeRepoLink(userRole);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-zinc-600"
        >
          <option value="all">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s!}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/dashboard/products/${product.slug}`}
            className="group bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                {product.sector && <span className="text-xs text-zinc-500">{product.sector}</span>}
              </div>
              <div className="flex items-center gap-2">
                {product.version && <span className="text-xs text-zinc-500">{product.version}</span>}
                <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {product.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{product.tagline}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tech_stack.slice(0, 4).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 text-xs bg-zinc-800 rounded text-zinc-400">
                  {tech}
                </span>
              ))}
              {product.tech_stack.length > 4 && (
                <span className="px-2 py-0.5 text-xs bg-zinc-800 rounded text-zinc-500">
                  +{product.tech_stack.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
              {showRepo && product.repo_url && (
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <Github className="h-3 w-3" />
                  Repo
                </span>
              )}
              {product.demo_url && (
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                  <ExternalLink className="h-3 w-3" />
                  Demo
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && <div className="text-center py-12 text-zinc-500">No products match your search.</div>}
    </div>
  );
}
