import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.get_all_product.url,)
    const dataResponse = await response.json()

    console.log("product data", dataResponse);
    

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  })


  return (
    <>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All Products</h2>
      <button className='border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-black transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
    </div>

    {/* All Products */}
    <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
      {
        allProduct.map((product, index) => {
          return (
            <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct} />
            
          )
        })
      }
    </div>



    {/* Upload product component */}
    {
      openUploadProduct && (
      <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
    )
    }
    
    </>
  )
}

export default AllProducts
