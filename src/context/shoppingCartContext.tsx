import React, { createContext, useEffect, useState } from 'react'

// Context yaratish
export const ShoppingCartContext = createContext()

// Context Provider komponenti
export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems')
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item) => {
        if (!cartItems.some(i => i.id === item.id)) {
            setCartItems([...cartItems, item])
        }
    }

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId)
        setCartItems(updatedCart)
    }

    const clearCart = () => {
        setCartItems([])
    }

    const contextValues = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    }

    return (
        <ShoppingCartContext.Provider value={contextValues}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
