import React, { useState } from 'react'
import Role from '../common/Role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role)

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value)

    console.log("Role",e.target.value)
  }

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.update_user.url, {
      method: SummaryApi.update_user.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : userId,
          role : userRole
          })
    })

    const responseData = await fetchResponse.json()

    if(responseData.success){
      toast.success(responseData.message)
      onClose()
      callFunc()
    }
    console.log("Role updated",responseData)

  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 opacity-80'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto' onClick={onClose}>
            <IoMdClose />
        </button>

        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className='flex justify-start my-4'>
          <p className='pr-2'>Role : </p>
          <select className='border px-3' value={userRole} onChange={handleOnChangeSelect}>
            {
              Object.values(Role).map(el => {
                return (
                  <option key={el} value={el}>{el}</option>
                )
              })
            }
          </select>
        </div>

        <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-cyan-500 text-md hover:bg-cyan-800 hover:text-white' onClick={updateUserRole}>Change Role</button>

      </div>
    </div>
  )
}

export default ChangeUserRole
