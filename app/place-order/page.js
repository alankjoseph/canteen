"use client";
import { useState } from "react";
import Header from "@/app/components/header";
import Table from "@/app/components/table";

import {useDispatch} from "react-redux"
import { addItem } from "../features/cart/cartSlice";

export default function PlaceOrder() {

  const dispatch = useDispatch()

  const [buttonClick, setbuttonClick] = useState(false);
  const [item, setItem] = useState('')
  const sessions = ["--- Select One ---", "BreakFast", "Lunch", "Dinner"];
  
  const clickHandler = (e) => {
    e.preventDefault();
    setbuttonClick(!buttonClick);
  };

  const addItemToCart = (item)=>{
    
    dispatch(addItem(item))
   
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Item",
      selector: (row) => row.Item,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      sortable: true,
    },
    {
      name: "Availability",
      selector: (row) => row.Availability,
      sortable: true,
    },
    
    {
      name: "Action",
      cell: (row) => (
        <button className="bg-[#f2c138] h-8 w-14 text-base text-white font-semibold rounded" onClick={()=>addItemToCart(row.Item)}>
          Add
        </button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      Item: "Rice and curry",
      Price: "30",
      Availability: "10",
      Quantity: "1",
    },
    {
      id: 2,
      Item: "Ayala Fry",
      Price: "40",
      Availability: "10",
      Quantity: "1",
    },
  ];
  return (
    <div className="min-h-full">
      <main className="mx-32 my-10">
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
          <form className="space-y-4 ">
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="session"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Session:
              </label>
              <select
                id="session"
                name="session"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {sessions.map((session, index) => (
                  <option key={index} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                onClick={clickHandler}
                className="bg-[#1162a8] hover:bg-[#4078a8] text-white font-bold py-2 px-4 border border-blue-700 rounded  w-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="pl-[10%] pr-[10%] my-10">
          {buttonClick && <Table columns={columns} data={data} />}
        </div>
      </main>
    </div>
  );
}
