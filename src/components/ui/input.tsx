import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Vendored from shadcn/ui, re-tuned: 44px height so it clears the touch target,
 * card surface so the field reads as a field on our tinted page background, and a
 * placeholder colour that passes AA rather than the usual near-invisible grey.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-card px-3.5 py-2 text-base",
        "transition-[color,box-shadow,border-color] outline-none",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/45",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  )
}

export { Input }
