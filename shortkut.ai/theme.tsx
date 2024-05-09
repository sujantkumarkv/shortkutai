import {
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core"
import type { EmotionCache } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { type PropsWithChildren, useEffect, useState } from "react"

interface Props extends PropsWithChildren {
  emotionCache?: EmotionCache
}

export function ThemeProvider({ emotionCache, children }: Props) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  useEffect(() => {
    const systemColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    setColorScheme(systemColorScheme ? "dark" : "light")
  }, [])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withNormalizeCSS
        // emotionCache={emotionCache}
        theme={{ colorScheme }}>
        <Notifications zIndex={9999999} position="bottom-right" />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
