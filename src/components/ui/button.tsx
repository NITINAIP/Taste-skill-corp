import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Vendored from shadcn/ui and re-tuned for this project (DESIGN-BRIEF sections 3-5).
 *
 * Changes from the default state, which the taste-skill forbids shipping as-is:
 * - `brand` variant added. It is the only amber fill on the site and it pairs with
 *   `--brand-foreground` navy, never white. White on amber is 2.6:1 and fails AA.
 *   Note `--accent` keeps shadcn's own meaning (subtle hover surface); the brand
 *   amber lives on `--brand`.
 * - Heights raised so the default control clears the 44px touch target.
 * - Tactile press: lifts 1px on hover, settles and compresses on active.
 * - Navy-tinted shadow. No black shadows anywhere in this system.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md",
    "font-medium whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-55",
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        brand: "bg-brand text-brand-foreground shadow-btn hover:bg-brand-hover",
        default:
          "bg-primary text-primary-foreground shadow-btn hover:bg-primary-hover",
        outline:
          "border border-border bg-card text-foreground shadow-btn hover:border-primary/35 hover:bg-primary/5",
        subtle: "bg-primary/8 text-primary hover:bg-primary/14",
        ghost: "text-foreground hover:bg-foreground/6",
        onDark:
          "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/18",
        link: "text-primary underline-offset-4 hover:underline motion-safe:hover:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-btn hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-9 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
