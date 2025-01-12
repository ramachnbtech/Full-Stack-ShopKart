import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../Helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const fetchData = async () => {

    const response = await fetch(SummaryApi.viewCartProduct.url, {
      method: SummaryApi.viewCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const responseData = await response.json()

    if (responseData.success) {
      setData(responseData.data)
    }

  }

  const handleLoading = async () => {
    await fetchData()
  }

  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
  }, [])

  // console.log("cart data", data)

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          _id: id,
          quantity: qty + 1,
        }
      ),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            _id: id,
            quantity: qty - 1,
          }
        ),
      });
      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          _id: id
        })
    })


    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart()
    }
  }

  const handlePayment = async () => {
    // alert("payment")
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems : data
        }),
  })
  const responseData = await response.json();

  if (responseData?.id) {
    stripePromise.redirectToCheckout({ sessionId: responseData.id })
  }
  console.log("Payement data", responseData)

  }

  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className='container mx-auto'>

      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className='bg-white py-5'>Your cart is empty!</p>
          )
        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View cart Products */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el, index) => {
                return (
                  <div key={el + "Cart is Loading..!" + index} className='w-full rounded bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse'>
                  </div>
                )
              })

            ) : (
              data.map((product, key) => {
                return (
                  <div key={product?._id + "Cart is Loading..!"+ key} className='w-full rounded bg-white h-32 my-2 border border-slate-300 grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>
                    <div className='px-4 py-2 relative'>
                      {/* Delete Icon */}
                      <div className='absolute right-0 rounded-full p-2 hover:bg-red-500 hover:text-white cursor-pointer'
                        onClick={() => deleteCartProduct(product?._id)}>
                        <MdDelete />
                      </div>
                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                        {product?.productId?.productName}
                      </h2>
                      <p className='capitalize text-slate-500'>
                        {product?.productId?.category}
                      </p>
                      <div className='flex items-center justify-between'>
                        <p className='text-sky-700 font-medium text-lg'>
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className='text-slate-600 font-semibold text-lg'>
                          {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                        </p>
                      </div>
                      <div className='flex items-center gap-3 mt-1'>

                        <button className='border border-cyan-700 text-cyan-600 w-6 h-6 flex justify-center items-center rounded hover:bg-cyan-800 hover:text-black' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>

                        <span className='mx-2'>{product?.quantity}</span>

                        <button className='border border-cyan-700 text-cyan-600 w-6 h-6 flex justify-center items-center rounded hover:bg-cyan-800 hover:text-black' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>

                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/* Product Total Summary */}
        {
          data[0] && (
            <div className='mt-5 lg:mt-0 w-full max-w-sm py-2'>
              {
                loading ? (
                  <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded'>

                  </div>
                ) : (
                  <div className='h-36 bg-white'>
                    <h2 className='bg-cyan-500 px-4 py-1'>Total Summary</h2>
                    <div className='flex items-center justify-between px-4 gap-2 text-slate-600 font-medium text-lg'>
                      <p>Total Quantity</p>
                      <p>{totalQty}</p>
                    </div>
                    <div className='flex items-center justify-between px-4 gap-2 text-slate-600 font-medium text-lg'>
                      <p>Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>
                    <button className='bg-amber-500 p-2 w-full mt-1 rounded font-medium' onClick={handlePayment}>Place Order</button>
                  </div>
                )
              }
            </div>
          )
        }


      </div>


    </div>
  )
}

export default Cart
