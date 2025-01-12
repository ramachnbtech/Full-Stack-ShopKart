import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import loginIcons from '../assest/signin.gif'
import imageTobase64 from '../Helpers/imageTobase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'


const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic
        }
        })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch (SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
      
      // console.log("data",dataApi)

    }else {
      // console.log("Password and Confirm Password does not match")
      toast.error("Password and Confirm Password does not match")
    }

    
  }


  // console.log('data', data)

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='Login icon' />
            </div>
            <form>
              <label>
                <div className='text-xs ml-1 pb-4 pt-2 bg-opacity-80 bg-slate-200 cursor-pointer text-center absolute bottom-0'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className="grid">
              <label>Name : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className='w-full h-full outline-none bg-transparent' />

              </div>
            </div>

            <div className="grid">
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className='w-full h-full outline-none bg-transparent' />

              </div>
            </div>

            <div className="grid">
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className='w-full h-full outline-none bg-transparent' />

                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                        : (
                          <FaEye />
                        )
                    }

                  </span>
                </div>
              </div>
            </div>

            <div className="grid">
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                  required
                  className='w-full h-full outline-none bg-transparent' />

                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      )
                        : (
                          <FaEye />
                        )
                    }

                  </span>
                </div>
              </div>
            </div>

            <button className='bg-cyan-500 hover:bg-cyan-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

          </form>
          <p className='my-5 '>Already have an Account? <Link to={'/login'} className='text-blue-500 hover:text-blue-700 hover:underline'>Login</Link></p>
        </div>

      </div>
    </section>
  )
}

export default SignUp
