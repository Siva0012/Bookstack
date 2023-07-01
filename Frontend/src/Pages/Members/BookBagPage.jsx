import BookBag from "../../Components/Members/BookBag"
import ProfileSidebar from "../../Components/Members/ProfileSidebar"

function BookBagPage() {

  return (
     <div id="outer-container" className=" flex justify-between max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg">
     <div id="sidebar min-w-1/3">
         <ProfileSidebar />
     </div>
     <div id='content' className='min-w-2/3'>
          <BookBag />
     </div>
 </div>
  )
}

export default BookBagPage