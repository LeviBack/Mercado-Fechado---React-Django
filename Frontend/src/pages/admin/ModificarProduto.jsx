import Navbar_admin from "@/components/admin/Navbar-admin"
import { Button } from "@/components/ui/button"
import api from "@/services/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ModProduto() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    async function GetProduct() {
        const response = await api.get(`api/products/${id}/`)
        setProduct(response.data)
    }

    function DeleteProduct() {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            api.delete(`api/products/${id}/`)
            navigate("/admin/produtos")
        }
    }

    useEffect( () => {
        GetProduct()
    }, [id])

    if (!product) return <p>Carregando...</p>

    return (
        <>
        <Navbar_admin />

        <div className="'bg-zinc-100 rounded-md mx-4 p-4 shadow-xl">
            <h1 className="text-2xl">{product.name}</h1>
            <h2>{product.description}</h2>
            <p>R$ {product.price}</p>
            <p>Estoque Restante: {product.stock}</p>

            <Button className="w-1/3 cursor-pointer" onClick={() => {
                navigate(`/admin/atualizar_produto/${id}`)
                }}>
                Atualizar
            </Button>
            <Button className="w-1/3 cursor-pointer" variant="destructive" onClick={DeleteProduct}>
                Deletar
            </Button>
            <Button className="w-1/3 cursor-pointer" variant="secondary" onClick={ () => navigate("/admin/produtos")}>
                Voltar
            </Button>
        </div>
        </>
        
    )
}

export default ModProduto