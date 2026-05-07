"use client";

import Link from "next/link";
import Login from "./buttons/Login";
import { ModeToggle } from "./buttons/ModeToggle";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/UserIcon";
import Search from "./Search";
import FilterByCategory from "./FilterByCategory";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-background/90 backdrop-blur-lg
        shadow-sm
        border-b border-border
        flex flex-col gap-4
        md:grid md:grid-cols-2
        lg:flex lg:flex-row lg:items-center lg:justify-between
        px-4 sm:px-6 lg:px-8 py-4
        transition-all duration-300
      "
    >
      {/* Logo and Links */}
      <div className="flex items-center space-x-6">
        <div>
          <Link
            href="/"
            className="
              text-2xl font-bold tracking-tight
              hover:text-primary transition-colors duration-300
            "
          >
            Pet Store
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <Link
              href="/products/1"
              className="
                text-foreground/80 text-sm font-medium
                hover:text-primary transition-colors duration-300
                relative group
              "
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
          <div>
            <Link
              href="/community"
              className="
                text-foreground/80 text-sm font-medium
                hover:text-primary transition-colors duration-300
                relative group
              "
            >
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-center md:justify-end gap-4">
        <div className="relative w-full max-w-[200px]">
          <Suspense
            fallback={
              <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
            }
          >
            <Search />
          </Suspense>
        </div>
        <div className="relative w-full max-w-[200px]">
          <Suspense
            fallback={
              <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
            }
          >
            <FilterByCategory />
          </Suspense>
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center justify-center md:justify-end gap-5">
        <div className="hover:scale-110 transition-transform duration-200">
          <CartIcon aria-label="View cart" />
        </div>

        <div className="hover:scale-110 transition-transform duration-200">
          {user ? (
            <UserIcon user={user} aria-label="User profile" />
          ) : (
            <Login aria-label="Log in" />
          )}
        </div>

        <div className="hover:scale-110 transition-transform duration-200">
          <ModeToggle aria-label="Toggle theme" />
        </div>
      </div>
    </nav>
  );
}
