import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,box-shadow,transform,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-fg shadow-card hover:bg-primary-soft",
        secondary:
          "bg-surface text-fg shadow-card hover:shadow-card-hover",
        ghost:
          "bg-transparent text-fg hover:bg-bg-warm",
        link: "bg-transparent text-primary underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-10 px-3.5 text-sm rounded-[10px]",
        md: "h-12 px-5 text-[0.95rem] rounded-md",
        lg: "h-14 px-6 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

export { buttonVariants };
