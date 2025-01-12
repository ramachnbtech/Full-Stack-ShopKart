const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryApi.category_wise_product.url,{
    method: SummaryApi.category_wise_product.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category: category })
  })
  
  const dataResponse = await response.json()
  return dataResponse

}

export default fetchCategoryWiseProduct