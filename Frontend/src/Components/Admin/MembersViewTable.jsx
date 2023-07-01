import React from 'react'
import { useNavigate , Link } from 'react-router-dom'

//Admin APIs 
import {getMembers} from '../../Utils/AdminApis'

import { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector , useDispatch} from 'react-redux'
import {updateMembers} from '../../Redux/Admin/MemberSlice'
import { updateSingleMember } from '../../Redux/Admin/SingleMemberSlice'
import { BasicTable } from '../Table/Table'


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

            {/* <BasicTable /> */}


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

            </div>
        </div>
    )
}

export default MembersViewTable