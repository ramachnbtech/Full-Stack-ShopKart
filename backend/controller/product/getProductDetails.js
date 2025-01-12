const productModel = require("../../models/productModel")

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)

    res.json({
      message: "Product details retrieved successfully",
      data: product,
      success: true,
      error: false
    })

  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false
    })
  }
}

module.exports = getProductDetails