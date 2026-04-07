import api from "@/services/api"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";



function Produto_Descriçao() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const { addToCart } = useCart()

    async function GetProducts() {
        const productFromApi = await api.get(`api/products/${id}/`)
        setProduct(productFromApi.data)
    }

    useEffect(() => {
        GetProducts()
    }, [id])    

    if (!product) return <p>Carregando...</p>

    return (
        <>
        <Navbar />
        <div className="'bg-zinc-100 rounded-md mx-4 p-4 shadow-xl">
            <h1 className="text-2xl">{product.name}</h1>
            <h2>{product.description}</h2>
            <p>R$ {product.price}</p>
            <p>Estoque Restante: {product.stock}</p>

            <Button className="w-1/2 cursor-pointer" onClick={() => {
                addToCart(product)
                navigate("/carrinho")
                }}>
                Adicionar ao Carrinho
            </Button>
            <Button className="w-1/2 cursor-pointer" variant="secondary" onClick={ () => navigate("/listar_produtos")}>
                Voltar
            </Button>
        </div>
        </>
)
}

export default Produto_Descriçao