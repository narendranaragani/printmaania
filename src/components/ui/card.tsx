import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        // Modern e-commerce card with hover effects
        "rounded-[12px] border border-[#E5E7EB] bg-white p-6 text-[#1A1A1A]",
        "shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300",
        "hover:shadow-[0_18px_55px_rgba(0,0,0,0.15)] hover:scale-[1]",
        className,
      )}
      {...props}
    />
  );
};

