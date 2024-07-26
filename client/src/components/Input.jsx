import React, { forwardRef } from 'react'

const Input = forwardRef(({type, placeholder}, ref) => {
  return (
    <input ref={ref} type={type} placeholder={placeholder} className='bg-white text-black p-1'/>
  )
});

export default Input