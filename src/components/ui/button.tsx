import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3351] dark:focus-visible:ring-teal-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#1f3351] dark:bg-teal-500 hover:bg-[#15243b] dark:hover:bg-teal-400 text-white",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-[#dce8ee] dark:border-teal-400/50 bg-white dark:bg-white/5 text-[#1f3351] dark:text-white hover:bg-[#f3f7fa] dark:hover:bg-teal-500/20 dark:hover:border-teal-400 dark:hover:text-white",
        secondary:
          "bg-[#f3f7fa] dark:bg-white/10 text-[#1f3351] dark:text-white hover:bg-[#e4edf2] dark:hover:bg-white/20",
        ghost: "hover:bg-[#f3f7fa] dark:hover:bg-white/10 text-[#1f3351] dark:text-white",
        link: "text-[#1f3351] dark:text-teal-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
