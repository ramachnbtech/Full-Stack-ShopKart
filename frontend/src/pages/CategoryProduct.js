import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../Helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  // console.log("urlCategoryListObject",urlCategoryListObject)  
  // console.log("urlCategoryListInArray",urlCategoryListInArray);

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data || [])
    // console.log("dataResponse",dataResponse)
  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })

    // console.log("selected category", selectCategory);
    // console.log("selected category",name, value, checked); 
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    // console.log("arrayOfCategory", arrayOfCategory)

    // format for URL change when change on checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    // console.log("urlFormat", urlFormat.join(""))
    navigate("/category-product?" + urlFormat.join(""))
  }, [selectCategory])


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if(value === 'asc'){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === 'dsc'){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=> {

  },[sortBy])


  return (
    <div className='container mx-auto p-4'>

      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort By</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" id="price" name="sortBy" value="asc" onChange={handleOnChangeSortBy} checked={sortBy === 'asc'}/>
                <label className="" htmlFor="price">Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type="radio" id="price" name="sortBy" value="dsc" onChange={handleOnChangeSortBy} checked={sortBy === 'dsc'}/>
                <label className="" htmlFor="price">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div key={index} className='flex items-center gap-3'>
                      <input type="checkbox" id={categoryName?.value} value={categoryName?.value} name={"category"} checked={selectCategory[categoryName?.value]} onClick={handleSelectCategory} />
                      <label className="" htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>



        {/* Right side (Product) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none'>
          {
            data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )
          }
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div>

      </div>

    </div>
  )
}

export default CategoryProduct
