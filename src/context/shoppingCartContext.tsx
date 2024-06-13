import { createContext, ReactNode, useEffect, useState } from 'react'

// Define type for Context values
type ContextType = {
    cartItems: any[] // Change 'any[]' to your specific item type if possible
    addToCart: (item: any) => void // Change 'any' to your specific item type if possible
    removeFromCart: (itemId: any) => void // Change 'any' to your specific item type if possible
    clearCart: () => void
}

// Create context with initial undefined value
export const ShoppingCartContext = createContext<ContextType | undefined>(undefined)

// Define props for Provider component
type ProviderProps = {
    children: ReactNode
}

// Provider component
export const ShoppingCartProvider = ({ children }: ProviderProps) => {
    const [cartItems, setCartItems] = useState<any[]>([]) // Change 'any[]' to your specific item type if possible

    // Load cart items from localStorage on mount
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems')
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems))
        }
    }, [])

    // Update localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // Function to add item to cart
    const addToCart = (item: any) => {
        if (!cartItems.some(i => i.id === item.id)) {
            setCartItems([...cartItems, item])
        }
    }

    // Function to remove item from cart
    const removeFromCart = (itemId: any) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId)
        setCartItems(updatedCart)
    }

    // Function to clear the entire cart
    const clearCart = () => {
        setCartItems([])
    }

    // Context values to be provided
    const contextValues: ContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    }

    // Provide context values to children components
    return (
        <ShoppingCartContext.Provider value={contextValues}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
