import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  deleteProduct,
  resetCart,
} from "../redux/watchHouseSlice";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.watchHouse.productData);
  return (
    <div className="cart-item w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">Shopping Cart</h2>
      </div>
      <div>
        {productData.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <i
                onClick={() =>
                  dispatch(deleteProduct(product._id)) &
                  toast.error(`${product.title} is removed`)
                }
                className="fa-solid fa-xmark text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              ></i>
              <img
                className="w-32 h-32 object-cover"
                src={product.image}
                alt="productImg"
              />
            </div>
            <p className="w-52 mb-0">{product.title}</p>
            <p className="w-10 mb-0">${product.price}</p>
            <div className="w-60 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm mb-0">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700
                hover:text-white cursor:pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      incrementQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700
                hover:text-white cursor:pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <p className="w-14 mb-0">${product.quantity * product.price}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your cart is empty")
        }
        className="bg-red-500 text-white mt-8 ml-5 py-1 px-6 hover:bg-red-800 duration-500"
      >
        Reset Cart
      </button>
      <Link className="no-underline" to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 Mtext-gray-400 hover:text-black duration-300 text-gray-400">
          <span>
            <i class="fa-solid fa-arrow-left"></i>
          </span>
          go shopping
        </button>
      </Link>
      <ToastContainer
        position="top-left"
        autoCLose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
