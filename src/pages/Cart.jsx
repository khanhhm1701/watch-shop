import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../assets/scss/Cart.scss";
import { cartBanner } from "../assets/img";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"

const Cart = () => {
  const productData = useSelector((state) => state.watchHouse.productData);
  const userInfo = useSelector((state) => state.watchHouse.userInfo);
  const [totalAmt, setTotalAmt] = useState("")
  const [payNow, setPayNow] = useState(false)

  useEffect(() => {
    let price = 0
    productData.map((product) => {
      price += product.price * product.quantity
      return price
    })
    setTotalAmt(price.toFixed(2))
  },[productData])

  const handleCheckout = () => {
    if(userInfo) {
      setPayNow(true)
    }else{
      toast.error("Please sign in to checkout")
    }
  }

  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    })
  }

  return (
    <div className="cart-page mt-20">
      <img
        className="w-full h-60 object-cover"
        src={cartBanner}
        alt="cartImg"
      />
      <div className="cart-item max-w-screen-xl mx-auto py-20 flex">
        <CartItem />
        <div className="cart-totals w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">Cart Totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-titleFont font-bold text-lg">${totalAmt}</span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping{" "}
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos,
                veritatis.
              </span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">${totalAmt  }</span>
          </p>
          <button onClick={handleCheckout} className="text-base bg-black text-white w-full py-3 mt-6 hover:opacity-70">
            proceed to checkout
          </button>
          {
            payNow && <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51MtjufBkcZSzCJBdd6QVzSwgGx1E7SAkevnYIEjmrVrnsKPhpqIMXrlfOvje4GOwvOTn6KE6oKVc7FM8j0Fbwfla00Vb42xIOv"
                name="watchHouse Online Shopping"
                amount={totalAmt * 100}
                LabeL="Pay to watchHouse"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          }
        </div>
      </div>
      <ToastContainer
        position= "top-left"
        autoCLose= {3000}
        hideProgressBar= {false}
        newestOnTop= {false}
        closeOnClick
        rtl = {false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
