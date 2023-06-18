import React from 'react'
import moment from 'moment/moment'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('adminJwt')
        navigate('/admin/login')
    }

    const [date , setDate] = useState(new Date())
    useEffect(() => {
        setInterval (() => {
            setDate(Date.now())
        } , 1000)
    } , [])

  return (
    <div className='px-14 py-14 flex justify-between align-middle text-white'>
        <div className=''>
            <div>
                <h1 className='font-mono text-2xl'>Admin name</h1>
                <p className='text-red-600'>{moment(date).format("MMMM Do YYYY, h:mm:ss a")}</p>
            </div>
        </div>
        <div>
            <p className='hover:text-red-600 cursor-pointer' onClick={logout} >Logout</p>
        </div>
    </div>
  )
}

export default AdminHeader