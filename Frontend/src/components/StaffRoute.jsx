import { Navigate } from "react-router-dom"

function StaffRoute({ children }) {
    const token = localStorage.getItem("access_token")
    const isStaff = localStorage.getItem("is_staff") === "true"

    if (!token || !isStaff) {
        return <Navigate to="/" />
    }

    return children
}

export default StaffRoute