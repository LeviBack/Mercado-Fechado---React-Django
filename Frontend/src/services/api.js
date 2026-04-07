import axios from 'axios'

const api = axios.create({
    baseURL: "http://192.168.0.224:8000/"
})

// Adiciona o access token nas requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")
    const url = config.url || ""

    const isAuthRoute = url.startsWith("api/token/")

    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Se der 401, tenta renovar o token automaticamente
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true

            try {
                const refresh = localStorage.getItem("refresh_token")
                const response = await axios.post("http://192.168.0.224:8000/api/token/refresh/", {
                    refresh
                })

                localStorage.setItem("access_token", response.data.access)
                original.headers.Authorization = `Bearer ${response.data.access}`

                return api(original)
            } catch (err) {
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("is_staff")
                
                const rotasProtegidas = ["/carrinho", "/admin"]
                const rotaAtual = window.location.pathname
                
                const precisaLogin = rotasProtegidas.some(rota => rotaAtual.startsWith(rota))
                
                if (precisaLogin) {
                    window.location.href = "/signin?expired=true"
                }
            }
        return Promise.reject(error)
        }
    }
)

export default api