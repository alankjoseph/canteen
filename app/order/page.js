"use client";
import Header from "@/app/components/header";
import Link from "next/link";
export default function Page() {
  return (
    <div className="min-h-full">
      <main className="mx-32 my-10">
        <h2 className="my-6 text-3xl font-bold">Order History</h2>
        <Link href={"/place-order"}>
          <button className="bg-[#1162a8] hover:bg-[#4078a8] tracking-widest text-white font-bold py-2 px-4 border border-blue-700 rounded  ">
            Order Food
          </button>
        </Link>
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
                  Outlet
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-500">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-green-100 text-black">
              <tr>
                <td className="px-6 py-4 border border-gray-500">Black</td>
                <td className="px-6 py-4 border border-gray-500">Silver</td>
                <td className="px-6 py-4 border border-gray-500">Laptop</td>
                <td className="px-6 py-4 border border-gray-500">$2999</td>
                <td className="px-6 py-4 border border-gray-500">Laptop</td>
                <td className="px-6 py-4 border border-gray-500">$2999</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border border-gray-500">Black</td>
                <td className="px-6 py-4 border border-gray-500">White</td>
                <td className="px-6 py-4 border border-gray-500">Laptop PC</td>
                <td className="px-6 py-4 border border-gray-500">$1999</td>
                <td className="px-6 py-4 border border-gray-500">Laptop</td>
                <td className="px-6 py-4 border border-gray-500">$2999</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border border-gray-500">Black</td>
                <td className="px-6 py-4 border border-gray-500">Black</td>
                <td className="px-6 py-4 border border-gray-500">
                  Accessories
                </td>
                <td className="px-6 py-4 border border-gray-500">$99</td>
                <td className="px-6 py-4 border border-gray-500">Laptop</td>
                <td className="px-6 py-4 border border-gray-500">$2999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
