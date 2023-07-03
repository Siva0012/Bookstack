import Checkouts from "../../Components/Members/Checkouts";
import ProfileSidebar from "../../Components/Members/ProfileSidebar";
function CheckoutsPage() {
  return (
    <div
      id="outer-container"
      className=" flex px-2 py-4 max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg"
    >
      <div id="sidebar" className="">
        <ProfileSidebar />
      </div>
      <div id="content" className="ms-10">
        <Checkouts />
      </div>
    </div>
  );
}

export default CheckoutsPage;
