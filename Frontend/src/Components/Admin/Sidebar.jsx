import React from 'react'
import {Link} from 'react-router-dom'
import { FaBeer } from "react-icons/fa";

function Sidebar() {
  return (
      <div className='h-screen px-[25px] font-mono'>
          <div className='px-[20px]'>
              
              <Link to={'/admin'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer '>Dashboard</p>
                  </div>
              </Link>
              <Link to={'/admin/members'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer'>Members</p>
                  </div>
              </Link>
              <Link to={'/admin/books'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer'>Books</p>
                  </div>
              </Link>
              <Link to={'/admin/categories'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer'><Link to='/admin/categories' >Categories</Link></p>
                  </div>
              </Link>
              <Link to={'/admin/lender-history'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer'><Link to='/admin/lender-history' >Lender history</Link></p>
                  </div>
              </Link>
              <Link to={'/admin/banners'}>
                  <div className=' bg-bg-admin-sidebar-button hover:border-r-8 w-[200px] hover:border px-[15px] py-[10px] flex items-center justify-center  rounded-xl cursor-pointer mb-1'>
                      <p className='text-white text-[16px] leading-[24px] font-mono tracking-wide font-bold cursor-pointer'><Link to='/admin/banners' >Banners</Link></p>
                  </div>
              </Link>
              
          </div>
      </div>
  )
}

export default Sidebar