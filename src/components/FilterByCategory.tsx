"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetAllCategories } from "@/hooks/useGetCategories";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function FilterByCategory() {
  const { data: categories } = useGetAllCategories();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryName = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/products/filter?${params.toString()}`);
  };

  return (
    <div className="relative group w-[180px] transition-transform duration-300 hover:scale-[1.02]">
      <Select value={categoryName} onValueChange={handleChange}>
        <SelectTrigger
          className="
            bg-background/95 backdrop-blur-md
            border border-border
            rounded-lg
            px-4 py-2
            text-foreground
            focus:ring-2 focus:ring-primary/50
            transition-all duration-300
            shadow-sm
            h-10
          "
        >
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <div
          className="
            absolute inset-0 -z-10
            rounded-lg
            bg-primary/10
            opacity-0 group-hover:opacity-100
            blur-lg
            transition-opacity duration-300
          "
        />
        <SelectContent
          className="
            bg-background/95 backdrop-blur-lg
            border border-border
            rounded-lg
            shadow-xl
            mt-1
            max-h-60 overflow-y-auto
            z-20
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          <SelectItem
            value="all"
            className="
              focus:bg-primary/10
              transition-colors duration-200
              text-foreground
              px-3 py-2
            "
          >
            All Categories
          </SelectItem>
          {categories?.map((cat) => (
            <SelectItem
              key={cat.id}
              value={cat.name}
              className="
                focus:bg-primary/10
                transition-colors duration-200
                text-foreground
                px-3 py-2
              "
            >
              <div className="flex items-center">
                <div className="relative w-6 h-6 mr-2 rounded overflow-hidden border">
                  <Image
                    src={cat.image || "/placeholder-image.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterByCategory;

