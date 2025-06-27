import * as React from 'react'
import { cn } from '@/lib/utils'
import { BadgeVariant, badgeVariants } from './badge-variants'

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: BadgeVariant }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
