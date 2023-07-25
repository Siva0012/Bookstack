import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

//admin APIs
import { getCategories } from '../../Utils/AdminApis'

function CategoryTable() {

    const [cat, setCat] = useState([])

    const getCat = async () => {
        getCategories()
            .then((response) => {
                if (response.data.catData) {
                    setCat(response.data.catData)
                }
            })
    }

    useEffect(() => {
        getCat()
    }, [])

    const navigate = useNavigate()
    return (
        <div className='text-white font-mono'>
            <div className='flex-col'>
                <div className='flex items-end mb-4'>
                    <button onClick={() => navigate('/admin/add-category')} className='text-white px-5 py-1 rounded-sm bg-blue-500  me-auto '>Add category</button>
                </div>
                <div className="relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr className='border-4'>
                                <th scope="col" className="px-6 py-3 text-sm ">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm ">
                                    Date added
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm ">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cat && cat.map((category) => {
                                    return (
                                        <>
                                            <tr key={category._id} className="bg-white border-4 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {category.name}
                                                </th>
                                                <td className="px-6 py-4 text-gray-800">
                                                    {moment(category.dateAdded).format('MMMM Do YYYY, h:mm:ss a')}
                                                </td>
                                                <td className="px-6 py-4 text-gray-800">
                                                    {category.description}
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <Link href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</Link>
                            </li>
                            <li>
                                <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                            </li>
                            <li>
                                <Link href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
                            </li>
                            <li>
                                <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</Link>
                            </li>
                            <li>
                                <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default CategoryTable