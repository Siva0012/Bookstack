import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { useState } from 'react'

//admin APIs
import { addCategory } from '../../Utils/AdminApis'

//toaster
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddCategory() {

    const [values , setValues] = useState({
        name : '',
        description : ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await addCategory(values)
            // if(response.data.error) {
            //     throw new Error(response.data.error)
            // }
        }catch(err) {
            toast.error(err.response.data.error)
        }
    }

    return (
        <div>
            <div className=''>
                <div className='text-white flex justify-center items-center mb-10 text-2xl font-mono'>
                    <h1>Add new category</h1>
                </div>
                <form onSubmit={handleSubmit} className='py-6 px-7 box-content max-w-md border-2 font-mono border-gray-500 rounded-3xl ' encType='multipart/formdata' >
                    <div className="space-y-12">
                        <div className="pb-1">
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-400">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-400">
                                        description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            onChange={handleChange}
                                            id="description"
                                            name="description"
                                            type="text"
                                            autoComplete="description"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className='text-gray-500 mt-1 text-sm'>Write about the category in few words</p>
                                </div>

                            </div>
                            
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-x-2">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory