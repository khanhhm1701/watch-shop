import React from "react";
import { ToastContainer } from "react-toastify";
import { FacebookLogo, GoogleLogo } from "../assets/img";
import { cartBanner } from "../assets/img";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/watchHouseSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user._id,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(()=>{
          navigate("/")
        }, 1500)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully!");
        dispatch(removeUser())
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-20">
      <img
        className="w-full h-60 object-cover"
        src={cartBanner}
        alt="cartImg"
      />
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        {/* Google Sign in */}
        <div className="flex gap-6">
          <div
            onClick={handleGoogleLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md 
            flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={GoogleLogo} alt="GoogleImg" />
            <span className="text-sm text-gray-800">Sign in with Google</span>
          </div>
          <button
            onClick={handleSignOut}
            className="w-40 h-12 bg-black text-white text-base tracking-wide rounded-md hover:opacity-70 duration-300"
          >
            Sign Out
          </button>
        </div>
        {/* Facebook Sign in */}
        <div className="flex gap-6">
          <div
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md 
        flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-7" src={FacebookLogo} alt="GoogleImg" />
            <span className="text-sm text-gray-800">Sign in with Facebook</span>
          </div>
          <button className="w-40 h-12 bg-black text-white text-base tracking-wide rounded-md hover:opacity-70 duration-300">
            Sign Out
          </button>
        </div>
      </div>
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

export default Login;

//Khanh
