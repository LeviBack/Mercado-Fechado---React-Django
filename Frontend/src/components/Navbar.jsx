import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")

    function logout() {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("is_staff")
        navigate("/signin")
    }

    return (
        <div className="bg-cyan-100 flex p-3 mb-3 space-x-10 rounded-md items-center">
            <Link to="/"><h1 className="text-lg cursor-pointer">Página Inicial</h1></Link>
            <Link to='/carrinho'><h1 className="text-lg cursor-pointer">Carrinho</h1></Link>
            <Link to='/signup'><h1 className="text-lg cursor-pointer">Usuarios</h1></Link>
            {token && (
                <button onClick={logout} className="cursor-pointer text-lg text-red-500 ml-auto">Sair</button>
            )}
            
        </div>
    )
}

export default Navbar