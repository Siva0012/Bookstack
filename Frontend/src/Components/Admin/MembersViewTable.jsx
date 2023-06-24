import React from 'react'
import { useNavigate , Link } from 'react-router-dom'

//Admin APIs 
import {getMembers} from '../../Utils/AdminApis'

import { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector , useDispatch} from 'react-redux'
import {updateMembers} from '../../Redux/Admin/MemberSlice'
import { updateSingleMember } from '../../Redux/Admin/SingleMemberSlice'

function MembersViewTable() {

    const [members, setmembers] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getMembersData = async () => {
        try {
            getMembers()
                .then((response) => {
                    setmembers(response.data.members)
                })
                .catch((err) => {
                    throw err
                })
        } catch (err) {
            console.log("axios error in members component", err);
        }
    }
    const handleSubmit = (id , member) => {
        navigate(`/admin/view-member/${id}`
        )
    }

    useEffect(() => {
        getMembersData()
    }, [])

    console.log("memberstate" , members);

    return (
        <div>
            <div className="relative  shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of join
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>

                    </thead>
                    <tbody>

                        {
                            members.map((member) => {
                                return (
                                    <React.Fragment key={member._id}>
                                        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {member.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {member.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(member.dateOfJoin).format('MMMM Do YYYY')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    member.isMember ? member.membershipType : 'Not a member'
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex justify-between'>
                                                    <button type='button' onClick={() => handleSubmit(member._id , member)} className='bg-blue-600 text-white px-4'>view</button>
                                                    <button className='bg-red-600 text-white px-4'>Block</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }


                    </tbody>
                </table>
                <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <Link to="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</Link>
                        </li>
                        <li>
                            <Link to="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</Link>
                        </li>
                        <li>
                            <Link to="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</Link>
                        </li>
                        <li>
                            <Link to="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</Link>
                        </li>
                        <li>
                            <Link to="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</Link>
                        </li>
                        <li>
                            <Link to="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default MembersViewTable