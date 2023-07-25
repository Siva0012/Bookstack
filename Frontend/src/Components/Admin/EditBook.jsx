import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage, FieldArray, useFormik } from "formik";
import HashLoader from "react-spinners/HashLoader";
import * as Yup from "yup";

//Admin APIs
import {
  getSingleBook,
  getCategories,
  updateBook,
  updateBookImage,
} from "../../Utils/AdminApis";
import { toast } from "react-toastify";
import EditModal from "../Modal/EditModal";

function EditBook() {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.bookId;
  const [categories, setcategories] = useState([]);
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageLoader, setimageLoader] = useState(false);
  const [update, setUpdate] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const [bookData, setbookData] = useState(null);
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    edition: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    isbn: Yup.string().required("Required"),
    stock: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
    maximumReservation: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  // const onSubmit = useCallback(
  //   (values, onSubmitProps) => {
  //     updateBook(bookId, values)
  //       .then((response) => {
  //         if (response.data.updated) {
  //           toast.success("Book data updated successfully");
  //           setTimeout(() => {
  //             navigate("/admin/books");
  //           }, 800);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  //   [bookId]
  // );

  const onSubmit = async (values) => {
    try{
      console.log(values);
      const response = await updateBook(bookId , values)
      if(response.data.updated) {
        toast.success("Book data updated successfully")
        setTimeout(() => {
          navigate('/admin/books')
        } , 800)
      }
    }catch(err) {
      if(err.response.data.error){
        return toast.error(err.response.data.error)
      }
      if(err.response) {
        const formErrors = {}
        err.response.data.forEach((error) => {
          formErrors[error.path] = error.msg
        })
        formik.setErrors(formErrors)
      }
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //image validator
  const validate = (image) => {
    const fileExtension = image.name.split(".").pop().toLowerCase();
    const acceptedFormats = ["jpg", "jpeg", "png"];
    if (!acceptedFormats.includes(fileExtension)) {
      return false;
    } else {
      return true;
    }
  };

  const handleImageSubmit = () => {
    setimageLoader(true);
    if (!validate(image)) {
      setimageLoader(false);
      toast.error(
        `Please upload image of type 'jpg' , 'jpeg' , 'png' , 'gif'!!`
      );
      return;
    }
    const formData = new FormData();
    formData.append("coverPhoto", image);
    updateBookImage(bookId, formData).then((response) => {
      if (response.data.updated) {
        setimageLoader(false);
        setShowModal(false);
        setUpdate((prev) => !prev);
        toast.success("Book updated successfully");
      }
    });
  };

  useEffect(() => {
    getCategories().then((response) => {
      if (response.data.catData) {
        setcategories(response.data.catData);
      }
    });
  }, []);

  useEffect(() => {
    getSingleBook(bookId)
      .then((response) => {
        if (response.data.bookData) {
          const data = response.data.bookData;
          setbookData({
            ...bookData,
            title: data.title,
            author: data.author,
            edition: data.edition,
            category: data ? data.category._id : "",
            isbn: data.isbn,
            stock: data.stock,
            publisher: data.publisher,
            maximumReservation: data.maxReservations,
            description: data.description,
            coverPhoto: data.coverPhoto,
          });
          formik.setValues({
            title: data?.title || "",
            author: data?.author || "",
            edition: data?.edition || "",
            category: data?.category?._id || "",
            isbn: data?.isbn || "",
            stock: data?.stock || "",
            publisher: data?.publisher || "",
            maximumReservation: data?.maxReservations || "",
            description: data?.description || "",
            coverPhoto: data?.coverPhoto || "",
          });
        }
      })
      .catch((err) => console.log(err));
  }, [update]);

  const formik = useFormik({
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="text-white mt-4">
      <h1 className="text-2xl">{`Edit book`}</h1>
      {bookData && (
        <div className="max-w-[900px] flex items-center mx-auto mt-3">
          <div className="flex flex-col">
            <p
              onClick={() => setShowModal(true)}
              className="ms-auto hover:cursor-pointer "
            >
              Edit
            </p>
            <div className="w-[300px] h-[320px]">
              <img
                className="w-full h-full object-contain"
                src={
                  bookData.coverPhoto
                    ? bookData.coverPhoto
                    : "../../../public/public-images/image.jpg"
                }
                alt=""
              />
            </div>
          </div>
          {bookData && (
            <form action="" onSubmit={formik.handleSubmit} className="w-full" >
              <div className="grid grid-cols-2 gap-x-6">
                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                    id="title"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.title}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.title && formik.errors.title
                      ? formik.errors.title
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label htmlFor="author">author</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="author"
                    id="author"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.author}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.author && formik.errors.author
                      ? formik.errors.author
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label htmlFor="edition">Edition</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="edition"
                    id="edition"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.edition}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.edition && formik.errors.edition
                      ? formik.errors.edition
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label htmlFor="category">Category</label>
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="category"
                    id="category"
                    value={formik.values.category || ""}
                    className="text-black rounded-md"
                  >
                    {/* Add an initial option for the default value */}
                    <option value="">Select a category</option>
                    {categories &&
                      categories
                        .filter(
                          (category) => category.name !== bookData.category
                        )
                        .map((category, i) => (
                          <option key={i} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                  </select>
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.category && formik.errors.category
                      ? formik.errors.category
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label>isbn</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="isbn"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.isbn}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.isbn && formik.errors.isbn
                      ? formik.errors.isbn
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label>stock</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="stock"
                    type="number"
                    className="rounded-md text-black"
                    value={formik.values.stock}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.stock && formik.errors.stock
                      ? formik.errors.stock
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label>publisher</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="publisher"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.publisher}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.publisher && formik.errors.publisher
                      ? formik.errors.publisher
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full h-[90px]">
                  <label>maximum reservation</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="maximumReservation"
                    type="text"
                    className="rounded-md text-black"
                    value={formik.values.maximumReservation}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.maximumReservation &&
                    formik.errors.maximumReservation
                      ? formik.errors.maximumReservation
                      : ""}
                  </div>
                </div>

                <div className="mb-2 flex flex-col w-full col-span-2 h-[90px]">
                  <label htmlFor="description">description</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    as="textarea"
                    name="description"
                    id="description"
                    type="text"
                    cols="40"
                    rows="5"
                    className="rounded-md text-black"
                    value={formik.values.description}
                  />
                  <div className="text-red-600 text-[13px] font-nunito">
                    {formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : ""}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="px-2 py-1 mt-3 mx-auto w-28 text-center font-semibold bg-blue-600 rounded-md"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      )}
      <EditModal isVisible={showModal} onClose={() => setShowModal(false)}>
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
            Upload the cover photo
          </h3>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="image" className="border rounded-md">
              <input type="file" id="image" onChange={handleImageChange} />
            </label>
            <button
              onClick={handleImageSubmit}
              className="bg-blue-600 rounded-md text-white px-3 py-1 mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </EditModal>
    </div>
  );
}

export default EditBook;
