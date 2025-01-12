const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId
    const addToCartProductId = req.body._id

    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCartProductId,
      userId: currentUser
      })
      
      res.json({
        message: "Product deleted from cart",
        data: deleteProduct,
        success: true,
        error: false
      })
        
    
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    })
    
  }
  
}

module.exports = deleteAddToCartProduct