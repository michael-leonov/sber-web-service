import React from 'react'
import CardProps from './interface'

const Card = ({ title, description }: CardProps) => {
  return (
    <div className='border shadow-lg rounded-md p-2 transition-colors cursor-pointer hover:bg-violet-300'>
      <p className='text-base text-center'>{title}</p>
      <p className='text-xs'>{description}</p>
    </div>
  )
}

export default Card
