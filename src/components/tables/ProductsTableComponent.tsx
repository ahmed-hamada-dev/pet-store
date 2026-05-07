"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";
import { PenIcon, XIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { deleteProduct } from "@/actions/product.action";
import { ProductWithCategoriesTable } from "@/lib/types/product.types";
import UpdateProductDialog from "../dialogs/UpdateProductDialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductsTableProps {
  products: ProductWithCategoriesTable[];
}

function ProductsTableComponent({ products }: ProductsTableProps) {
  const handleDelete = async (id: string, name: string) => {
    const promiseDelete = () => deleteProduct(id);

    toast.promise(promiseDelete(), {
      loading: `${name} is being deleted...`,
      success: `${name} deleted successfully!`,
      error: `Failed to delete ${name}`,
    });
  };

  return (
    <div
      className="
        h-screen
        flex flex-col
        py-8
        animate-in fade-in slide-in-from-bottom-4 duration-700
      "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-extrabold  mb-8 text-center tracking-tight text-primary">
            Products Management
          </h1>
        </div>

        {/* Table Container */}
        <div
          className="
            bg-background/70 backdrop-blur-2xl
            border border-primary/30
            rounded-3xl
            shadow-[0_8px_24px_rgba(0,0,0,0.2)]
            overflow-x-auto
            relative
            flex-1
            max-h-[calc(100%-140px)]
            overflow-y-auto
            transition-all duration-500
            hover:border-primary/50
          "
        >
          <Table aria-label="Products table">
            <TableHeader>
              <TableRow
                className="
                  bg-background/90 backdrop-blur-lg
                  border-b border-primary/30
                  hover:bg-background/95
                  transition-colors duration-300
                  sticky top-0 z-10
                  shadow-sm
                "
              >
                {[
                  "Name",
                  "Created At",
                  "Category",
                  "Quantity",
                  "Update",
                  "Delete",
                ].map((header) => (
                  <TableHead
                    key={header}
                    className="
                      text-foreground font-bold text-base py-5
                      relative
                      group
                    "
                  >
                    {header}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.length ? (
                products.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="
                      border-b border-primary/20
                      group
                      transition-all duration-300
                      hover:bg-primary/5
                      animate-in fade-in slide-in-from-left-4 
                    "
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="text-foreground font-medium text-sm py-5">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm py-5">
                      {format(new Date(product.createdAt), "PP")}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm py-5">
                      {product.category.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm py-5">
                      <span
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-300 group-hover:scale-110",
                          product.quantity > 0
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400",
                        )}
                      >
                        {product.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="py-5">
                      <UpdateProductDialog product={product}>
                        <div className="relative inline-block transition-transform duration-200 hover:scale-125 hover:rotate-12 cursor-pointer p-2 rounded-full hover:bg-green-500/10">
                          <PenIcon
                            className="h-5 w-5 text-green-400"
                            aria-label={`Update ${product.name}`}
                          />
                        </div>
                      </UpdateProductDialog>
                    </TableCell>
                    <TableCell className="py-5">
                      <ConfirmDeleteDialog
                        name={product.name}
                        id={product.id}
                        onDelete={() => handleDelete(product.id, product.name)}
                      >
                        <div className="relative inline-block transition-transform duration-200 hover:scale-125 hover:rotate-12 cursor-pointer p-2 rounded-full hover:bg-red-500/10">
                          <XIcon
                            className="h-5 w-5 text-red-400"
                            aria-label={`Delete ${product.name}`}
                          />
                        </div>
                      </ConfirmDeleteDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="
                      text-center text-muted-foreground text-base py-12
                      bg-background/80 rounded-b-3xl
                    "
                  >
                    <div className="animate-in zoom-in duration-500">
                      <p className="text-lg font-semibold text-foreground">
                        No products available
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add a new product to get started!
                      </p>
                      <div className="mt-4">
                        <Link href="/products/new">
                          <button
                            className="
                              inline-flex items-center px-4 py-2
                              bg-primary
                              text-white font-semibold rounded-lg
                              shadow-md hover:shadow-lg
                              transition-all duration-300
                              hover:scale-105 active:scale-95
                            "
                          >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add Product
                          </button>
                        </Link>
                      </div>
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

export default ProductsTableComponent;
