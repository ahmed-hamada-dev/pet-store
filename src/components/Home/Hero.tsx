"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1 },
    [autoplay.current],
  );

  const backgroundImages = ["/squirrel.jpeg", "/bird.jpeg", "/cat.jpeg"];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 text-foreground overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {backgroundImages.map((src, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Everything Your Pet Needs,{" "}
          <span className="text-primary-foreground/90">
            Plus a Community That Cares!
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          Discover premium pet food, supplies, and a vibrant community of pet
          lovers ready to share tips and support.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 px-8 py-4 rounded-full hover:scale-105 shadow-lg active:scale-95"
            aria-label="Shop now for pet products"
          >
            <Link href="/products/1">
              Shop Now <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 px-8 py-4 rounded-full hover:scale-105 active:scale-95"
            aria-label="Join the pet community"
          >
            <Link href="/community">
              Join Community <Users className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
