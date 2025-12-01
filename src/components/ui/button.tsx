"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const styles = {
      // primary call-to-action: solid yellow
      primary:
        "bg-[#FFD369] text-[#222831] hover:bg-[#FFC947] shadow-[0_10px_35px_rgba(0,0,0,0.12)]",
      // secondary: dark outline, light background
      secondary:
        "bg-white text-[#222831] border border-[#222831] hover:bg-[#222831] hover:text-[#FFD369]",
      // ghost: subtle text-only
      ghost:
        "text-[#222831] hover:text-[#222831] hover:bg-[#F3F3F3] border border-transparent",
    }[variant];

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50",
          styles,
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

