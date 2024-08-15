import { createContext, ReactNode, useEffect, useState } from 'react'

export type CartItem = {
    id: number;
    price: number;
    images: { image: string }[];
    [key: string]: any; // Dinamik tillar uchun
}

export type BasketItem = {
    productSlug: string;
    selectedTerm: number;
    monthlyPayment: number;
}

export type ContextType = {
    cartItems: CartItem[];
    basketItems: BasketItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    updateBasketItem: (productSlug: string, selectedTerm: number, monthlyPayment: number) => void;
    clearBasket: () => void;
}

export const ShoppingCartContext = createContext<ContextType | undefined>(undefined)

type ProviderProps = {
    children: ReactNode;
}

export const ShoppingCartProvider = ({ children }: ProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems')
        const storedBasketItems = localStorage.getItem('basketItems')
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems))
        }
        if (storedBasketItems) {
            setBasketItems(JSON.parse(storedBasketItems))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        localStorage.setItem('basketItems', JSON.stringify(basketItems))
    }, [cartItems, basketItems])

    const addToCart = (item: CartItem) => {
        if (!cartItems.some(i => i.id === item.id)) {
            setCartItems([...cartItems, item])
        }
    }

    const removeFromCart = (itemId: number) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId)
        setCartItems(updatedCart)
        
        // Remove corresponding basket item if exists
        setBasketItems(prevItems => prevItems.filter(item => item.productSlug !== cartItems.find(i => i.id === itemId)?.slug))
    }

    const clearCart = () => {
        setCartItems([])
        setBasketItems([])
    }

    const updateBasketItem = (productSlug: string, selectedTerm: number, monthlyPayment: number) => {
        setBasketItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.productSlug === productSlug)
            if (existingItemIndex !== -1) {
                // Update existing item
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex] = { productSlug, selectedTerm, monthlyPayment }
                return updatedItems
            } else {
                // Add new item
                return [...prevItems, { productSlug, selectedTerm, monthlyPayment }]
            }
        })
    }

    const clearBasket = () => {
        setBasketItems([])
    }

    const contextValues: ContextType = {
        cartItems,
        basketItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateBasketItem,
        clearBasket,
    }

    return (
        <ShoppingCartContext.Provider value={contextValues}>
            {children}
        </ShoppingCartContext.Provider>
    )
}