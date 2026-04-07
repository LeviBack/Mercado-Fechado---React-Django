import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { CirclePlus, Trash, CircleMinus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"


function Carrinho() {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart()
    const [dialogOpen, setDialogOpen] = useState(false)
    const navigate = useNavigate()

    async function finalizarCompra() {
        try {
            console.log(cart)
            await Promise.all(
                cart.map((item) =>
                    api.patch(`api/products/${item.id}/`, {
                        stock: Number(item.stock) - item.quantity
                    })
                )
            )
            clearCart()
            setDialogOpen(false)
            alert("Compra finalizada com sucesso!")
        } catch (err) {
            console.log(err)
            alert("Erro ao finalizar compra!")
        }
    }

    return (
        <>
        <Navbar />

        <div className="flex flex-col items-center py-8 px-4">
            <h1 className="text-2xl font-bold text-center mb-6">Seu Carrinho de Compras</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                {cart.map((item) => (
                    <div key={item.id} className="bg-zinc-100 rounded-md shadow-lg p-2">
                        <Card className="flex flex-col justify-between h-full p-4 w-full">
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>Quantidade: {item.quantity}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Preço: R$ {Number(item.price).toFixed(2)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button variant="default" className="cursor-pointer" onClick={() => increaseQuantity(item.id)}>
                                        <CirclePlus /> Adicionar
                                    </Button>
                                    <Button variant="outline" className="cursor-pointer" onClick={() => decreaseQuantity(item.id)}>
                                        <CircleMinus />
                                    </Button>
                                    <Button variant="destructive" className="cursor-pointer" onClick={() => removeFromCart(item.id)}>
                                        <Trash />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="text-lg font-semibold">
                    Total: R$ {cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2)}
                </p>
                <Button variant="outline" className="cursor-pointer mt-2 mr-3" onClick={() => navigate("/listar_produtos")}>
                    Continuar Comprando
                </Button>
                <Button className="cursor-pointer mt-2 mr-3" onClick={() => setDialogOpen(true)}>
                    Finalizar Compra
                </Button>
                <Button variant="destructive" onClick={clearCart} className="cursor-pointer mt-2">
                    Limpar Carrinho
                </Button>
            </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Pagamento</DialogTitle>
                    <DialogDescription>
                        Você está prestes a pagar R$ {cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2)} pelos seguintes itens:
                    </DialogDescription>
                </DialogHeader>

                <ul className="text-sm space-y-1">
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between">
                            <span>{item.name} x{item.quantity}</span>
                            <span>R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={finalizarCompra}>
                        Confirmar Pagamento
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Carrinho