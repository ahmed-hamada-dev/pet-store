export const dynamic = "force-dynamic";

import { getPaginatedPosts } from "@/actions/post.action";
import PostForm from "@/components/forms/PostForm";
import Notifications from "@/components/Notifications";
import PostList from "@/components/PostList";
import { MessageSquare } from "lucide-react";

async function CommunityPage() {
  const { posts } = await getPaginatedPosts({ page: 1, search: "" });

  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Community
                </h1>
                <p className="text-sm text-muted-foreground">
                  Share updates and talk about pets with other customers.
                </p>
              </div>
            </div>

            <Notifications />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-background/95 border border-border shadow-sm rounded-3xl p-6">
          <PostForm />
        </div>

        <div className="space-y-4">
          <PostList initialPosts={posts} />
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
