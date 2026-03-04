import { createClient } from "@/utils/supabase/server";
import type { UserProfile, Product, ProductAccess } from "./types";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_profiles")
    .select("id, full_name, email, role, approved, organization")
    .eq("id", userId)
    .single();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getUserProductAccess(userId: string): Promise<ProductAccess[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("product_access")
    .select("*")
    .eq("user_id", userId);
  return data ?? [];
}

export async function getVisibleProducts(
  role: string,
  userId: string
): Promise<Product[]> {
  const allProducts = await getProducts();

  // admin, team_tech, team_business see ALL products
  if (role === "admin" || role === "team_tech" || role === "team_business") {
    return allProducts;
  }

  // external users only see products they have access to
  const accessList = await getUserProductAccess(userId);
  const accessibleProductIds = new Set(accessList.map((a) => a.product_id));

  return allProducts.filter((p) => accessibleProductIds.has(p.id));
}
