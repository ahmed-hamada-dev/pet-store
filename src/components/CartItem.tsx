"use client";
import { cartItemType } from "@/lib/types/cartTypes";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemQuantity, removeCartItem } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ConfirmDeleteCartItem from "@/components/dialogs/ConfirmDeleteCartItem";
import { Trash2, Loader2, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface IProps {
  item: cartItemType;
}

function CartItem({ item }: IProps) {
  const queryClient = useQueryClient();
  const maxQuantity = item.product.quantity;

  const updateQuantityMutation = useMutation({
    mutationFn: (newQuantity: number) =>
      updateCartItemQuantity(item.id, newQuantity),
    onMutate: async (newQuantity) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<cartItemType[]>(["cart"]);
      queryClient.setQueryData<cartItemType[]>(["cart"], (oldCart) =>
        oldCart
          ? oldCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: newQuantity }
                : cartItem,
            )
          : [],
      );

      return { previousCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      toast.success("Quantity updated successfully! 🌟");
    },
    onError: (_error, _newQuantity, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error("Failed to update quantity. Please try again.");
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: () => removeCartItem(item.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<cartItemType[]>(["cart"]);
      queryClient.setQueryData<cartItemType[]>(["cart"], (oldCart) =>
        oldCart ? oldCart.filter((cartItem) => cartItem.id !== item.id) : [],
      );

      return { previousCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      toast.success("Item removed from cart! 🌟");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error("Failed to remove item. Please try again.");
    },
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card className="flex items-center gap-4 p-4 border shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
          <Image
            src={item.product.images[0] || "/placeholder.png"}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">
            {item.product.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            ${item.product.price.toFixed(2)} × {item.quantity} ={" "}
            <span className="font-bold text-primary">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </p>
          {item.product.quantity < 5 && (
            <p className="text-xs text-destructive font-medium">
              Only {item.product.quantity} left
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-full px-1 bg-muted/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantityMutation.mutate(item.quantity - 1)}
              disabled={updateQuantityMutation.isPending || item.quantity === 1}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              {updateQuantityMutation.isPending &&
              updateQuantityMutation.variables === item.quantity - 1 ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
            </Button>
            <span className="text-sm font-bold w-6 text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantityMutation.mutate(item.quantity + 1)}
              disabled={
                updateQuantityMutation.isPending || item.quantity >= maxQuantity
              }
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              {updateQuantityMutation.isPending &&
              updateQuantityMutation.variables === item.quantity + 1 ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-3 w-3" />
              )}
            </Button>
          </div>
          <ConfirmDeleteCartItem onDelete={() => removeItemMutation.mutate()}>
            <Button
              disabled={removeItemMutation.isPending}
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:bg-destructive/10 rounded-full transition-all"
            >
              {removeItemMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </ConfirmDeleteCartItem>
        </div>
      </Card>
    </div>
  );
}

export default CartItem;
