"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  createdAt: Date; // Changed from string to Date
}

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentOrders({ posts }: RecentPostsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-background/95 backdrop-blur-md border border-primary/20 shadow-sm transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post, index) => (
              <div
                key={post.id}
                className="flex items-center justify-between animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
