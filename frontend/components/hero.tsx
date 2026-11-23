import React from 'react'
import OrderForm from './orderForm'

export default function Hero() {
  return (
    <div className='grid grid-cols-2'>
        <div>
            <h1 className='text-5xl'>Need that thing? Sebbe fix</h1>
            <p className='text-xl mt-5'>Make him run that printer</p>
        </div>
        <div>
            <OrderForm />
        </div>
    </div>
  )
}
