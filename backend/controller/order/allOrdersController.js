const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allOrdersController = async (request,response) => {
  try {
    const userId = request.userId

    const user = await userModel.findById(userId)

    if (user.role !== 'ADMIN'){
      return response.status(403).json({ 
        message: 'You are not authorized to access this page'
      })
    }
    const allOrder = await orderModel.find().sort({ createdAt : -1 })
    return response.status(200).json({
      message: 'All orders retrieved successfully',
      data: allOrder,
      success: true
    })

  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
  
}

module.exports = allOrdersController