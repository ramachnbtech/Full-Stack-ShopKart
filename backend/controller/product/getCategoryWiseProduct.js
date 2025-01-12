const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async (req, res) => {
  try {
    const {category} = req?.body || req?.query
    const product = await productModel.find({category})
    
    res.json({
      data: product,
      message: "Product found successfully",
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

module.exports = getCategoryWiseProduct