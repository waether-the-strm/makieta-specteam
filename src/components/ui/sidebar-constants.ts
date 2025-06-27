import { useContext, Context } from 'react'

export type SidebarContextType = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export function useSidebar(context: Context<SidebarContextType | null>) {
  const ctx = useContext(context)
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return ctx
}

export const SIDEBAR_COOKIE_NAME = 'sidebar:state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'
