import Profile from '../../Components/Members/Profile'
import ProfileSidebar from '../../Components/Members/ProfileSidebar'

function ProfilePage() {
  return (
    <div id="outer-container" className=" flex min-w-[600px] min-h-[500px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg">
        <div id="sidebar">
            <ProfileSidebar />
        </div>
        <div id='content' className='ms-20'>
            <Profile />
        </div>
    </div>
  )
}

export default ProfilePage