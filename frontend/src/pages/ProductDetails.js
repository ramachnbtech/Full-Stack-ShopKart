import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../Helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../Helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  // console.log("product id", params);


  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.product_details.url, {
      method: SummaryApi.product_details.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })

    setLoading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }

  // console.log("data", data);


  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();

    // console.log("coordinates", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image  */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/* Product Zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[515px] top-0'>
                  <div className='w-full h-full min-h-[400px] min-w-[500px] scale-100 mix-blend-multiply'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}
                  >
                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='w-20 h-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='w-20 h-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product Details  */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 rounded-full px-2 inline-block h-6 w-full animate-pulse'></p>
              <h2 className='text-2xl lg:text-4xl font-medium bg-slate-200 h-6 animate-pulse rounded-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 h-6 animate-pulse min-w-[100px] rounded-full'></p>

              <div className='text-cyan-600 flex items-center gap-1 bg-slate-200 h-6 animate-pulse rounded-full'>

              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium py-1 bg-slate-200 animate-pulse rounded'>
                <p className='text-cyan-700 h-6'></p>
                <p className='text-slate-400 line-through h-6'></p>
              </div>

              <div className='flex items-center gap-3 my-2 bg-slate-200 animate-pulse'>
                <button className='border-2 rounded px-3 py-1 min-w-[120px] h-6 font-medium '></button>
                <button className='border-2 rounded px-3 py-1 min-w-[120px] h-6 font-medium '></button>
              </div>

              <div>
                <p className='text-slate-600 font-medium bg-slate-200 animate-pulse h-6'></p>
                <p className='bg-slate-200 animate-pulse h-10'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-cyan-200 rounded-full px-2 inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-cyan-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium py-1'>
                <p className='text-cyan-700'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-cyan-600 rounded px-3 py-1 min-w-[120px] hover:bg-cyan-700 font-medium' onClick={(e)=> handleBuyProduct(e, data?._id)}>Buy Now</button>
                <button className='border-2 border-cyan-500 rounded px-3 py-1 min-w-[120px] bg-cyan-500 hover:bg-white font-medium' onClick={(e) => handleAddToCart(e, data?._id)}>Add to Cart
                </button>
              </div>

              <div>
                <p className='text-slate-600 font-medium'>Description :</p>
                <p className=''>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>



      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Similar Products"} />
        )
      }

    </div>
  )
}

export default ProductDetails
