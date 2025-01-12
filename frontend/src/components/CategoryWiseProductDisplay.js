import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../Helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../Helpers/addToCart'
import Context from '../context'
import scrollTop from '../Helpers/scrollTop'

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddtoCart = async(e,id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }


  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    // console.log("vertical card data", categoryProduct.data)
    setData(categoryProduct?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='container mx-auto p-4 my-6 relative'>

      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-evenly md:gap-6 overflow-x-scroll scrollbar-none transition-all'>

        {
          loading ? (
            loadingList.map((product, index) => {
              return (
                <div key={product?._id + "Product Category is Loading..!"+ index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                  <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>

                  <div className='p-4 grid gap-3'>
                    <h3 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse p-1 rounded-full bg-slate-200 py-2'></h3>
                    <p className='text-slate-500 capitalize animate-pulse p-1 rounded-full bg-slate-200 py-2'></p>
                    <div className='flex gap-3'>
                      <p className='text-sky-700 font-medium animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                      <p className='text-slate-500 line-through animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                    </div>
                    <button className='text-sm px-3 py-2 animate-pulse p-1 rounded-full bg-slate-200'></button>
                  </div>
                </div>
              )
            })
          ) : (
            data.map((product, index) => {
              return (
                <Link to={"/product/" + product?._id} key={product?._id+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                  <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                    <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                  </div>
                  <div className='p-4 grid gap-3'>
                    <h3 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h3>
                    <p className='text-slate-500 capitalize'>{product?.category}</p>
                    <div className='flex gap-3'>
                      <p className='text-sky-700 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                      <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                    </div>
                    <button className='text-sm bg-cyan-600 hover:bg-cyan-800 px-3 py-0.5 rounded-full' onClick={(e)=>handleAddtoCart(e, product?._id)}>Add to Cart</button>
                  </div>
                </Link>
              )
            })
          )

        }
      </div>


    </div>
  )
}

export default CategoryWiseProductDisplay
