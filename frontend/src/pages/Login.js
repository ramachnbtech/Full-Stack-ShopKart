import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleChange = (e) => {
    const {name, value} = e.target

    setData((prev) => {
      return {
        ...prev, 
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    } else {
      toast.error(dataApi.message)
    }
  }

  // console.log('data',data)

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>

          <div className='bg-white p-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto'>
              <img src={loginIcons} alt='Login icon'/>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className="grid">
                  <label>Email : </label>
                  <div className='bg-slate-100 p-2'>
                    <input 
                    type="email" 
                    name="email" 
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    className='w-full h-full outline-none bg-transparent'/>
                    
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
                    className='w-full h-full outline-none bg-transparent'/>

                    <div className='cursor-pointer text-xl' onClick={()=> setShowPassword((prev)=>!prev)}>
                      <span>
                      {
                        showPassword ? (
                        <FaEyeSlash/>
                        )
                        : (
                          <FaEye/>
                        ) 
                      }
                      
                      </span>
                    </div>
                  </div>
                  <Link to = {'/forgot-password'} className='block w-fit ml-auto'>
                  <p className='text-sm text-blue-500 hover:text-blue-700 hover:underline'>Forgot Password?</p>
                  </Link>
              </div>

              <button className='bg-cyan-500 hover:bg-cyan-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

            </form>
              <p className='my-5 '>Don't have an Account? <Link to = {'/sign-up'} className='text-blue-500 hover:text-blue-700 hover:underline'>Sign up</Link></p>
          </div>

      </div>
    </section>
  )
}

export default Login
