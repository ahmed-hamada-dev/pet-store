import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CardTitle } from "../ui/card";
import Image from "next/image";
import { orderItemWithProduct } from "@/lib/types/order.types";

export default function OrderProductsDialog({
  children,
  items,
}: {
  children: ReactNode;
  items: orderItemWithProduct[];
}) {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-500 hover:underline">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-background/70 backdrop-blur-2xl border border-primary/30 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Order Products
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-400 delay-100 fill-mode-both">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-background/80 border border-primary/20 rounded-lg transition-all hover:scale-[1.02]"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <Image
                src={item.product.images[0] || "/placeholder.png"}
                alt={item.product.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <CardTitle className="text-lg text-foreground">
                  {item.product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
