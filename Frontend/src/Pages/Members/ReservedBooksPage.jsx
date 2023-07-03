import ProfileSidebar from "../../Components/Members/ProfileSidebar"
import ReservedBooks from "../../Components/Members/ReservedBooks"

function ReservedBooksPage() {
  return (
     <div id="outer-container" className=" p-2 flex max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg">
     <div id="sidebar" className="">
         <ProfileSidebar />
     </div>
     <div id='content' className='ms-10'>
         <ReservedBooks />
     </div>
 </div>
  )
}

export default ReservedBooksPage