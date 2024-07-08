// src/hooks/useTelegramTheme.ts
import { useEffect, useState } from 'react'

// Declaring the global Telegram interface
declare global {
    interface Window {
        Telegram: any
    }
}

// Custom hook to manage Telegram theme
function useTelegramTheme() {
    const [theme, setTheme] = useState<string>('light') // State to store the current theme, default is 'light'

    useEffect(() => {
        const tg = window.Telegram.WebApp // Accessing the Telegram WebApp object

        // Setting the initial color scheme from Telegram WebApp
        setTheme(tg.colorScheme)

        // Adding an event listener for theme changes
        tg.onEvent('themeChanged', () => {
            setTheme(tg.colorScheme) // Updating the theme state when the theme changes
        })

        // Indicating that the WebApp is ready
        tg.ready()
    }, []) // Empty dependency array means this effect runs once on mount

    return theme // Returning the current theme
}

export default useTelegramTheme
