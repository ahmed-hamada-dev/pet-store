"use client";
export const dynamic = "force-dynamic";

import { getCartItems, clearCart } from "@/actions/cart.action";
import CartItem from "@/components/CartItem";
import CartItemSkeleton from "@/components/CartItemSkeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConfirmDeleteCartItem from "@/components/dialogs/ConfirmDeleteCartItem";
import CheckoutDialog from "@/components/dialogs/CheckoutDialog";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";

export default function CartPage() {
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      toast.success("Cart cleared successfully! 🌟");
    },
    onError: () => toast.error("Failed to clear cart. Please try again."),
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="relative border-none shadow-xl bg-background/95 backdrop-blur-sm max-w-5xl mx-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Gradient Border Accent */}
          <div className="absolute inset-0 border-2 border-transparent bg-primary/20 rounded-lg pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">
              Your Cart
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Review your items and proceed to checkout
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-destructive text-lg font-semibold">
                  Error loading cart. Please try again later.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-muted/50 hover:bg-muted/50 transition-colors duration-300"
                  onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ["cart"] })
                  }
                >
                  Retry
                </Button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-semibold">
                  Your cart is empty
                </p>
                <p className="text-muted-foreground mt-2">
                  Explore our products and add some items!
                </p>
                <Link href="/products/1">
                  <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                    Shop Now
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Suspense fallback={<Loader />}>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="group animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      >
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                </Suspense>

                <Separator className="bg-muted/30" />

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4 animate-in fade-in duration-500 delay-300 fill-mode-both">
                  <h2 className="text-xl font-semibold text-foreground">
                    Total Price:
                  </h2>
                  <p className="text-2xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-12 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
                  <CheckoutDialog>
                    <Button
                      asChild
                      className="flex-1 bg-green-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 text-lg font-semibold"
                    >
                      <div className="w-[360px]">Checkout</div>
                    </Button>
                  </CheckoutDialog>
                  <ConfirmDeleteCartItem
                    onDelete={() => clearCartMutation.mutate()}
                  >
                    <Button
                      disabled={clearCartMutation.isPending}
                      variant="destructive"
                      className="w-[240px] bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {clearCartMutation.isPending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Clearing...
                        </>
                      ) : (
                        "Clear Cart"
                      )}
                    </Button>
                  </ConfirmDeleteCartItem>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
