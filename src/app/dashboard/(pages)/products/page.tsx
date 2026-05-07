"use client";
import DashboardCard from "@/components/cards/DashboardCard";
import Link from "next/link";
import { Package, PlusCircle } from "lucide-react";

type CardLink = {
  title: string;
  content: string;
  link: string;
  icon: typeof Package | typeof PlusCircle;
};

const cardLinks: CardLink[] = [
  {
    title: "See All Products",
    content: "View and manage your product catalog",
    link: "/dashboard/products/1",
    icon: Package,
  },
  {
    title: "Add New Product",
    content: "Create a new product listing",
    link: "/dashboard/products/new",
    icon: PlusCircle,
  },
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 fill-mode-both">
          <h1 className="text-4xl font-extrabold text-foreground mb-10 text-center tracking-tight">
            Products Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardLinks.map((card, index) => (
            <div
              key={card.link}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <Link
                href={card.link}
                className="block group"
                aria-label={`Navigate to ${card.title}`}
              >
                <DashboardCard
                  cardContent={card.content}
                  cardTitle={card.title}
                  icon={card.icon}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ProductsPage;
