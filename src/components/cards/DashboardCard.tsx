"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";

interface DashboardCardProps {
  cardTitle: string;
  cardContent: string;
  className?: string;
  icon?: LucideIcon;
}

export default function DashboardCard({
  cardTitle,
  cardContent,
  className,
  icon: IconComponent,
}: DashboardCardProps) {
  return (
    <div className="group transition-all duration-300 hover:scale-105">
      <Card
        className={cn(
          "w-full bg-background/60 backdrop-blur-xl",
          "border border-transparent",
          "relative overflow-hidden",
          "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          "transition-all duration-500 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]",
          "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-transparent",
          "before:transition-all before:duration-500",
          "group-hover:before:border-[linear-gradient(45deg,#3b82f6,#a855f7)]",
          "rounded-2xl p-6",
          "flex flex-col",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground tracking-tight">
            {cardTitle}
          </CardTitle>
          {IconComponent && (
            <div className="transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12">
              <IconComponent
                className="h-6 w-6 text-primary"
                aria-hidden="true"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow flex items-end justify-between">
          <p className="text-sm text-muted-foreground/90 font-medium">
            {cardContent}
          </p>
          <div className="transition-all duration-300 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowRight className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
