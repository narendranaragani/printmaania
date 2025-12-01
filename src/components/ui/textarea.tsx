"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#222831] placeholder:text-[#555555]/60 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

