import { BiSearch } from "react-icons/bi";

function MemberList() {
  return (
    <div className="rounded-lg p-2 h-full">
      <div
        id="search-div"
        className="rounded-lg flex items-center justify-between"
      >
        <input
          className="rounded-md lg:h-[2rem] w-full"
          type="text"
          name="members"
          placeholder="Members"
        />
        {/* <label className="ms-2" htmlFor="members">
          <BiSearch size={28} />
        </label> */}
      </div>
      <div id="user-div" className="mt-4">
        <div className="flex items-center mb-2 py-2 px-3 bg-black text-white shadow-[0px_0px_3px_rgba(255,255,255,0.8)] rounded-xl">
          <div className="lg:w-10 lg:h-10">
            <img
              className="h-full w-full rounded-full"
              src="../../../../public/public-images/image.jpg"
              alt=""
            />
          </div>
          <div className="lg:ms-4">
            <h2>User name</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberList;
