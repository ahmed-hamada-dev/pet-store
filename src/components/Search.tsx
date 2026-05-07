/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/actions/product.action";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const { debouncedValue, isDebouncing } = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      const url = new URLSearchParams();
      url.set("search", debouncedValue);
      router.replace(`?${url.toString()}`);
    } else {
      router.replace("?");
    }
  }, [debouncedValue, router]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      startTransition(async () => {
        const products = await searchProducts({ search: searchTerm });
        setSuggestions(products);
      });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-xs">
      <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search products..."
          className="
            bg-background/95 backdrop-blur-md
            border border-border
            rounded-lg
            px-4 py-2
            text-foreground
            placeholder:text-muted-foreground/70
            focus:ring-2 focus:ring-primary/50
            transition-all duration-300
            shadow-sm
          "
        />
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
      </div>

      {suggestions.length > 0 && (
        <ul
          className="
            absolute w-full mt-2
            bg-background/95 backdrop-blur-lg
            border border-border
            rounded-lg
            shadow-xl
            z-20
            max-h-60 overflow-y-auto
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          {suggestions.map((product, index) => (
            <li
              key={product.id}
              className="group animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={`/products/product/${product.slug}`}
                className="
                  flex items-center
                  p-3
                  hover:bg-primary/10
                  transition-all duration-300
                  border-b border-border/50 last:border-b-0
                "
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden border">
                  <Image
                    src={product.images[0] || "/placeholder-image.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p
                  className="
                    ml-3 text-sm font-medium
                    text-foreground
                    group-hover:text-primary
                    transition-colors duration-300
                  "
                >
                  {product.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
