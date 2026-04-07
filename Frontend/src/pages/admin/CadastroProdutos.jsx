import Navbar_admin from "@/components/admin/Navbar-admin"
import { NewProductForm } from "@/components/admin/new-product-form"
import api from "@/services/api"
function CadastroProdutos() {

    return (
        <>
        <Navbar_admin />

        <NewProductForm className="mx-3 bg-white rounded-md shadow-2xl" onSubmit={async (data) => {
                try{
                    const response = await api.post("api/products/", {
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        stock: data.stock
                    })
                    console.log(response.data)
                } catch (err) {
                    alert(err)
                }
            }} />

        </>
    )


}

export default CadastroProdutos