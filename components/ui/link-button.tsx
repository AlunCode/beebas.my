import * as React from 'react'
import Link from 'next/link'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface LinkButtonProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {}

/**
 * A Next.js Link styled like the Button component.
 *
 * Use this instead of `<Link><Button /></Link>` to avoid invalid HTML
 * nesting (`<a>` cannot contain `<button>`), which can cause React
 * hydration mismatches.
 */
export function LinkButton({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
