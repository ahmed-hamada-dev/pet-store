/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PostType } from "@/lib/types/post.types";
import Image from "next/image";
import { format } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import PostDropdownMenu from "./PostDropdownMenu";
import CommentForm from "./forms/CommentForm";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpvote } from "@/actions/upvote.action";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import CommentList from "./CommentList";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const collapseVariants = {
  open: {
    height: "auto",
    opacity: 1,
  },
  closed: {
    height: 0,
    opacity: 0,
  },
};
const PostCard = ({ post }: { post: PostType }) => {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);
  const [showComments, setShowComments] = useState(false);

  const { mutate: upvote } = useMutation({
    mutationFn: () => createUpvote(post.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);
      setIsUpvoted((prev) => !prev);
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: PostType) =>
              p.id === post.id
                ? {
                    ...p,
                    isUpvoted: !isUpvoted,
                    _count: {
                      ...p._count,
                      upvotes: isUpvoted
                        ? p._count.upvotes - 1
                        : p._count.upvotes + 1,
                    },
                  }
                : p,
            ),
          })),
        };
      });
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      setIsUpvoted((prev) => !prev);
      toast.error("Failed to update like");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (!post) return null;

  const dateToShow = post.updatedAt ?? post.createdAt;

  return (
    <motion.div
      className="bg-card rounded-xl border shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-start">
        <Link
          href={`/profile/${post.User.id}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src={post.User.image || "/default-avatar.png"}
            alt={post.User?.name || "User"}
            width={48}
            height={48}
            className="rounded-full object-cover border-2 border-border"
          />
          <div>
            <p className="font-semibold text-foreground hover:text-primary transition-colors">
              {post.User?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(dateToShow), "MMM d, yyyy 'at' h:mm a")}
              {post.updatedAt && " (edited)"}
            </p>
          </div>
        </Link>
        {user?.id === post.userId && (
          <PostDropdownMenu postId={post.id} post={post} />
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground leading-tight">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}
        {post.image && (
          <div className="overflow-hidden rounded-lg border">
            {post.image.endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 pt-2 border-t border-border">
        <motion.button
          onClick={() => upvote()}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isUpvoted
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={!user}
        >
          <Heart className={`h-4 w-4 ${isUpvoted ? "fill-current" : ""}`} />
          <span className="text-sm font-medium">{post._count.upvotes}</span>
        </motion.button>

        <motion.button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{post.comments?.length || 0}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            variants={collapseVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-4 pt-4 border-t border-border"
          >
            <CommentForm postId={post.id} />
            <CommentList postId={post.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
