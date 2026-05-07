"use client";

import { PostsType } from "@/lib/types/post.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PostCard from "./PostCard";
import { getPaginatedPosts } from "@/actions/post.action";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

function PostList({ initialPosts }: { initialPosts: PostsType }) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        return await getPaginatedPosts({
          limit: 5,
          search: "",
          cursor: pageParam ?? undefined,
        });
      },
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : undefined,
      initialData: {
        pages: [
          {
            posts: initialPosts,
            hasMore: initialPosts.length === 5, // Assume hasMore if initialPosts is full
            nextCursor: initialPosts[initialPosts.length - 1]?.id ?? null,
          },
        ],
        pageParams: [null],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${(index % 5) * 100}ms` }}
        >
          <PostCard post={post} />
        </div>
      ))}
      <div ref={ref} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more...</span>
          </div>
        )}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-center text-muted-foreground italic">
            No more posts
          </p>
        )}
      </div>
    </div>
  );
}

export default PostList;
