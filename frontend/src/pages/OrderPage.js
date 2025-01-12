import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../Helpers/displayCurrency'

const OrderPage = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })

    const responseData = await response.json()

    setData(responseData.data)
    // console.log("order list", responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }

      <div className='p-4 w-full'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index} className='pb-2'>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LLL')}</p>

                <div className='border rounded'>
                  <div className='flex flex-col lg:flex-row justify-between'>
                    {/* Product Deatils */}
                    <div className='grid gap-1'>
                      {
                        item.productDetails.map((product, index) => {
                          return (
                            <div key={product.productId + index} className='flex gap-3 bg-slate-100'>
                              <img
                                src={product.image[0]}
                                className='w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply p-2'
                              />
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='flex items-center gap-5 mt-1'>
                                  <div className='text-lg text-cyan-600 font-medium'>{displayINRCurrency(product.price)}</div>
                                  <p className='font-medium'>Quantity : {product.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>

                    <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                      {/* Payment Deatils */}
                      <div>
                        <div className='text-lg font-medium'>Payment Details : </div>
                        <div className='ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</div>
                        <div className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</div>
                      </div>

                      {/* Shipping Deatils */}
                      <div>
                        <div className='text-lg font-medium'>Shipping Deatils : </div>
                        {
                          item.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate + index} className='ml-1'>
                                Shipping Amount : {displayINRCurrency(shipping.shipping_amount)}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className='font-semibold ml-auto w-fit text-lg'>
                    Total Amount : {displayINRCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage
