"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import { useGetTopRatings } from "@/hooks/useGetTopRatings";

interface Rating {
  id: string;
  comment: string | null;
  rating: number;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export default function TestimonialsSection() {
  const { data: ratings, isLoading, error } = useGetTopRatings();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000 })]
  );

  useEffect(() => {
    if (emblaApi && ratings) {
      emblaApi.reInit();
    }
  }, [emblaApi, ratings]);

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground animate-pulse">
          Loading testimonials...
        </p>
      </div>
    );
  }

  if (error || !ratings || ratings.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">
          No testimonials available at the moment.
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Voices of Our Customers
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the experiences and stories shared by our valued customers.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {ratings.map((rating: Rating) => (
              <div
                key={rating.id}
                className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
              >
                <div className="h-full transform transition-all duration-300 hover:scale-[1.02]">
                  <Card className="h-full border border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-background">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarImage
                            src={rating.user.image || undefined}
                            alt={rating.user.name || "User"}
                          />
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {rating.user.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-lg">
                            {rating.user.name || "Anonymous"}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(rating.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{rating.comment || "No comment provided."}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
