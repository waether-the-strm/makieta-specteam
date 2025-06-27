import { cva } from 'class-variance-authority'

export enum ButtonVariant {
  Default = 'default',
  Destructive = 'destructive',
  Outline = 'outline',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Link = 'link',
}

export enum ButtonSize {
  Default = 'default',
  Sm = 'sm',
  Lg = 'lg',
  Icon = 'icon',
}

type ButtonVariantType = `${ButtonVariant}`
type ButtonSizeType = `${ButtonSize}`

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        [ButtonVariant.Default]: 'bg-primary text-primary-foreground hover:bg-primary/90',
        [ButtonVariant.Destructive]:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        [ButtonVariant.Outline]:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        [ButtonVariant.Secondary]: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        [ButtonVariant.Ghost]: 'hover:bg-accent hover:text-accent-foreground',
        [ButtonVariant.Link]: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        [ButtonSize.Default]: 'h-10 px-4 py-2',
        [ButtonSize.Sm]: 'h-9 rounded-md px-3',
        [ButtonSize.Lg]: 'h-11 rounded-md px-8',
        [ButtonSize.Icon]: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.Default,
      size: ButtonSize.Default,
    },
  }
)

export type { ButtonVariantType, ButtonSizeType }
