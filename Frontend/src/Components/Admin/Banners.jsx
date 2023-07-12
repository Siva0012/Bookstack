import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Modal from "../Modal/Modal";
import EditModal from "../Modal/EditModal";
import moment from "moment/moment";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

//admin APIs
import {
  getBanners,
  addBanner,
  changeBannerStatus,
  updateBannerImage,
  updateBannerContent
} from "../../Utils/AdminApis";
import { toast } from "react-toastify";

function Banners() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  //edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  //for editing image
  const [editImageLoader, seteditImageLoader] = useState(false);
  const [showEditImage, setShowEditImage] = useState(false);
  const [editBannerImage, setEditBannerImage] = useState("");
  const [editValues, seteditValues] = useState({
    title: "",
    description: "",
    bannerId: "",
    url : ""
  });

  //for bannerdata
  const [banners, setBanners] = useState([]);

  //edit banner
  const handleEditBanner = (bannerId, title, description, image , url) => {
    setShowEditModal(true);
    seteditValues({
      title: title,
      description: description,
      bannerId: bannerId,
      url : url
    });
    setEditBannerImage(image);
  };

  const handleEditChange = (e) => {
    seteditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditValues = () => {
    const formData = new FormData()
    formData.append('title' , editValues.title)
    formData.append('description' , editValues.description)
    formData.append('url' , editValues.url)
    updateBannerContent(editValues.bannerId , {title : editValues.title , description : editValues.description , url : editValues.url})
    .then((response) => {
      if(response.data.updated) {
        toast.success("updated banner data")
        setShowEditModal(false)
      }
    })

  }

  const handleEditImageChange = (e) => {
    seteditImageLoader(true);
    const file = e.target.files[0];
    setEditBannerImage(file);
    const formData = new FormData();
    formData.append("bannerPhoto", file);
    updateBannerImage(editValues.bannerId, formData).then((response) => {
      if (response.data.updated) {
        seteditImageLoader(false);
        toast.success("updated banner image");
        setEditBannerImage(response.data.image);
      }
    });
  };

  // Add new banner //

  //add modal
  const [showModal, setshowModal] = useState(false);
  const [imageLoader, setimageLoader] = useState(false);
  const [formValues, setformValues] = useState({
    title: "",
    description: "",
    bannerPhoto: "",
    bannerId: "",
    url : ""
  });

  //update banner status
  const handleBanner = (bannerId, status) => {
    //call api
    const data = { bannerId: bannerId, status: status };
    changeBannerStatus(data)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleChange = (e) => {
    setformValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setformValues({
      ...formValues,
      bannerPhoto: e.target.files[0],
    });
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    if (
      formValues.title === "" ||
      formValues.description === "" ||
      formValues.bannerPhoto === "" ||
      formValues.url === ""
    ) {
      toast.warning("All fields are requried !!");
    } else {
      setimageLoader(true);
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("bannerPhoto", formValues.bannerPhoto);
      formData.append('url' , formValues.url)

      //call api
      addBanner(formData)
        .then((response) => {
          if (response.data.message) {
            setimageLoader(false);
            setshowModal(false);
            toast.success(response.data.message);
          }
        })
        .catch((err) => toast.error(err.response.data.error));
    }
  };

  useEffect(() => {
    getBanners().then((response) => {
      if (response.data) {
        setBanners(response.data.bannerData);
      }
    });
  }, [showEditModal , showModal , handleBanner]);

  return (
    <>
      <div className="text-white">
        <div className="container mx-auto ">
          <div className="mt-10">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold leading-tight">Banners</h2>
              <button
                onClick={() => setshowModal(true)}
                className="bg-blue-600 rounded-md px-2 py-1"
              >
                Add new
              </button>
            </div>
            <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-8 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Edit
                      </th>
                      {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" /> */}
                    </tr>
                  </thead>
                  <tbody>
                    {banners &&
                      banners.map((banner) => {
                        return (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w-28 h-28">
                                  <img
                                    className="w-full h-full"
                                    src={banner.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(banner.udpatedAt).format(
                                      "MMM Do YY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {banner.title}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {banner.description}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span
                                onClick={() =>
                                  handleBanner(banner._id, banner.active)
                                }
                                className="relative inline-block px-3 py-1 font-semibold min-w-[90px] text-green-900 leading-tight hover:cursor-pointer"
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                />
                                {banner.active ? (
                                  <span className="relative min-w-[90px]  mx-auto text-center">
                                    Enabled
                                  </span>
                                ) : (
                                  <span className="relative min-w-[90px]  mx-auto text-center">
                                    Disabled
                                  </span>
                                )}
                              </span>
                            </td>
                            {/*Edit */}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span
                                onClick={() =>
                                  handleEditBanner(
                                    banner._id,
                                    banner.title,
                                    banner.description,
                                    banner.image,
                                    banner.url
                                  )
                                }
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight hover:cursor-pointer"
                              >
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-blue-600 opacity-50 rounded-full"
                                />
                                <span className="relative">Edit</span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Edit banner*/}
      <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="px-6 py-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Edit Banner
          </h3>
          <form
            action=""
            className="shadow-[0px_0px_20px_rgba(0,0,0,0.3)] mx-auto"
            encType="multipart/formdata"
          >
            <div className="flex flex-col items-center justify-center py-1">
              <div className="w-[350px] p-1 ">
                <div className="w-full relative">
                  {editImageLoader ? (
                    <HashLoader
                      color={"#73482C"}
                      loading={editImageLoader}
                      cssOverride={override}
                      size={120}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <>
                      <h6
                        onClick={() => setShowEditImage((prev) => !prev)}
                        className="text-center text-gray-500"
                      >
                        click here to edit image
                      </h6>
                      <div className="w-[150px] h-[180px] mx-auto flex flex-col justify-center items-center">
                        <img
                          className="shadow-md"
                          src={
                            editBannerImage
                              ? editBannerImage
                              : "../../../public/public-images/image.jpg"
                          }
                          alt=""
                        />
                      </div>
                      {showEditImage && (
                        <div className="absolute top-[50%] left-[45%]">
                          <label htmlFor="image" className="">
                            <MdOutlineAddPhotoAlternate
                              color="black"
                              size={30}
                            />
                            <input
                              onChange={handleEditImageChange}
                              className="rounded-md hidden"
                              id="image"
                              name="image"
                              type="file"
                            />
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="title" className="border rounded-md">
                    Title
                    <input
                      onChange={handleEditChange}
                      className="w-full rounded-md"
                      id="title"
                      name="title"
                      type="text"
                      value={editValues.title}
                    />
                  </label>
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="title" className="border rounded-md">
                    url
                    <input
                      onChange={handleEditChange}
                      className="w-full rounded-md"
                      id="url"
                      name="url"
                      type="text"
                      value={editValues.url}
                    />
                  </label>
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="description" className="border rounded-md">
                    description
                    <textarea
                      onChange={handleEditChange}
                      className="w-full rounded-md"
                      id="description"
                      name="description"
                      type="text"
                      value={editValues.description}
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={handleEditValues}
                type="button"
                className="bg-blue-600 rounded-md text-white px-3 py-1 mt-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/*Add new banner */}
      <Modal isVisible={showModal} onClose={() => setshowModal(false)}>
        <div className="p-6">
          <HashLoader
            color={"#73482C"}
            loading={imageLoader}
            cssOverride={override}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Add a new Banner
          </h3>
          <form
            onSubmit={handleAddForm}
            action=""
            className="shadow-[0px_0px_20px_rgba(0,0,0,0.3)]"
            encType="multipart/formdata"
          >
            <div className="flex flex-col items-center justify-center py-3">
              <div className="w-[350px] p-2 ">
                <div className="w-full">
                  <label htmlFor="title" className="border rounded-md">
                    Title
                    <input
                      className="w-full rounded-md"
                      id="title"
                      name="title"
                      type="text"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="url" className="border rounded-md">
                    url
                    <input
                      className="w-full rounded-md"
                      id="url"
                      name="url"
                      type="text"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="description" className="border rounded-md">
                    description
                    <textarea
                      className="w-full rounded-md"
                      id="description"
                      name="description"
                      type="text"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="w-full mt-3">
                  <label
                    htmlFor="bannerPhoto"
                    className="border rounded-md"
                  ></label>
                  <input
                    className="w-full rounded-md"
                    id="bannerPhoto"
                    name="bannerPhoto"
                    type="file"
                    onChange={handleImage}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 rounded-md text-white px-3 py-1 mt-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Banners;
