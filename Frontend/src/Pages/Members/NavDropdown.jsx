import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'

import {BsFillCaretDownFill , BsFillCaretUpFill} from 'react-icons/bs'

//member APIs
import {getCategories} from '../../Utils/MemberApis'

function NavDropdown() {

    const [isOpen, setIsOpen] = useState(false)
    const [catData , setCatData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
        .then((response) => {
            console.log(response);
            setCatData(response.data.catData)
        })
    } , [])

    // const handleCatClick = (catId) => {
    //     console.log("called handleClick");
    //     navigate(`/books/${catId}`)
    // }

    return (
        <div className='relative flex flex-col items-start rounded-lg'>
            <p
                onMouseEnter={() => setIsOpen((prev) => !prev)}
                onClick={() => setIsOpen((prev) => !prev)}
                className='w-full flex items-center justify-between'
            >
                Books
                {
                    !isOpen ? (
                        <BsFillCaretDownFill className='ms-3' />
                    ) :
                        (
                        <BsFillCaretUpFill className='ms-3' />
                        )
                }
            </p>
            {
                isOpen && (
                    <div onMouseLeave={() => setIsOpen((prev) => !prev)}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className='absolute top-10 w-[200px] rounded-lg p-2 bg-user-nav'>
                        {
                            catData && catData.map((catData) => {
                                return (
                                    <>
                                        <div key={catData._id} 
                                        className='w-full border border-1 py-1 rounded-lg hover:font-bold hover:bg-white'
                                        >
                                            <Link 
                                            to={`/books/${catData._id}`}
                                            className='p-2 items-start hover:text-black '
                                            >{catData.name}</Link>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>

    )
}

export default NavDropdown