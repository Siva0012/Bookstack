import Checkouts from "../../Components/Members/Checkouts";
import ProfileSidebar from "../../Components/Members/ProfileSidebar";
function CheckoutsPage() {
  return (
    <div
      id="outer-container"
      className=" flex flex-cols justify-between max-w-[1240px] bg-gradient-to-r from-user-profile-from to-user-profile-to rounded-lg"
    >
      <div id="sidebar" className="w-fit">
        <ProfileSidebar />
      </div>
      <div id="content" className="">
        <Checkouts />
      </div>
    </div>
  );
}

export default CheckoutsPage;
