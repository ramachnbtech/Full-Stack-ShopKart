import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
  imgUrl,
  onClose,
}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>

      <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
        <div className='hover:text-red-700 font-bold w-fit ml-auto text-2xl cursor-pointer'
          onClick={onClose}>
          <IoMdClose />
        </div>
        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80-vh]'>
          <img src={imgUrl} className='w-full h-full' />
        </div>
      </div>
    </div>

  )
}

export default DisplayImage
