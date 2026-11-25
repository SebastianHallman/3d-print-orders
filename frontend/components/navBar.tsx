import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='flex mt-5 ml-5 pb-2'>
        <div className='flex-6'>
            <p className='text-xl'>Print that for me</p>
        </div>

        <div className='flex-6 mr-6'>
            <ul className='no-underline flex justify-end'>
                <li className='mx-2'>Home</li>
                <li className='mx-2'><Link href="/admin/login">Admin login</Link></li>
            </ul>
        </div>

    </nav>
  )
}
