"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationAsRead,
} from "@/actions/notification.action";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Skeleton Component
const NotificationSkeleton = () => (
  <div
    className="space-y-2 animate-in fade-in duration-300"
    role="status"
    aria-label="Loading notifications"
  >
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="p-3 rounded-md border border-border bg-muted/20"
      >
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse mb-2" />
        <div className="h-3 w-1/2 rounded bg-muted animate-pulse mb-1" />
        <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
      </div>
    ))}
  </div>
);

// Notifications Component
const Notifications = () => {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/50"
          aria-label={`Notifications${
            unreadCount > 0 ? `, ${unreadCount} unread` : ""
          }`}
        >
          <div className={unreadCount > 0 ? "animate-bounce" : ""}>
            <Bell className="w-5 h-5 text-foreground" />
          </div>
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="
                absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center
                rounded-full text-xs bg-destructive text-destructive-foreground
                animate-in zoom-in duration-300
              "
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background/95 backdrop-blur-md border-border">
        <div className="animate-in slide-in-from-right-4 duration-500">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-foreground text-lg">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {isLoading ? (
              <NotificationSkeleton />
            ) : isError ? (
              <p className="text-sm text-destructive text-center">
                Failed to load notifications:{" "}
                {error?.message || "Unknown error"}
              </p>
            ) : notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-3 rounded-md border bg-muted/10 shadow-sm
                    ${
                      notification.isRead
                        ? "border-border"
                        : "border-primary/50"
                    }
                    hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-top-1 duration-300
                  `}
                >
                  <p className="text-sm text-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  {!notification.isRead && (
                    <div className="mt-1">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="p-0 h-auto text-primary hover:text-primary/80 transition-transform active:scale-95"
                        aria-label={`Mark notification ${notification.id} as read`}
                      >
                        Mark as read
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                No notifications
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;

