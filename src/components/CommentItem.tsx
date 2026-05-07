/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CommentForm from "./forms/CommentForm";
import Image from "next/image";
import { commentType } from "@/lib/types/comment.types";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { updateComment, deleteComment } from "@/actions/comment.action";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import ConfirmDeleteDialog from "./dialogs/ConfirmDeleteDialog";

const CommentItem = ({
  comment,
  postId,
  level,
}: {
  comment: commentType;
  postId: string;
  level: number;
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const updateMutation = useMutation({
    mutationFn: (data: { content: string }) =>
      updateComment({ id: comment.id, data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: any) =>
              post.id === postId
                ? {
                    ...post,
                    comments: updateCommentInTree(post.comments, comment.id, {
                      ...comment,
                      content: data.content,
                      updatedAt: new Date(),
                    }),
                  }
                : post,
            ),
          })),
        };
      });
      return { previousPosts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      toast.error("Failed to update comment");
      console.error("Error updating comment:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment updated successfully");
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: any) =>
              post.id === postId
                ? {
                    ...post,
                    comments: removeCommentFromTree(post.comments, comment.id),
                  }
                : post,
            ),
          })),
        };
      });
      return { previousPosts };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment deleted successfully");
    },
  });

  const updateCommentInTree = (
    comments: commentType[],
    commentId: string,
    updatedComment: commentType,
  ): commentType[] => {
    return comments.map((c) =>
      c.id === commentId
        ? { ...c, ...updatedComment }
        : {
            ...c,
            replies: c.replies
              ? updateCommentInTree(c.replies, commentId, updatedComment)
              : c.replies,
          },
    );
  };

  const removeCommentFromTree = (
    comments: commentType[],
    commentId: string,
  ): commentType[] => {
    return comments
      .filter((c) => c.id !== commentId)
      .map((c) => ({
        ...c,
        replies: c.replies
          ? removeCommentFromTree(c.replies, commentId)
          : c.replies,
      }));
  };

  const isOwner = currentUser?.id === comment.userId;

  return (
    <div
      className={`ml-${level * 4} border-l-2 border-primary/20 pl-4 py-2 animate-in fade-in slide-in-from-left-4 duration-500`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={comment.user.image || "/default-avatar.png"}
          alt={comment.user.name || "User"}
          width={24}
          height={24}
          className="rounded-full border border-border"
        />
        <p className="text-sm font-medium text-foreground">
          {comment.user.name || "Anonymous"}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
        </p>
        {isOwner && (
          <div className="ml-auto flex gap-2 items-center">
            <button
              className="p-1 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Edit comment"
            >
              <Edit className="w-4 h-4 text-primary" />
            </button>
            <ConfirmDeleteDialog
              onDelete={() => deleteMutation.mutate()}
              name=""
              id={comment.id}
            >
              <div className="p-1 rounded-full hover:bg-muted transition-colors cursor-pointer">
                <Trash2
                  className="w-4 h-4 text-destructive"
                  aria-label="Delete comment"
                />
              </div>
            </ConfirmDeleteDialog>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2 animate-in fade-in zoom-in-95 duration-300">
          <CommentForm
            postId={postId}
            defaultContent={comment.content}
            onSuccess={() => {
              setIsEditing(false);
              queryClient.invalidateQueries({ queryKey: ["posts"] });
              queryClient.invalidateQueries({ queryKey: ["comments"] });
            }}
            onSubmit={(data) => updateMutation.mutate(data)}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
      )}
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-xs text-primary hover:underline mt-1 active:scale-95 transition-transform"
        aria-label={showReplyForm ? "Hide reply form" : "Show reply form"}
      >
        {showReplyForm ? "Cancel Reply" : "Reply"}
      </button>
      {showReplyForm && (
        <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onSuccess={() => {
              setShowReplyForm(false);
              queryClient.invalidateQueries({ queryKey: ["posts"] });
              queryClient.invalidateQueries({ queryKey: ["comments"] });
            }}
          />
        </div>
      )}
      {comment.replies?.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-primary hover:underline active:scale-95 transition-transform"
            aria-label={showReplies ? "Hide replies" : "Show replies"}
          >
            {showReplies ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {showReplies
              ? `Hide ${comment.replies.length} Replies`
              : `Show ${comment.replies.length} Replies`}
          </button>
          {showReplies && (
            <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {comment.replies.map((reply: commentType) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
