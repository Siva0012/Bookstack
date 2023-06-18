import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Admin APIs
import { isAdminAuth } from '../Utils/AdminApis'

//Member APIs
import { isMemberAuth } from '../Utils/MemberApis'

const ProtectedRoutes = ({ role, route }) => {
    
    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (role === "admin") {
            isAdminAuth()
                .then((response) => {
                    console.log(response.data);
                    if (response.data.isAdmin) {
                        setAuth('isAdmin')
                    } else {
                        setAuth(null)
                        localStorage.removeItem('adminJwt')
                    }
                    console.log("auth", auth);
                })
                .catch((err) => {
                    console.log("Redirecting to login" , err)
                    navigate('/admin/login')
                })
        } else if (role === 'user') {
            isMemberAuth()
                .then((response) => {
                    console.log(response.data);
                    if (response.data.isMember) {
                        setAuth(response.data.isMember) ///////////////////////////////
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setAuth(null)
                    localStorage.removeItem("userJwt")
                    navigate('/login')
                })
        }
    }, [])

    if (auth === null) return
    return auth ? <Outlet /> : <Navigate to={route} />
}

export default ProtectedRoutes