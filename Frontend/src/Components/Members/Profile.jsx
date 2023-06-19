import { useState, useEffect } from "react";
import { getMember, updateImage } from "../../Utils/MemberApis";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Profile() {
  const [memberData, setMemberData] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    console.log("handle image change");
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    //   console.log(image);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", image);
    updateImage(formData)
      .then((response) => {
        console.log(response.data.message, "resopnse dataaaaaaaaa");
        setMemberData({
          ...memberData,
          profilePicture: response.data.image,
        });
      })
      .catch((err) => err)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMember()
      .then((response) => {
        setMemberData(response.data.memberData);
      })
      .catch((err) => err);
  }, [image]);

  return (
    <>
      <div id="outer-div" className="p-4">
        {memberData && (
          <>
            <div className="bg-white flex p-5 rounded-lg">
              <div id="details" className="">
                <div className="border-2 grid grid-rows-3 gap-y-3 mt-8">
                  <label
                    className="py-2 min-w-[150px] border border-black rounded-md text-base"
                    htmlFor=""
                  >
                    {memberData.name}
                  </label>
                  <label
                    className="py-2 border border-black rounded-md text-base "
                    htmlFor=""
                  >
                    {memberData.email}
                  </label>
                  <label
                    className="py-2 border border-black rounded-md text-base "
                    htmlFor=""
                  >
                    {memberData.phone}
                  </label>
                </div>
              </div>
              <div className="mx-auto">
                <div id="image" className="px-2 min-w-fit h-auto ">
                  <form
                    action=""
                    encType="multipart/formdata"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col justify-between">
                      <div
                        id="image-div "
                        className=" mb-3 drop-shadow-[0px_0px_10px_rgba(0,0,0,0.2)]"
                      >
                        {loading && <Skeleton circle height="100%" />}
                        <img
                          style={{ display: loading ? "none" : undefined }}
                          className=" mx-auto h-[300px] w-[250px]"
                          src={
                            memberData.profilePicture
                              ? memberData.profilePicture
                              : "../../../public/public-images/image.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="profilePicture"
                          className="relative cursor-pointer py-1 px-3 rounded-md bg-indigo-600 font-semibold text-white  hover:text-indigo-500 hover:bg-white hover:drop-shadow-[0px_0px_6px_rgba(0,0,0,0.3)]"
                        >
                          <span className="text-sm">Upload image</span>
                          <input
                            onChange={handleImageChange}
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-blue-600 w-full rounded-md py-2 text-white"
                        >
                          Update profile picture
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
