"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function Signin() {
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
    username:"",
    name:"",
    personalNo:""
  });
  const [error, setError] = useState("");
  const {  password, email, personalNo,username,name } = userDetails;
  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(userDetails);
      if (email.length == 0 || password.length == 0 || name.length ==0 || personalNo.length==0|| username.length==0) {
        setError("All field are required");
        return null;
      }
      const res = await axios.post(
        "https://lionfish-app-bihwo.ondigitalocean.app/api/auth/register",
        userDetails
      );
        console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", `Bearer ${res.data.accessToken}`);
        localStorage.setItem("userId", res.data.userId);
        router.push("/login");
        toast.success('User created successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      } else {
        setError("Invalid user credentials");
      }
    } catch (error) {
      setError("Invalid user credentials");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-auto ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full h-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <Image src="/manorama.jpg" width={200} height={80} alt="dfdf" />
            </div>
            {/* 
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in 
            </h1> */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter user name"
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="fname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="fname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter user name"
                  value={name}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="user name"
                  value={username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="personalNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Personal No.
                </label>
                <input
                  type="text"
                  name="personalNo"
                  id="uname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="personal number"
                  value={personalNo}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
              {error.length != 0 && (
                <p className="text-center text-red-500">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
