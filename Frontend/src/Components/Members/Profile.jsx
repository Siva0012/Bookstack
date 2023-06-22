import { useState, CSSProperties, useEffect } from "react";
import { getMember, updateImage } from "../../Utils/MemberApis";
import { BiEditAlt } from "react-icons/bi";
import Modal from "../../Components/Members/Modal";
import { Tooltip } from "react-tooltip";
import { Tooltip as ImageTool } from "primereact/tooltip";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

//toaster
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//member apis
import { updateProfileFields } from "../../Utils/MemberApis";

function Profile() {
  const [memberData, setMemberData] = useState({});
  const [image, setImage] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [imageLoader, setimageLoader] = useState(false);

  //field change
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  //field submit
  const handleFieldSubmit = (fieldName) => {
    let fieldValue = "";
    if (fieldName === "name") {
      fieldValue = name;
    } else if (fieldName === "address") {
      fieldValue = address;
    }
    if (fieldValue === memberData[fieldName]) {
      return;
    }
    const data = {
      fieldValue: fieldValue,
      fieldName: fieldName,
    };
    updateProfileFields(data)
      .then((response) => {
        toast.success(response.data.message);
        getMember().then((response) => {
          setMemberData(response.data.memberData);
        });
      })
      .catch((err) => {
        toast.warning(err.response.data.error);
      });
  };

  // image update
  const handleImageChange = (e) => {
    console.log("handle image change");
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setimageLoader(true);
    const formData = new FormData();
    formData.append("profilePicture", image);
    updateImage(formData)
      .then((response) => {
        setMemberData({
          ...memberData,
          profilePicture: response.data.image,
        });
        setimageLoader(false);
        console.log("sjfoaisyriuweviotuwenovtunoieuroweurwjmoeuwmiojero");
        setshowModal(false);
        toast.success(response.data.message);
      })
      .catch((err) => {
        setimageLoader(false);
        console.log("catch errorrrrrr" , err);
        toast.error(err.response.data.error);
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
      <div className="grid md:grid-cols-2 md:gap-x-3 p-3">
        <div className=" relative min-w-[50%] ">
          <div
            onClick={() => setshowModal(true)}
            className=" flex items-center ms-auto absolute right-2 top-1 z-[1] hover:text-red-600 hover:cursor-pointer "
          >
            <p className="">Edit</p>
            <BiEditAlt size={20} className="ms-3" />
          </div>
          <Tooltip
            anchorId="profile"
            variant="info"
            content="Click on the top right corner to edit"
            place="top"
          />
          <div className="w-[300px] h-[350px] mx-auto">
            <img
              id="profile"
              className="w-[100%] h-[100%] object-scale-down"
              src={
                memberData.profilePicture
                  ? memberData.profilePicture
                  : "../../../public/public-images/image.jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div className="min-w-[50%]">
          <div
            id="name"
            className="bg-white p-2 mb-4 rounded-md drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)]"
          >
            <p className="text-[12px] italic">Name</p>
            <h1
              id="edit-name"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setName(e.currentTarget.textContent)}
              onBlur={() => handleFieldSubmit("name")}
              className="text-[16px] font-semibold"
            >
              {memberData.name}
            </h1>
            <Tooltip
              anchorId="edit-name"
              variant="info"
              content="Click here to edit the name"
            />
          </div>
          <div
            id="Email"
            className="bg-white p-2 mb-4 rounded-md drop-shadow-[0px_0px_0px_rgba(0,0,0,0.25)]"
          >
            <p className="text-[12px] italic">Email</p>
            <h1 className="text-[16px] font-semibold">{memberData.email}</h1>
          </div>
          <div
            id="Phone"
            className="bg-white p-2 mb-4 rounded-md drop-shadow-[0px_0px_0px_rgba(0,0,0,0.25)]"
          >
            <p className="text-[12px] italic">Phone</p>
            <h1 className="text-[16px] font-semibold">{memberData.phone}</h1>
          </div>
          <div
            id="Address"
            className="bg-white p-2 rounded-md drop-shadow-[0px_0px_0px_rgba(0,0,0,0.25)]"
          >
            <p className="text-[12px] italic">Address</p>
            <textarea
              className="text-[16px] font-normal"
              cols={40}
              rows={3}
              id="edit-address"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onChange={(e) => setAddress(e.currentTarget.value)}
              onFocus={(e) => e.target.select()}
              onBlur={() => handleFieldSubmit("address")}
              value={address !== "" ? address : memberData.address}
            ></textarea>
            <Tooltip
              anchorId="edit-address"
              variant="info"
              content="Click here to edit the address"
            />
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setshowModal(false)}>
        <div className="p-6">
          <HashLoader
            color={"#73482C"}
            loading={imageLoader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Upload your profile picture
          </h3>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="image" className="border rounded-md">
              <input type="file" onChange={handleImageChange} id="image" />
            </label>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 rounded-md text-white px-3 py-1 mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
