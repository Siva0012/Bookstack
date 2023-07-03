import Profile from '../../Components/Members/Profile'
import ProfileSidebar from '../../Components/Members/ProfileSidebar'

function ProfilePage() {
  return (
    <div id="outer-container" className=" flex px-2 py-4 max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg">
        <div id="sidebar">
            <ProfileSidebar />
        </div>
        <div id='content' className='ms-10 w-full'>
            <Profile />
        </div>
    </div>
  )
}

export default ProfilePage