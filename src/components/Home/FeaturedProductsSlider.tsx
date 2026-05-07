"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ProductWithCategories } from "@/lib/types/product.types";

type FeaturedProductsSliderProps = {
  products: ProductWithCategories[];
};

export default function FeaturedProductsSlider({
  products,
}: FeaturedProductsSliderProps) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1, align: "start" },
    [autoplay.current]
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const updateControls = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    updateControls();
    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-16 bg-muted/10 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center animate-in slide-in-from-bottom-4 duration-500">
          Featured Products
        </h3>
        {products.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Link
                      href={`/products/product/${product.slug}`}
                      className="block bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={product.images[0] || "/default-product.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          priority={products.indexOf(product) < 3}
                        />
                        {product.discount && (
                          <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-full">
                            {product.discount}% Off
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-foreground truncate">
                          {product.name}
                        </h4>
                        <p className="text-muted-foreground font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.category && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.category.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-background border shadow-lg text-foreground rounded-full p-3 disabled:opacity-0 transition-all hover:scale-110 active:scale-95 z-10"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-background border shadow-lg text-foreground rounded-full p-3 disabled:opacity-0 transition-all hover:scale-110 active:scale-95 z-10"
              aria-label="Next product"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="flex justify-center mt-6 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    emblaApi?.selectedScrollSnap() === index
                      ? "bg-primary w-4"
                      : "bg-muted"
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-12">
            No products available.
          </p>
        )}
        <div className="text-center mt-12 animate-in fade-in duration-1000">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Link href="/products/1">
              View All Products <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
