import { cva, type VariantProps } from 'class-variance-authority'

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-slate-800 transition-colors hover:bg-slate-700 hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-slate-600 data-[state=on]:text-slate-200',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-slate-600 bg-transparent hover:bg-slate-700 hover:text-slate-200',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
export type ToggleVariant = 'default' | 'outline'
export type ToggleSize = 'default' | 'sm' | 'lg'
export type ToggleVariantProps = VariantProps<typeof toggleVariants>
