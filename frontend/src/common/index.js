
const backendDomain = process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"


const SummaryApi = {

  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "GET",
  },
  all_user: {
    url: `${backendDomain}/api/all-user`,
    method: "GET",
  },
  update_user: {
    url: `${backendDomain}/api/update-user`,
    method: "POST",
  },
  upload_product: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST",
  },
  get_all_product: {
    url: `${backendDomain}/api/get-product`,
    method: "GET",
  },
  update_product: {
    url: `${backendDomain}/api/update-product`,
    method: "POST",
  },
  product_category: {
    url: `${backendDomain}/api/get-product-category`,
    method: "GET",
  },
  category_wise_product: {
    url: `${backendDomain}/api/category-product`,
    method: "POST",
  },
  product_details: {
    url: `${backendDomain}/api/product-details`,
    method: "POST",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/add-to-cart`,
    method: "POST",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/add-to-cart-count`,
    method: "GET"
  },
  viewCartProduct: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "GET"
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "POST"
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "POST"
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "GET"
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "POST"
  },
  payment: {
    url: `${backendDomain}/api/checkout`,
    method: "POST"
  },
  getOrder: {
    url: `${backendDomain}/api/order-list`,
    method: "GET"
  },
  allOrder: {
    url: `${backendDomain}/api/all-orders`,
    method: "GET"
  }


}

export default SummaryApi;