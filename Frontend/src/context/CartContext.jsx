import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const userId = localStorage.getItem("user_id")
    const cartKey = `cart_${userId}`

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem(cartKey)
        return saved ? JSON.parse(saved) : []
    })

    // Salva no localStorage toda vez que o carrinho mudar
    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cart))
    }, [cart])

    function addToCart(product) {

    const token = localStorage.getItem("access_token")

    if (!token) {
        window.location.href = "/signin?message=Você precisa estar logado para adicionar produtos ao carrinho!"
        return
    }
    
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id)

            if (exists) {
                // Se já tiver no carrinho, só aumenta a quantidade
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    function removeFromCart(productId) {
        setCart((prev) => prev.filter((item) => item.id !== productId))
    }

    function clearCart() {
        setCart([])
    }

    function increaseQuantity(productId) {
    setCart((prev) =>
        prev.map((item) =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        )   
    }
    function decreaseQuantity(productId) {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}