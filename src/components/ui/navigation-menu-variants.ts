import { cva } from 'class-variance-authority'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-slate-200 focus:bg-slate-700 focus:text-slate-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-slate-700/50 data-[state=open]:bg-slate-700/50'
)
