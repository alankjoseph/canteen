"use client";
import Image from "next/image";
import Header from "@/app/components/header";
import Card from "@/app/components/card";
import LineChart from "@/app/components/lineChart";
import PieChartPage from "@/app/components/piechart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [cartItem, setCartItem] = useState([]);
  const items = [
    {
      name: "Today's Expense",
      value: cartItem.length == 0 ? 0 : cartItem.dailySummary.totalAmount,
    },
    {
      name: "Monthly Expense",
      value: cartItem.length == 0 ? 0 : cartItem.monthlySummary.totalAmount,
    },
    {
      name: "Today's Transaction",
      value: cartItem.length == 0 ? 0 : cartItem.dailySummary.totalOrders,
    },
    {
      name: "Monthly Transaction",
      value: cartItem.length == 0 ? 0 : cartItem.monthlySummary.totalOrders,
    },
  ];
  const router = useRouter();
  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        "https://lionfish-app-bihwo.ondigitalocean.app/api/orders/summary?user_id=" +
          user_id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      setCartItem(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("You must login to access the site");
    }
    
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  },[]);

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="min-h-full">
      <Card cardItem={items} />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6  lg:px-8 md:grid grid-cols-2 h-[500px]   gap-5">
          {/* Line Chart Card */}
          <div className="bg-[#f9f9fc] rounded-lg shadow-md px-[24px] py-[40px]   w-full">
            {/* Add your Line Chart component here */}
            <h2 className="font-semibold pb-8 text-center">
              Current month vs Previous month expense
            </h2>

            <LineChart />
          </div>

          {/* Pie Chart Card */}
          <div className="bg-[#f9f9fc] rounded-lg shadow-md px-[24px] py-[40px]   w-full">
            {/* Add your Pie Chart component here */}
            <h2 className="font-semibold pb-8 text-center">
              Monthly Expense Ratio
            </h2>
            <PieChartPage />
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
