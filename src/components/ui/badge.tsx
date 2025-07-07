import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) {
  const variantClass = variant ? `badge--${variant}` : 'badge--default'
  return <div className={cn('badge', variantClass, className)} {...props} />
}

export { Badge }
