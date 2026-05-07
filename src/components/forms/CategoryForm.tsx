"use client";

import { categoryZod } from "@/validations/category.zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "../shared/ImageUpload";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { createCategory, updateCategory } from "@/actions/category.action";

interface IProps {
  category?: Category;
}

function CategoryForm({ category }: IProps) {
  const form = useForm<categoryZod>({
    defaultValues: category
      ? {
          image: category.image,
          name: category.name,
        }
      : {
          image: "",
          name: "",
        },
    resolver: zodResolver(categoryZod),
  });

  const onSubmit = async (data: categoryZod) => {
    try {
      if (category) {
        const updatePromise = updateCategory({ data, id: category.id });
        toast.promise(updatePromise, {
          loading: "Updating category...",
          success: "Category updated successfully!",
          error: "Error while updating category!",
        });
      } else {
        const createPromise = createCategory(data);
        toast.promise(createPromise, {
          loading: "Creating category...",
          success: "Category created successfully!",
          error: "Error while creating category!",
        });
        await createPromise;
        form.reset({ image: "", name: "" });
      }
    } catch (error) {
      console.error("Error while processing category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-10 text-center tracking-tight">
            {category ? "Edit Category" : "Create New Category"}
          </h1>
        </div>

        {/* Form Container */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-background/60 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-8 space-y-8 max-w-lg mx-auto"
          >
            {/* Section: Category Details */}
            <section>
              <h2 className="font-semibold text-2xl text-foreground mb-6">
                Category Details
              </h2>
              <div className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Category Name
                      </FormLabel>
                      <Input
                        placeholder="Enter category name"
                        className="bg-background/80 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-lg"
                        {...field}
                      />
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Image Field */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Category Image
                      </FormLabel>
                      <div className="bg-background/80 border border-primary/20 rounded-lg p-4">
                        <ImageUpload
                          endpoint="singleImageUploader"
                          value={field.value ? [field.value] : []}
                          onChange={(urls) => field.onChange(urls[0] || "")}
                        />
                      </div>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="bg-background/60 backdrop-blur-xl border-t border-primary/20 py-4 -mx-8 px-8 z-10">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : category ? (
                  "Update Category"
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CategoryForm;
