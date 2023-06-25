import React from 'react'

function Test() {
    return (

        <>
            <div id='color-div' className='py-4 px-3 bg-[#7E7C73] w-screen'>
                <div id='flex-div' className='flex align-middle w-full h-full'>
                    <div id='first-div' className='flex justify-between align-middle w-1/2'>
                        <div className='text-white font-roboto text-logo '>
                            <h1>
                                BOOKSTACK
                            </h1>
                        </div>
                        <div className='text-white font-semibold text-nav-element'>
                            <h1>
                                Dashboard
                            </h1>
                        </div>
                    </div>
                    <div id='second-div' className='w-1/2'>
                        
                    </div>
                </div>
            </div>

        </>

    )
}

export default Test