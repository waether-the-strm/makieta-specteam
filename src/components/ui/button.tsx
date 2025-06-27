import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  buttonVariants,
  ButtonVariant,
  ButtonVariantType,
  ButtonSize,
  ButtonSizeType,
} from './button-variants'
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariantType
  size?: ButtonSizeType
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = ButtonVariant.Default,
      size = ButtonSize.Default,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: variant as ButtonVariant,
            size: size as ButtonSize,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
