import React from 'react'

function Navbar() {
    return (
        <>
            <div id='color-div' className='py-4 px-3 bg-[#7E7C73]'>
                <div className='flex justify-between items-center md:justify-around'>
                    <p className='uppercase text-md font-semibold font-roboto'>bookstack</p>
                    <p className='text-sm font-semibold'>Dashboard</p>
                </div>
                {/* <div id='flex-div' className='flex align-middle w-full h-full'>
                    <div id='first-div' className='flex justify-between align-middle w-1/2'>
                        <div className='text-white font-roboto text-xl sm:text-logo  '>
                            <h1>
                                BOOKSTACK
                            </h1>
                        </div>
                        <div className='text-white font-semibold'>
                            <h1 className='text-sm sm:text-nav-element'>
                                Dashboard
                            </h1>
                        </div>
                    </div>
                    <div id='second-div' className='w-1/2'>
                        
                    </div>
                </div> */}
            </div>

        </>

    )
}

export default Navbar