"use client";

import { ordersType } from "@/lib/types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/actions/order.action";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { OrderStatus } from "@prisma/client";
import { toast } from "react-hot-toast";
import OrderProductsDialog from "../dialogs/OrderProductsDialog";
import OrderUserDialog from "../dialogs/OrderUserDialog";
import { Badge } from "../ui/badge";
import { getPaymentVariant } from "@/lib/variants";

function OrdersTable({ orders }: { orders: ordersType }) {
  const queryClient = useQueryClient();

  const orderStatus = [
    { name: "Pending", value: "PENDING" },
    { name: "On Way", value: "ON_WAY" },
    { name: "Delivered", value: "DELIVERED" },
    { name: "Cancelled", value: "CANCELED" },
  ];

  const mutation = useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: string;
      newStatus: OrderStatus;
    }) => {
      return await updateOrderStatus(orderId, newStatus);
    },
    onMutate: async ({ orderId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousOrders = queryClient.getQueryData<ordersType>(["orders"]);

      queryClient.setQueryData(
        ["orders"],
        (oldOrders: ordersType | undefined) =>
          oldOrders
            ? oldOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order,
              )
            : [],
      );

      return { previousOrders };
    },
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error, _, context) => {
      toast.error("Failed to update order status.");
      console.error("Mutation error:", error);

      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }
    },
  });

  return (
    <div className="h-screen flex flex-col py-8 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        <div className="animate-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center tracking-tight">
            Orders Management
          </h1>
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-lg overflow-x-auto relative flex-1 max-h-[calc(100%-140px)] overflow-y-auto">
          <Table aria-label="Orders table">
            <TableHeader>
              <TableRow className="bg-muted sticky top-0 z-10 shadow-sm">
                {["Date", "Total", "Products", "User", "Payment", "Status"].map(
                  (header) => (
                    <TableHead
                      key={header}
                      className="text-foreground font-bold text-sm py-4"
                    >
                      {header}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.length ? (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors duration-200"
                  >
                    <TableCell className="text-foreground font-medium text-sm py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-foreground font-medium text-sm py-4">
                      $
                      {order.items
                        .reduce(
                          (acc, item) =>
                            acc + item.product.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4">
                      <OrderProductsDialog items={order.items}>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors">
                          Show Products
                        </Badge>
                      </OrderProductsDialog>
                    </TableCell>
                    <TableCell className="py-4">
                      <OrderUserDialog order={order} key={order.id} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm py-4">
                      <span className={getPaymentVariant(order.paymentMethod!)}>
                        {order.paymentMethod === "CASH_ON_DELIVERY"
                          ? "On Delivery"
                          : "Visa"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) =>
                          mutation.mutate({
                            orderId: order.id,
                            newStatus: value as OrderStatus,
                          })
                        }
                      >
                        <SelectTrigger className="w-[150px] bg-background border-border">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatus.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-12"
                  >
                    <div className="animate-in zoom-in-95 duration-500">
                      <p className="text-lg font-semibold text-foreground">
                        No orders available
                      </p>
                      <p className="mt-2 text-sm">
                        There are currently no orders to display.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
