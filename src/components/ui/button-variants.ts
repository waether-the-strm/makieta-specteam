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
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        [ButtonVariant.Default]: 'bg-slate-600 text-slate-200 hover:bg-slate-500',
        [ButtonVariant.Destructive]: 'bg-red-600 text-white hover:bg-red-500',
        [ButtonVariant.Outline]:
          'border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:text-slate-200',
        [ButtonVariant.Secondary]: 'bg-slate-700 text-slate-300 hover:bg-slate-600',
        [ButtonVariant.Ghost]: 'hover:bg-slate-700 hover:text-slate-200',
        [ButtonVariant.Link]: 'text-slate-400 underline-offset-4 hover:underline',
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
