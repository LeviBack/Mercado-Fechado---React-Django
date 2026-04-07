import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "@/services/api"
import Navbar_admin from "@/components/admin/Navbar-admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function AtualizarProduto() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" })
    const navigate = useNavigate()

    useEffect(() => {
        GetProduct()
    }, [id])

    async function GetProduct() {
        const response = await api.get(`api/products/${id}/`)
        setProduct(response.data)
        setForm(response.data) // pré-preenche o formulário com os dados atuais
    }

    async function UpdateProduct() {
        try {
            await api.patch(`api/products/${id}/`, form)
            alert("Produto atualizado com sucesso!")
        } catch (err) {
            console.log(err.response?.data)
            alert("Erro ao atualizar produto: ")
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    if (!product) return <p>Carregando...</p>

    return (
        <>
        <Navbar_admin />

        <div className="flex gap-8 p-8 bg-zinc-100 rounded-lg shadow-xl mx-4">

            {/* Formulário */}
            <div className="flex-1 bg-white rounded-md p-6 flex flex-col gap-3">
                <h1 className="text-2xl font-bold mb-4">Atualizando Produto</h1>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Nome" />
                <Input name="description" value={form.description} onChange={handleChange} placeholder="Descrição" />
                <Input name="price" value={form.price} onChange={handleChange} placeholder="Preço" type="number" />
                <Input name="stock" value={form.stock} onChange={handleChange} placeholder="Estoque" type="number" />
                <Button className="self-center" onClick={ () => {
                    UpdateProduct()
                    navigate("/admin/produtos")
                    }}>
                    Salvar Alterações
                </Button>
            </div>

            {/* Prévia */}
            <div className="flex-1 bg-white rounded-md p-6">
                <h2 className="text-xl font-bold mb-2">Prévia:</h2>
                <h3 className="text-lg font-semibold">{form.name}</h3>
                <p className="text-zinc-600">{form.description}</p>
                <p>R$ {Number(form.price).toFixed(2)}</p>
                <p>Estoque: {form.stock}</p>
            </div>

        </div>
        </>
    )
}

export default AtualizarProduto