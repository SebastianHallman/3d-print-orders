import React from 'react'

export default function NavBar() {
  return (
    <nav className='flex mt-5 ml-5'>
        <div className='flex-6'>
            <p className='text-xl'>Print that for me</p>
        </div>

        <div className='flex-6 mr-6'>
            <ul className='no-underline text-white flex justify-end'>
                <li className='mx-2'>Home</li>
                <li className='mx-2'>Admin login</li>
            </ul>
        </div>

    </nav>
  )
}
