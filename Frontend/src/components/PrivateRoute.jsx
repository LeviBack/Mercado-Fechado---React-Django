import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const token = localStorage.getItem("access_token")

    if (!token) {
        return <Navigate to="/signin" state={{ message: "Você precisa estar logado para acessar essa página!" }} />
    }

    return children
}

export default PrivateRoute