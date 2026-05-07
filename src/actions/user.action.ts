/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn, signOut } from "@/auth";
import { cachedUser } from "@/lib/cache/user.cache";
import prisma from "@/lib/db";
import { userZod } from "@/validations/user.zod";
import { User } from "@prisma/client";

export const login = async () => {
  await signIn("google");
};
export const logout = async () => {
  await signOut();
};
export const getUser = async (): Promise<User | null> => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      console.warn("No user ID found in session.");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user || null;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null; // Safe for prerendering
  }
};

export const updateUser = async (data: userZod) => {
  try {
    const user = await cachedUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const parsed = userZod.safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid user data: " + parsed.error.message);
    }

    const userId = user.id;
    return await prisma.user.update({
      where: { id: userId },
      data: {
        name: parsed.data.name ?? user.name,
        image: parsed.data.image ?? user.image,
        phone: parsed.data.phone ?? user.phone,
        address: parsed.data.address ?? user.address,
        city: parsed.data.city ?? user.city,
        state: parsed.data.state ?? user.state,
        postalCode: parsed.data.postalCode ?? user.postalCode,
        country: parsed.data.country ?? user.country,
      },
    });
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    throw new Error(error.message || "Failed to update profile.");
  }
};

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
      },
    });
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

export async function getUsersCount() {
  return await prisma.user.count();
}
