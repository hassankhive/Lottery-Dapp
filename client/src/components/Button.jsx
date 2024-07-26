import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button className='bg-blue-400 rounded h-10 w-[120px] cursor-pointer' onClick={onClick}>{text}</button>
  )
}

export default Button