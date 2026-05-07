"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-10 "
        style={{
          backgroundImage: "url(/bird.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.75,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
        <h3 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          Join Our <span className="text-stone-700">Pet-Loving</span> Community
        </h3>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Connect with thousands of pet owners, share tips, and unlock exclusive
          offers tailored for you and your furry friends.
        </p>
        <div className="flex justify-center mb-10">
          <Button
            asChild
            size="lg"
            className="transition-all duration-300 flex items-center gap-2 px-10 py-5 rounded-full font-bold hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-white text-primary hover:bg-stone-50"
            aria-label="Join the pet community"
          >
            <Link href="/community">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
