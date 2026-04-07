import { LoginForm } from "@/components/login-form";
import Navbar from "@/components/Navbar";
import api from "@/services/api";
import { useLocation, useNavigate } from "react-router-dom";

function SignIn() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const message = location.state?.message || 
    (params.get("expired") && "Sua sessão expirou, faça login novamente!") ||
    params.get("message")

    const navigate = useNavigate()
    async function GetToken(data) {
        try {
            const response = await api.post("/api/token/", data)

            localStorage.setItem("access_token", response.data.access)
            localStorage.setItem("refresh_token", response.data.refresh)

            // Busca os dados do usuário logo após o login
            const profile = await api.get("/api/profile/")
            localStorage.setItem("is_staff", profile.data.is_staff)

            navigate("/")
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    
    return(
        <>
        <Navbar />

         {message && (
            <div className="bg-red-100 text-red-700 text-center py-2 px-4 rounded-md mx-auto mt-4 max-w-md">
                {message}
            </div>
        )}

        <div className="mt-5 mx-4 shadow-2xl">
            <LoginForm 
                onSubmit={ (data) => {
                    GetToken(data)
                }} />
        </div>
        </> 
    )
}

export default SignIn