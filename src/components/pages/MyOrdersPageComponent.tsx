"use client";

import Image from "next/image";
import { ordersType } from "@/lib/types/order.types";
import { getPaymentVariant, getStatusVariant } from "@/lib/variants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function MyOrdersPageComponent({
  myOrders,
}: {
  myOrders: ordersType;
}) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful! Your order has been placed. ", {
        duration: 5000,
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          color: "#1a1a1a",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
      });
    }
  }, [sessionId]);

  if (!myOrders || myOrders.length === 0) {
    return (
      <Card className="max-w-6xl mx-auto border-none shadow-2xl bg-background/95 backdrop-blur-md rounded-xl">
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground text-xl font-semibold tracking-tight">
            You have no orders yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="border-none shadow-2xl bg-background/95 backdrop-blur-md rounded-xl relative overflow-hidden animate-in fade-in duration-700">
        <div className="absolute inset-0 border-2 border-transparent bg-primary/30 rounded-xl pointer-events-none" />
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            My Orders
          </CardTitle>
          <p className="text-muted-foreground text-sm sm:text-base">
            View your recent purchases and order details
          </p>
        </CardHeader>
        <CardContent className="space-y-8 py-6">
          {myOrders.map((order, index) => {
            const totalPrice = order.items.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="relative border-none shadow-lg bg-background/80 backdrop-blur-md p-6 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="absolute inset-0 border-2 border-transparent bg-muted/30 rounded-lg pointer-events-none transition-all duration-500" />
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <Badge
                      className={`${getStatusVariant(
                        order.status
                      )} text-white font-semibold px-4 py-1.5 rounded-full hover:shadow-lg transition-all duration-300`}
                      aria-label={`Order status: ${order.status.replace(
                        "_",
                        " "
                      )}`}
                    >
                      {order.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      className={`${getPaymentVariant(
                        order.paymentMethod || ""
                      )} text-white font-semibold px-4 py-1.5 rounded-full hover:shadow-lg transition-all duration-300`}
                      aria-label={`Payment method: ${order.paymentMethod?.replace(
                        "_",
                        " "
                      )}`}
                    >
                      {order.paymentMethod?.replace("_", " ")}
                    </Badge>
                  </div>

                  {/* Order Details */}
                  <div className="flex flex-col sm:flex-row justify-between mb-6 text-sm text-muted-foreground">
                    <p className="mb-2 sm:mb-0">
                      <span className="font-semibold text-foreground">
                        Order ID:
                      </span>{" "}
                      {order.id.slice(0, 8)}...
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        Date:
                      </span>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-muted/20 py-3 group/item transition-all duration-200 hover:bg-muted/5 rounded-lg px-2"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border transition-transform duration-300 group-hover/item:scale-105">
                          <Image
                            src={item.product.images[0] || "/placeholder.png"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-base transition-colors duration-300 group-hover/item:text-primary">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Price */}
                  <p className="mt-6 text-lg sm:text-xl font-bold text-primary animate-in fade-in zoom-in duration-500">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </Card>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
