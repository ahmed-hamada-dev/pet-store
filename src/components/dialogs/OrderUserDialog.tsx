"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@prisma/client";

interface IProps {
  order: Order;
}

const OrderUserDialog = ({ order }: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className="cursor-pointer px-3 py-1 text-sm bg-primary/20 text-primary hover:bg-primary/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
          Show Order Details
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-background/70 backdrop-blur-2xl border border-primary/30 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400 delay-100 fill-mode-both">
          <Card className="bg-background/80 border border-primary/20">
            <CardContent className="space-y-3 p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Name</p>
                <p className="text-sm text-muted-foreground">{order.name}</p>
              </div>
              <Separator className="bg-primary/20" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{order.email}</p>
              </div>
              <Separator className="bg-primary/20" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">{order.phone}</p>
              </div>
              <Separator className="bg-primary/20" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{order.address}</p>
              </div>
              <Separator className="bg-primary/20" />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">City</p>
                  <p className="text-sm text-muted-foreground">{order.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">State</p>
                  <p className="text-sm text-muted-foreground">{order.state}</p>
                </div>
              </div>
              <Separator className="bg-primary/20" />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Country</p>
                  <p className="text-sm text-muted-foreground">
                    {order.country}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Postal Code
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.postalCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderUserDialog;
