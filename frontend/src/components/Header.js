import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Role from '../common/Role';
import Context from '../context';


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll('q')
  const [search, setSearch] = useState(searchQuery)

  // console.log("searchInput",searchInput?.search?.split("=")[1])
  // console.log("user header", user)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  // console.log("header add to cart product count", context)

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }

  return (
    <>
      <header className='h-14 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>

          <div className='flex items-center cursor-pointer'>
            <Link>
              <Logo w={50} h={45} />
            </Link>
            <label className='text-cyan-400 font-semibold text-lg'>ShopKart</label>
          </div>

          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type='text' placeholder='Search a Product' className='w-full outline-none' onChange={handleSearch} value={search}/>
            <div className='text-lg min-w-[50px] h-7 bg-cyan-500 rounded-r-full flex items-center justify-center'>
              <GrSearch />
            </div>
          </div>

          <div className='flex items-center gap-7'>

            <div className='relative flex justify-center'>

              {
                user?._id && (
                  <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                    {
                      user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (
                        <FaRegCircleUser />
                      )
                    }
                  </div>
                )
              }

              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded-md'>
                    <nav>
                      {
                        user?.role === Role.ADMIN && (
                          <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel
                          </Link>
                        )
                      }

                      <Link to={"/order"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>My Orders</Link>

                    </nav>
                  </div>
                )
              }


            </div>

            {
              user?._id && (
                <Link to={'/cart'} className='text-2xl cursor-pointer relative'>
                  <span><FaCartShopping /></span>

                  <div className='bg-cyan-500 w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-3 -right-2'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>

                </Link>
              )
            }


            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-700'>Logout</button>
                )
                  :
                  (
                    <Link to={'login'} className='px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-700'>Login</Link>
                  )
              }

            </div>

          </div>

        </div>
      </header>
    </>
  )
}

export default Header
