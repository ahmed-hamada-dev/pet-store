import { ReactNode } from "react";
import { placeOrder } from "@/actions/order.action";
import { toast } from "react-hot-toast";
import CheckoutForm from "../forms/CheckoutForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { orderZod } from "@/validations/order.zod";
import { useQueryClient } from "@tanstack/react-query";

interface CheckoutDialogProps {
  children: ReactNode;
}

function CheckoutDialog({ children }: CheckoutDialogProps) {
  const queryClient = useQueryClient();

  const handleCashOnDelivery = async (data: orderZod) => {
    const promise = placeOrder(data);

    toast.promise(promise, {
      loading: "Creating order...",
      error: "Failed to make an order",
      success: "Order Created Successfully! 🌟",
    });

    const result = await promise;
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-sm border-none shadow-xl mx-auto min-h-[90vh] overflow-y-auto rounded-lg animate-in fade-in zoom-in-95 duration-300">
        {/* Gradient Border Accent */}
        <div className="absolute inset-0 border-2 border-transparent bg-primary/20 rounded-lg pointer-events-none" />
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold tracking-tight text-primary">
            Checkout
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Choose your payment method and enter your details
          </p>
        </DialogHeader>
        <div className="px-6 pb-6">
          <CheckoutForm onSubmit={handleCashOnDelivery} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutDialog;
