"use client";
import Header from "@/app/components/header";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
export default function Page() {
  const [items, setItems] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const fetchItems = async () => {
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/orders/today?user_id=" +
        user_id,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setItems(res.data);
    setIsLoading(false)
    console.log(res.data);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="min-h-full">
      <main className="mx-32 my-10">
        <h2 className="my-6 text-3xl font-bold">Order History</h2>
        <Link href={"/place-order"}>
          <button className="bg-[#1162a8] hover:bg-[#4078a8] tracking-widest  text-white font-bold py-2 px-4 border border-blue-700 rounded  ">
            Order Food
          </button>
        </Link>
        { isLoading ? <Spinner/> :
        items.length == 0 ? (
          <p className="text-center text-5xl font-semibold">
          { " You haven't ordered any items for today"}
          </p>
        ) : (
          <div className="relative overflow-x-auto my-4">
            <table className="w-full text-sm text-left text-black border border-collapse border-gray-700">
              <thead className="text-xs text-black uppercase bg-[#c3edfa]">
                <tr>
                  <th scope="col" className="px-6 py-3 border border-gray-500">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-500">
                    Session
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-500">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-500">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-500">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-green-100 text-black">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border border-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 border border-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 border border-gray-500">
                      {item.items[0].items.name}
                    </td>
                    <td className="px-6 py-4 border border-gray-500">
                      {item.items[0].items.price}
                    </td>
                    <td className="px-6 py-4 border border-gray-500">
                      {item.items[0].quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
