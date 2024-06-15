// src/hooks/useTelegramTheme.ts
import { useEffect, useState } from 'react'

declare global {
    interface Window {
        Telegram: any
    }
}

function useTelegramTheme() {
    const [theme, setTheme] = useState<string>('light')

    useEffect(() => {
        const tg = window.Telegram.WebApp

        // Dastlabki rang sxemasini o'rnatish
        setTheme(tg.colorScheme)

        // Rang sxemasi o'zgarganda voqeani tinglash
        tg.onEvent('themeChanged', () => {
            setTheme(tg.colorScheme)
        })

        // Telegram Web Apps-ni boshlash
        tg.ready()
    }, [])

    return theme
}

export default useTelegramTheme
