"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const [userDetails, setuserDetails] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { userName, password } = userDetails;
  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (usernameOrEmail.length == 0 || password.length == 0) {
        setError("All field are required");
        return null;
      }
      const res = await axios.post(
        "https://lionfish-app-bihwo.ondigitalocean.app/api/auth/login",
        userDetails
      );
        
      if (res.status === 200) {
        localStorage.setItem("token", `Bearer ${res.data.accessToken}`);
          localStorage.setItem("userId", res.data.userId);
        if(res.data.roles[0].name=="ROLE_ADMIN"){
          
          router.push("/admin");
        }else{
          router.push("/")
        }
        
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
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full h-[500px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                  htmlFor="usernameOrEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter user name"
                  value={userName}
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
            <div className="pt-5" >

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
    </section>
  );
}
