"use server";

import { categoryService } from "@/lib/services/category.service";
import { createClient } from "@/lib/supabase/server";

export async function createCategoryAction(data: {
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const category = await categoryService.createCustomCategory(user.id, data);
    return { success: true, data: category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategoryAction(categoryId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    await categoryService.deleteCustomCategory(user.id, categoryId);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
