import { cva } from 'class-variance-authority'

export enum BadgeVariant {
  Default = 'default',
  Secondary = 'secondary',
  Destructive = 'destructive',
  Outline = 'outline',
}

type BadgeVariantType = `${BadgeVariant}`

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        [BadgeVariant.Default]:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        [BadgeVariant.Secondary]:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        [BadgeVariant.Destructive]:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        [BadgeVariant.Outline]: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: BadgeVariant.Default,
    },
  }
)

export type { BadgeVariantType }
