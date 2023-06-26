import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Modal from "../Modal/Modal";
import moment from "moment/moment";

//admin APIs
import { getBanners, addBanner , changeBannerStatus } from "../../Utils/AdminApis";
import { toast } from "react-toastify";

function Banners() {
  const navigate = useNavigate();
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const [banners, setBanners] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [imageLoader, setimageLoader] = useState(false);
  const [formValues, setformValues] = useState({
    title: "",
    description: "",
    bannerPhoto: "",
  });

  //update banner status
  const handleBanner = (bannerId , status) => {
    //call api
    const data = {bannerId : bannerId , status : status}
    changeBannerStatus(data)
    .then((response) => {
      if(response.data) {
        toast.success(response.data.message)
      }
    })
    .catch(err => toast.error(err.response.data.error))
    
  }

  const handleChange = (e) => {
    console.log(formValues);
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
    setimageLoader(true);
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("bannerPhoto", formValues.bannerPhoto);

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
  };

  useEffect(() => {
    getBanners().then((response) => {
      if (response.data) {
        setBanners(response.data.bannerData);
      }
    });
  });

  return (
    <>
      <div className="text-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold leading-tight">Banners</h2>
              <button
                onClick={() => setshowModal(true)}
                className="bg-blue-600 rounded-md px-2 py-1"
              >
                Add new
              </button>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                              onClick={() => handleBanner(banner._id , banner.active)}
                               className="relative inline-block px-3 py-1 font-semibold min-w-[90px]  text-green-900 leading-tight hover:cursor-pointer">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                />
                                {banner.active ? (
                                  <span className="relative min-w-[90px]  mx-auto text-center">Enabled</span>
                                ) : (
                                  <span className="relative min-w-[90px]  mx-auto text-center">Disabled</span>
                                )}
                              </span>
                            </td>
                            {/*Edit */}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span 
                               className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-blue-600 opacity-50 rounded-full"
                                />
                                  <span className="relative">Edit</span>
                              </span>
                            </td>
                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <button
                                type="button"
                                className="inline-block text-gray-500 hover:text-gray-700"
                              >
                                <svg
                                  className="inline-block h-6 w-6 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                </svg>
                              </button>
                            </td> */}
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
      {/*Edit modal*/}
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
                  <label htmlFor="description" className="border rounded-md">
                    description
                    <input
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
                  <label htmlFor="description" className="border rounded-md">
                    description
                    <input
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
