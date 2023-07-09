//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Admin APIs
import { addBook, getCategories } from "../../Utils/AdminApis";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Example() {
  const navigate = useNavigate();
  const [cates, setCates] = useState([]);
  const [inputValues, setInputValues] = useState({
    title: "",
    author: "",
    edition: "",
    publisher: "",
    isbn: "",
    stock: "",
    description: "",
    category: "",
    coverPhoto: "",
  });
  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const imageUpload = (e) => {
    setInputValues({
      ...inputValues,
      coverPhoto: e.target.files[0],
    });
    console.log(inputValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const coverPhoto = inputValues.coverPhoto ?? null;
    coverPhoto
      ? formData.append("coverPhoto", coverPhoto, coverPhoto.name)
      : null;
    formData.append("title", inputValues.title);
    formData.append("author", inputValues.author);
    formData.append("edition", inputValues.edition);
    formData.append("publisher", inputValues.publisher);
    formData.append("isbn", inputValues.isbn);
    formData.append("stock", inputValues.stock);
    formData.append("description", inputValues.description);
    formData.append("category", inputValues.category);

    try {
      const response = await addBook(formData);
      if (response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/admin/books");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const getCat = async () => {
    try {
      getCategories().then((response) => {
        if (response.data.catData) {
          setCates(response.data.catData);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <div className="">
      <div className="text-white flex justify-center items-center mb-10 text-2xl font-mono">
        <h1>Add New Book</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="py-6 px-7 box-content max-w-md border-2 font-mono border-gray-500 rounded-3xl "
        encType="multipart/formdata"
      >
        <div className="space-y-12">
          <div className="pb-1">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Author
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="author"
                    id="author"
                    autoComplete="authorme"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="edition"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  edition
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="edition"
                    name="edition"
                    type="text"
                    autoComplete="edition"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Category
                </label>
                <div className="mt-1">
                  <select
                    onChange={handleChange}
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {cates &&
                      cates.map((cat) => {
                        return (
                          <>
                            <option key={cat.name} value={cat._id}>
                              {cat.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="col-span-4">
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  ISBN
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="isbn"
                    id="isbn"
                    autoComplete="isbn"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="number"
                    name="stock"
                    id="stock"
                    autoComplete="stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="publisher"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Publisher
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="publisher"
                    id="publisher"
                    autoComplete="publisher"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="shelfNumber"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Shelf number
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="shelfNumber"
                    id="shelfNumber"
                    autoComplete="publisher"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="border-gray-900/10 pb-1 col-span-full">
                  <div className="">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-400"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        onChange={handleChange}
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about the book.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-400"
                    >
                      Cover photo
                    </label>
                    <div className="mt-1 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-400"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file"
                            className="relative cursor-pointer py-2 px-3 rounded-md bg-indigo-600 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              onChange={imageUpload}
                              id="file"
                              name="file"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-white">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* <div className="border-gray-900/10 pb-1">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-400"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={handleChange}
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the book.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-400"
                  >
                    Cover photo
                  </label>
                  <div className="mt-1 bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer py-2 px-3 rounded-md bg-indigo-600 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            onChange={imageUpload}
                            id="file"
                            name="file"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-white">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add book
          </button>
        </div>
      </form>
    </div>
  );
}
