"use client";

import { userZod } from "@/validations/user.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ImageUpload from "../shared/ImageUpload";
import { updateUser } from "@/actions/user.action";
import toast from "react-hot-toast";
import Link from "next/link";

function UpdateUserForm({ user }: { user: User }) {
  const form = useForm<userZod>({
    resolver: zodResolver(userZod),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postalCode: user.postalCode || "",
      country: user.country || "",
    },
  });

  const onSubmit = async (values: userZod) => {
    const promise = updateUser(values);
    toast.promise(promise, {
      loading: "User updating...",
      success: "User updated!",
      error: "Something went wrong try again later",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-8">
      <div className="w-full max-w-md p-6 bg-card rounded-xl shadow-md border border-border animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-lg transition-all">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Update Your Profile
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Name
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Name"
                    aria-describedby={
                      fieldState.error ? "name-error" : undefined
                    }
                  />
                  <FormMessage
                    id="name-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Profile Image
                  </FormLabel>
                  <div className="p-3 bg-muted/50 rounded-lg border border-border transition-colors duration-200 hover:border-primary/50">
                    <ImageUpload
                      endpoint="singleImageUploader"
                      value={field.value ? [field.value] : []}
                      onChange={(urls) => field.onChange(urls[0] || "")}
                    />
                  </div>
                  <FormMessage
                    id="image-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Phone
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your phone number"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Phone number"
                    aria-describedby={
                      fieldState.error ? "phone-error" : undefined
                    }
                  />
                  <FormMessage
                    id="phone-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Address
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your address"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Address"
                    aria-describedby={
                      fieldState.error ? "address-error" : undefined
                    }
                  />
                  <FormMessage
                    id="address-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    City
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your city"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="City"
                    aria-describedby={
                      fieldState.error ? "city-error" : undefined
                    }
                  />
                  <FormMessage
                    id="city-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    State
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your state"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="State"
                    aria-describedby={
                      fieldState.error ? "state-error" : undefined
                    }
                  />
                  <FormMessage
                    id="state-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Postal Code
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your postal code"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Postal code"
                    aria-describedby={
                      fieldState.error ? "postalCode-error" : undefined
                    }
                  />
                  <FormMessage
                    id="postalCode-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Country
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your country"
                    className="border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Country"
                    aria-describedby={
                      fieldState.error ? "country-error" : undefined
                    }
                  />
                  <FormMessage
                    id="country-error"
                    className="text-destructive text-sm mt-1"
                  />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4 pt-4">
              <Link href={`/profile/${user.id}`} className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full px-6 py-2 border-border text-foreground rounded-full hover:bg-muted/50 transition"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateUserForm;
