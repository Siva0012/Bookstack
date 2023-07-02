import { Link } from "react-router-dom"


function ProfileSidebar() {
  return (
    <div className='h-fit min-w-[200px] p-3'>
        <div className='grid grid-rows-5 gap-y-2 cursor-pointer'>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/profile'} className='ms-2'>Personal info</Link>
            </div>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/checkouts'} className='ms-2'>Checkouts</Link>
            </div>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/reserved-books'} className='ms-2'>Reserved books</Link>
            </div>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/membership'} className='ms-2'>Membership</Link>
            </div>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/book-bag'} className='ms-2'>Book bag</Link>
            </div>
            <div id='personal-info' className='bg-user-sidebar-menu bg-opacity-50 rounded-md py-3 font-semibold'>
                <Link to={'/fines'} className='ms-2'>Fine payments</Link>
            </div>
        </div>
    </div>
  )
}

export default ProfileSidebar
