"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (urls: string[]) => void;
  value: string[];
  endpoint: "singleImageUploader" | "multiImageUploader";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  const isMultiple = endpoint === "multiImageUploader";
  const maxImages = 5;
  const canUploadMore = isMultiple
    ? value.length < maxImages
    : value.length === 0;

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {value.map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl border border-border bg-background/90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Uploaded"
                className="h-36 w-full object-cover"
              />
              <button
                onClick={() => {
                  const updatedImages = value.filter((_, i) => i !== index);
                  onChange(updatedImages.length > 0 ? updatedImages : []);
                }}
                className="absolute right-2 top-2 rounded-full bg-muted-foreground/10 p-1 text-muted-foreground transition hover:bg-muted-foreground/20"
                type="button"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {canUploadMore && (
        <div className="rounded-3xl border border-border bg-background/90 p-4 text-muted-foreground">
          <UploadDropzone
            className="min-h-[140px] rounded-3xl border border-dashed border-border bg-background/80 p-4"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              if (!res) return;
              const urls = res.map((file) => file.ufsUrl || file.url);
              onChange(isMultiple ? [...value, ...urls] : [urls[0]]);
            }}
            onUploadError={(error: Error) => {
              console.log(error);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
