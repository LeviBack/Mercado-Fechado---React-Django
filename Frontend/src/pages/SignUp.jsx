import Navbar from "@/components/Navbar"
import { SignupForm } from "@/components/signup-form"
import api from "@/services/api"

function SignUp() {

    return (
        <>
        <Navbar />
        <div className="mt-5 mx-4 shadow-2xl">
            <SignupForm
                onSubmit={async (data) => {
                    try {
                        const response = await api.post("api/users/", {
                            username: data.name,
                            email: data.email,
                            password: data.password
                        })
                        console.log(response.data)
                    } catch (err) {
                        const error = err.response.data
                        
                        if (error.username) {
                            alert("Esse nome de usuario já existe, tente outro nome")
                        }
                    }
                }} />
        </div>
        </>
    )
}


export default SignUp