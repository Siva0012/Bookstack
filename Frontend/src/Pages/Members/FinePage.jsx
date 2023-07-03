import Fines from "../../Components/Members/Fines"
import ProfileSidebar from "../../Components/Members/ProfileSidebar"


function FinePage() {
  return (
     <div
     id="outer-container"
     className=" flex px-2 py-4 max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg"
   >
     <div id="sidebar" className="">
       <ProfileSidebar />
     </div>
     <div id="content" className="ms-10 w-full">
       <Fines />
     </div>
   </div>
  )
}

export default FinePage