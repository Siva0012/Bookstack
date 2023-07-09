import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import HashLoader from "react-spinners/HashLoader";
import * as Yup from "yup";

//Admin APIs
import {
  getSingleBook,
  getCategories,
  updateBook,
  updateBookImage
} from "../../Utils/AdminApis";
import { toast } from "react-toastify";
import EditModal from "../Modal/EditModal";

function EditBook() {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.bookId;
  const [categories, setcategories] = useState([]);
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageLoader, setimageLoader] = useState(false);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const [bookData, setbookData] = useState(null);
  const initialValues = {
    title: "",
    author: "",
    edition: "",
    category: "",
    isbn: "",
    stock: "",
    publisher: "",
    maximumReservation: "",
    description: "",
    coverPhoto: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    edition: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
  });

  const onSubmit = useCallback(
    (values, onSubmitProps) => {
      updateBook(bookId, values).then((response) => {
        if (response.data.updated) {
          navigate("/admin/books");
        }
      });
    },
    [bookId]
  );

  const handleImageChange = (e) => {
      setImage(e.target.files[0])
  }

  const handleImageSubmit = () => {
      setimageLoader(true)
      const formData = new FormData
      formData.append('coverPhoto' , image)
      updateBookImage(bookId , formData)
      .then((response) => {
            if(response.data.updated) {
                  setimageLoader(false)
                  setShowModal(false)
                  toast.success("Book updated successfully")
            }
      })
  }

  useEffect(() => {
    getCategories().then((response) => {
      if (response.data.catData) {
        setcategories(response.data.catData);
      }
    });
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
        }
      })
      .catch((err) => console.log(err));
  }, [onSubmit , handleImageSubmit]);

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
          <Formik
            initialValues={bookData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form action="" className="w-full">
              <div className="grid grid-cols-2 gap-x-6">
                <div className="mb-2 flex flex-col w-full">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    id="title"
                    type="text"
                    className="rounded-md text-black"
                  />
                  <ErrorMessage name="title" className="inline-block">
                    {(err) => <div className="text-red-600">{err}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label htmlFor="author">author</label>
                  <Field
                    name="author"
                    id="author"
                    type="text"
                    className="rounded-md text-black"
                  />
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label htmlFor="edition">Edition</label>
                  <Field
                    name="edition"
                    id="edition"
                    type="text"
                    className="rounded-md text-black"
                  />
                  <ErrorMessage name="edition">
                    {(err) => <div className="text-red-600">{err}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label htmlFor="category">category</label>
                  <Field as="select" name="category" id="category">
                    {categories &&
                      categories
                        .filter(
                          (category) => category.name != bookData.category
                        )
                        .map((category, i) => {
                          return (
                            <option
                              key={i}
                              className="text-black"
                              value={category._id}
                            >
                              {category.name}
                            </option>
                          );
                        })}
                  </Field>
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label>isbn</label>
                  <Field
                    name="isbn"
                    type="text"
                    className="rounded-md text-black"
                  />
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label>stock</label>
                  <Field
                    name="stock"
                    type="number"
                    className="rounded-md text-black"
                  />
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label>publisher</label>
                  <Field
                    name="publisher"
                    type="text"
                    className="rounded-md text-black"
                  />
                </div>

                <div className="mb-2 flex flex-col w-full">
                  <label>maximum reservation</label>
                  <Field
                    name="maximumReservation"
                    type="text"
                    className="rounded-md text-black"
                  />
                </div>

                <div className="mb-2 flex flex-col w-full col-span-2">
                  <label htmlFor="description">description</label>
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    type="text"
                    cols="40"
                    rows="5"
                    className="rounded-md text-black"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-2 py-1 mt-3 mx-auto w-28 text-center font-semibold bg-blue-600 rounded-md"
              >
                Submit
              </button>
            </Form>
          </Formik>
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
            Upload your profile picture
          </h3>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="image" className="border rounded-md">
              <input type="file" id="image" onChange={handleImageChange} />
            </label>
            <button
            onClick={handleImageSubmit}
             className="bg-blue-600 rounded-md text-white px-3 py-1 mt-4">
              Submit
            </button>
          </div>
        </div>
      </EditModal>
    </div>
  );
}

export default EditBook;
