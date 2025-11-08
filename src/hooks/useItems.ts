import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Item {
  id: string;
  name: string;
  price: number;
  category_id: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useItems = (categoryId?: string) => {
  return useQuery({
    queryKey: ["items", categoryId],
    queryFn: async () => {
      let query = supabase.from("items").select("*");
      
      if (categoryId && categoryId !== "all") {
        query = query.eq("category_id", categoryId);
      }

      const { data, error } = await query.order("name");

      if (error) throw error;
      return data as Item[];
    },
  });
};
