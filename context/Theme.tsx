"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { FC, PropsWithChildren } from "react"

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
