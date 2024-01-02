"use client";
import Spinner from "@/app/components/spinner";
import Table from "@/app/components/table";
import axios from "axios";
import { useEffect, useState } from "react";
export default function page() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableHead = [
    "Order ID",
    "User ID",
    "Date",
    "Category",
    "Status",
    "Action",
  ];

  const openDetails = (id) => {
    console.log(id);
    setIsModalOpen(true);
  };
  const fetchOrders = async () => {
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/orders",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status == 200) {
      setIsLoading(false);
      const extractedData = res.data.map((item) => {
        const { id, user_id, category, date, status } = item;
        return { id, user_id, category, date, status };
      });
      setOrders(extractedData);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=" relative overflow-x-auto my-10 mx-32 ">
          <h1 className="text-3xl font-bold my-5">{"Today's Order"}</h1>
          <table className="w-full text-sm text-left text-black border border-collapse border-gray-700">
            <thead className="text-xs text-black uppercase bg-[#c3edfa]">
              <tr>
                {tableHead.map((title, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 border border-gray-500"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-green-100 text-black">
              {orders.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border border-gray-500">{row.id}</td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.user_id}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.status}
                  </td>
                  <td className="px-6 py-4 border border-gray-500 ">
                    <button
                      className="bg-green-500 text-black px-4 py-2 rounded-md mx-2"
                      onClick={() => openDetails(row.id)}
                    >
                      {"Details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg w-[400px] relative">
                <button
                  onClick={() => setIsModalOpen(false)} // Close the modal when clicked
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-lg font-bold mb-4">This is a modal</h2>
                {/* Additional content for the modal */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
