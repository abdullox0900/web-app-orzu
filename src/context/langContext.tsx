// Importing React and necessary hooks and types
import React, { createContext, ReactNode, useEffect, useState } from "react"

// Defining the context type with language state and setter function
type ContextType = {
    lang: string
    setLang: React.Dispatch<React.SetStateAction<string>>
}

// Creating context with an undefined initial value
const Context = createContext<ContextType | undefined>(undefined)

// Defining type for provider's props
type ProviderProps = {
    children: ReactNode
}

// Provider component to wrap around children components
function Provider({ children }: ProviderProps) {
    // Setting initial language state from localStorage or defaulting to "uz"
    const [lang, setLang] = useState<string>(
        window.localStorage.getItem("lang") || "uz"
    )

    // useEffect hook to update localStorage whenever the language state changes
    useEffect(() => {
        window.localStorage.setItem("lang", lang)
    }, [lang])

    // Defining the context value with current language state and setter function
    const contextValue = {
        lang,
        setLang,
    }

    // Returning the context provider with the context value and children components
    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

// Exporting the context and provider for use in other components
export { Context, Provider }
