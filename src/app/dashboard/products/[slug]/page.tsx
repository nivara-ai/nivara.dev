import { getCurrentUser, getUserProfile, getProductBySlug } from "@/lib/data";
import { redirect, notFound } from "next/navigation";
import { canSeeArchitecture, canSeeRepoLink, canSeePitch } from "@/lib/roles";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/");

  const profile = await getUserProfile(user.id);

  if (!profile) redirect("/");

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const showArch = canSeeArchitecture(profile.role);
  const showRepo = canSeeRepoLink(profile.role);
  const showPitch = canSeePitch(profile.role);

  return (
    <div className="max-w-4xl">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {product.status}
          </span>
          {product.version && <span className="text-sm text-zinc-500">{product.version}</span>}
        </div>
        <p className="text-zinc-400 text-lg">{product.tagline}</p>
        {product.sector && (
          <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
            {product.sector}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8">
        {showRepo && product.repo_url && (
          <a
            href={product.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors"
          >
            <Github className="h-4 w-4" />
            Repository
          </a>
        )}
        {product.demo_url && (
          <a
            href={product.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>

      {/* Overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-zinc-200">Overview</h2>
        <p className="text-zinc-400 leading-relaxed">{product.description}</p>
      </section>

      {/* Architecture — only admin + team_tech */}
      {showArch && product.architecture_description && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Architecture</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <code className="text-sm text-emerald-400">{product.architecture_description}</code>
          </div>
        </section>
      )}

      {/* Features */}
      {product.features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Features</h2>
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-400">
                <span className="text-emerald-500 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Key Highlights */}
      {product.highlights.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Key Highlights</h2>
          <div className="grid gap-3">
            {product.highlights.map((highlight, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                <p className="text-zinc-300 text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {product.tech_stack.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {product.tech_stack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Pitch — only admin + team_business */}
      {showPitch && product.pitch_content && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Pitch</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-400 whitespace-pre-wrap">{product.pitch_content}</p>
          </div>
        </section>
      )}
    </div>
  );
}
