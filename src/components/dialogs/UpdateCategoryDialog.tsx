"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import CategoryForm from "../forms/CategoryForm";
import { Category } from "@prisma/client";

function UpdateCategoryDialog({
  children,
  category,
}: {
  children: ReactNode;
  category: Category;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="
          max-w-xl min-w-[24rem]
          max-h-[calc(100vh-2rem)] overflow-y-auto
          bg-background/60 backdrop-blur-xl
          border border-primary/20
          rounded-2xl
          shadow-[0_4px_12px_rgba(0,0,0,0.1)]
          animate-in fade-in zoom-in-95 duration-300

          before:content-[''] before:absolute before:inset-0
          before:border-2 before:border-transparent
          before:rounded-2xl
          before:transition-all before:duration-500
          hover:before:border-[linear-gradient(45deg,#3b82f6,#a855f7)]
          p-4
          overscroll-contain
        "
        aria-describedby="category-dialog-description"
      >
        <DialogHeader className="sticky top-0 bg-background/60 backdrop-blur-xl z-10 pb-2">
          <DialogTitle className="text-2xl font-bold text-foreground tracking-tight">
            Edit Category
          </DialogTitle>
          <DialogDescription
            id="category-dialog-description"
            className="text-sm text-muted-foreground"
          >
            Make changes to your category here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <CategoryForm category={category} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCategoryDialog;
