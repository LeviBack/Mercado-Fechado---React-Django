import { Link, useNavigate } from "react-router-dom"

function Navbar_admin() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("is_staff")
        local
        navigate("/signin")
    }

    return (
        <div className="bg-cyan-100 flex p-3 mb-3 space-x-10 rounded-md items-center">
            <Link to="/admin/produtos"><h1 className="text-lg cursor-pointer">Página Inicial</h1></Link>
            <Link to="/"><h1 className="text-lg cursor-pointer">Home Page</h1></Link>
            <Link to='/admin/cadastro_produtos'><h1 className="text-lg cursor-pointer">Cadastro de Produtos</h1></Link>
            <button onClick={logout} className="cursor-pointer text-lg text-red-500 ml-auto">Sair</button>
        </div>
    )
}

export default Navbar_admin