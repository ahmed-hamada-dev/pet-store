"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewCardProps {
  title: string;
  count: number;
  isLoading: boolean;
  icon: string;
}

export default function OverviewCard({
  title,
  count,
  isLoading,
}: OverviewCardProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card
        className="
          bg-background/95 backdrop-blur-md
          border border-primary/20
          shadow-sm
          transition-all duration-300
          hover:border-primary/50
          hover:scale-[1.02]
          hover:shadow-lg
        "
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {/* <Icon className="h-4 w-4 text-primary" /> */}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">{count}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
