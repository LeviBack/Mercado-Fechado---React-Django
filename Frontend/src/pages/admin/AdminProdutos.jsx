import Navbar_admin from "@/components/admin/Navbar-admin"
import api from "@/services/api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function AdminProdutos() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    async function GetProducts() {
        const productsFromApi = await api.get("api/products")  
        setProducts(productsFromApi.data)
    }

    useEffect(() => {
        GetProducts()
    }, [])

    return (
        <>
            <Navbar_admin />

             <div className='flex flex-col items-center gap-4 '>

            <h1 className='text-2xl mx-auto w-full px-40 max-w-xl'>Nossos Produtos: </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4 mb-3">
            {products.map( product => (
                <div className='bg-zinc-100 rounded-md p-4 shadow-lg' key={product.id}>
                    <Card className="flex flex-col justify-between h-full p-4 w-auto">
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>R$ {product.price}</p>
                            <p>Ainda Resta: {product.stock}</p>
                            <Button variant='default' className="cursor-pointer" onClick={ () => navigate(`/admin/products/${product.id}`)}>
                                Modificar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ))}
            </div>
        </div>
            
        </>
    )
}

export default AdminProdutos