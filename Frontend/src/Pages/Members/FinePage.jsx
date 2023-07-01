import Fines from "../../Components/Members/Fines"
import ProfileSidebar from "../../Components/Members/ProfileSidebar"


function FinePage() {
  return (
     <div
     id="outer-container"
     className=" flex flex-cols justify-between max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg"
   >
     <div id="sidebar" className="w-[210px]">
       <ProfileSidebar />
     </div>
     <div id="content" className="min-w-[800px] ">
       <Fines />
     </div>
   </div>
  )
}

export default FinePage