"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#222831] placeholder:text-[#555555]/60 focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

