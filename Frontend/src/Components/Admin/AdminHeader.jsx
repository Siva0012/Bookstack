import React from 'react'
import moment from 'moment/moment'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateAdminData } from '../../Redux/Admin/AdminDataSlice'

function AdminHeader() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('adminJwt')
        dispatch(updateAdminData({}))
        navigate('/admin/login')
    }

    const [date , setDate] = useState(new Date())
    useEffect(() => {
        setInterval (() => {
            setDate(Date.now())
        } , 1000)
    } , [])

  return (
    <div className='sm:px-14 flex justify-between sm:justify-between align-middle text-white'>
        <div className=''>
            <div>
                <h1 className='text-2xl'>Admin</h1>
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