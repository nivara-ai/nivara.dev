import { getCurrentUser, getUserProfile, getVisibleProducts } from "@/lib/data";
import { redirect } from "next/navigation";
import { ProductGrid } from "@/components/dashboard/product-grid";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  const profile = await getUserProfile(user.id);

  if (!profile) redirect("/");

  const products = await getVisibleProducts(profile.role, user.id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-zinc-400 mt-1">{products.length} AI proof of concepts</p>
      </div>
      <ProductGrid products={products} userRole={profile.role} />
    </div>
  );
}
