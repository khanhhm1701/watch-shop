import React from 'react'
import ProductCard from './ProductCard'

const Products = ({products}) => {
  return (
    <div className="py-10">
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">Shopping everyday</h1>
            <span className="w-20 h-[3px] bg-black"></span>
            <p className='max-w-[700px] text-gray-600 text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis elit id rhoncus ultrices. 
                Sed ullamcorper lorem lorem, nec pellentesque enim aliquam vel. Phasellus sed dictum arcu. 
                Ut at turpis blandit, dignissim mauris a, scelerisque nibh. Vestibulum non semper dui. 
                Aenean ligula arcu, fringilla vitae ultrices id, gravida eu lacus. 
                Nullam sit amet fringilla tellus, a gravida quam.
            </p>
        </div>
        <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
            {
              products.map(product => (
                <ProductCard key={product._id} product={product}/>
              ))
            }
        </div>
    </div>
  )
}

export default Products