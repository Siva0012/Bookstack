import React from 'react'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// import image from '../../../../Backend/public/images/1686374814962-268722542-Screenshot 2023-06-08 230605.png'

//admin APIs
import { getSingleBook, getCategories, updateBook } from '../../Utils/AdminApis'

function ViewSingleBook() {

    const { bookId } = useParams()
    const [bookData, setBookData] = useState({})
    const [cats, setCats] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [inputValues, setInputValues] = useState({})
    
    useEffect(() => {
        getSingleBook(bookId)
        .then((response) => {
            const data = response.data.bookData
            setBookData(response.data.bookData)
            setInputValues({...data , category : data.category._id})
            console.log("sdfiojsdiofjasdifjsd" , response.data.bookData);
        })
        .catch(err => console.log(err))

        getCategories()
        .then((response) => {
            setCats(response.data.catData)
        })
        .catch(err => console.log(err))

    } , [])
    
    const handleEdit = () => {
        editForm ? setEditForm(false) : setEditForm(true)
    }

    const imageUpload = (e) => {
        setInputValues(
          {
            ...inputValues , coverPhoto : e.target.files[0] , coverPhotoUrl : URL.createObjectURL(e.target.files[0])
          }
        )
    }

    const handleChange = (e) => {
        setInputValues(
            {
                ...inputValues,
                [e.target.name] : e.target.value
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", inputValues.title)
        formData.append("author", inputValues.author);
        formData.append("edition", inputValues.edition);
        formData.append("category", inputValues.category);
        formData.append("isbn", inputValues.isbn);
        formData.append("stock", inputValues.stock);
        formData.append("publisher", inputValues.publisher);
        formData.append("description", inputValues.description);
        formData.append("coverPhoto" , inputValues.coverPhoto)
        updateBook(bookId , formData)
        .then((response) => {
            console.log("response from update book function" , response);
            if(response.data.updateBook) {
                const data = response.data.updateBook
                setBookData({...data , category : data.category._id})
                console.log('this is bookdata after submission' , bookData);
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <div className='flex flex-col items-center align-middle justify-center min-w-full'>
            <div className='border w-full rounded-md p-5 flex items-start'>

                <div id='content-div' className='w-full h-auto border border-1 me-4 bg-white text-black'>
                    <div className='grid grid-rows-4 gap-5'>
                        <div className='p-2'>
                            <h1 className='text-2xl text-center'>{bookData.title}</h1>
                        </div>
                        <div className='flex justify-around items-center shadow-md'>
                            <h2>Author</h2>
                            <span>{bookData.author}</span>
                        </div>
                        <div className='flex justify-around items-center shadow-md'>
                            <h2>Edition</h2>
                            <h2>{bookData.edition}</h2>
                        </div>
                        <div className='flex justify-around items-center shadow-md'>
                            <h2>Category</h2>
                            {
                                bookData.category && <h2>{bookData.category.name}</h2>
                            }
                        </div>
                        <div className='flex justify-around items-center shadow-md'>
                            <h2>Stock</h2>
                            <h2>{bookData.stock}</h2>
                        </div>
                        <div className='flex justify-around items-center shadow-md'>
                            <h2>Publisher</h2>
                            <h2>{bookData.publisher}r</h2>
                        </div>

                    </div>

                </div>
                <div id='image-div' className='w-full h-auto py-5 bg-gray-300' >
                    <div className='flex flex-col'>
                    <img className='object-contain max-h-80 mx-auto' alt='Book cover' src={bookData.coverPhoto}  ></img>
                    <button onClick={() => handleEdit(bookData._id)} className='bg-yellow-400 px-3 py-1 w-1/2 mx-auto mt-4'>Edit book</button>
                    </div>
                </div>
            </div>
            {
                editForm &&
                <div className='border-2 border-gray-500 rounded-3xl mt-8'>
                    <div className='text-white flex justify-center items-center  text-2xl font-mono'>
                        <h1>Update book</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='pb-2 px-7 box-content max-w-md  font-mono ' encType='multipart/formdata' >
                        <div className="space-y-12">
                            <div className="pb-1">
                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-400">
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.title}
                                                defaultValue={bookData.title}
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete="title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-400">
                                            Author
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.author}
                                                defaultValue={bookData.author}
                                                type="text"
                                                name="author"
                                                id="author"
                                                autoComplete="authorme"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="edition" className="block text-sm font-medium leading-6 text-gray-400">
                                            edition
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.edition}
                                                defaultValue={bookData.edition}
                                                id="edition"
                                                name="edition"
                                                type="text"
                                                autoComplete="edition"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-400">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                onChange={handleChange}
                                                placeholder={bookData.category}
                                                id="category"
                                                name="category"
                                                autoComplete="category"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                {
                                                    bookData.category &&
                                                    <option >{bookData.category.name}</option>
                                                }
                                                {
                                                    cats && cats
                                                        .filter((cat) => {
                                                            return cat._id !== bookData.category._id
                                                        })
                                                        .map((cat) => {
                                                            return (
                                                                <>
                                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                                </>
                                                            )
                                                        })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="isbn" className="block text-sm font-medium leading-6 text-gray-400">
                                            ISBN
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.isbn}
                                                defaultValue={bookData.isbn}
                                                type="text"
                                                name="isbn"
                                                id="isbn"
                                                autoComplete="isbn"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-400">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.stock}
                                                defaultValue={bookData.stock}
                                                type="number"
                                                name="stock"
                                                id="stock"
                                                autoComplete="stock"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="publisher" className="block text-sm font-medium leading-6 text-gray-400">
                                            Publisher
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                placeholder={bookData.publisher}
                                                defaultValue={bookData.publisher}
                                                type="text"
                                                name="publisher"
                                                id="publisher"
                                                autoComplete="publisher"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-400">
                                                Description
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    onChange={handleChange}
                                                    placeholder={bookData.description}
                                                    defaultValue={bookData.description}
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the book.</p>
                                        </div>

                                </div>
                                <div className="pb-1">
                                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-400">
                                                Cover photo
                                            </label>
                                            <div className="mt-2 max-w-none bg-white flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <div className="flex flex-col text-sm leading-6 text-gray-600 mb-4">
                                                        {/* <div className='rounded-md drop-shadow-[0px_0px_8px_rgba(0,0,0,0.5)] p-2'>
                                                            <img alt="preview image" onChange={imageUpload} className=' mx-auto object-scale-down h-40' src={inputValues.coverPhoto ? URL.createObjectURL(inputValues.coverPhoto) : bookData.coverPhoto} />
                                                        </div> */}
                                                        <div className='rounded-md drop-shadow-[0px_0px_8px_rgba(0,0,0,0.5)] p-2'>
                                                            <img alt="preview image" onChange={imageUpload} className=' mx-auto object-scale-down h-40' src={!inputValues.coverPhotoUrl ? inputValues.coverPhoto : URL.createObjectURL(inputValues.coverPhoto)} />
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor="file"
                                                        className="cursor-pointer py-2 px-3 rounded-md bg-indigo-600 font-semibold text-white hover:text-indigo-500 hover:bg-white hover:drop-shadow-[0px_0px_4px_rgba(0,0,0,0.3)]"
                                                    >
                                                        <span>Update image</span>
                                                        <input onChange={imageUpload} id="file" name="file" type="file" className="sr-only" />
                                                    </label>
                                                    {/* <p className="text-xs leading-5 text-black">PNG, JPG, GIF up to 10MB</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-x-2">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default ViewSingleBook