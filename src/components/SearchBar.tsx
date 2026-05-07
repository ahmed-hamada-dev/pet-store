"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`/community?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-4 animate-in fade-in zoom-in-95 duration-300">
      <Input
        placeholder="Search posts..."
        defaultValue={q}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-muted/20 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50"
      />
    </div>
  );
}
