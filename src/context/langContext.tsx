// Import React
import React, { createContext, useEffect, useState, ReactNode } from "react"

type ContextType = {
    lang: string
    setLang: React.Dispatch<React.SetStateAction<string>>
}

const Context = createContext<ContextType | undefined>(undefined)

type ProviderProps = {
    children: ReactNode
}

function Provider({ children }: ProviderProps) {
    const [lang, setLang] = useState<string>(
        window.localStorage.getItem("lang") || "uz"
    )

    useEffect(() => {
        window.localStorage.setItem("lang", lang)
    }, [lang])

    const contextValue = {
        lang,
        setLang,
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export { Context, Provider }
