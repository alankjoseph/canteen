"use client";
import React, { useState } from "react";
const tableHead = ["Item ID", "Name", "Quantity", "Price", "Action"];
const tableRow = [
  {
    itemId: "1323432",
    itemName: "Chapathi and curry",
    quantity: "Breakfast",
    price: "23",
  },
  {
    itemId: "2323732",
    itemName: "Rice and curry",
    quantity: "Lunch",
    price: "23",
  },
  {
    itemId: "6323432",
    itemName: "Vila kutty",
    quantity: "Dinner",
    price: "23",
  },
];
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddItem = () => {
    console.log({ itemName, quantity, price });

    setItemName("");
    setQuantity(0);
    setPrice(0);

    toggleModal();
  };
  const handleCloseModal = () => {
    toggleModal();
  };

  return (
    <div className=" relative overflow-x-auto my-10 mx-32 ">
      <h1 className="text-2xl font-bold my-5">{"Stock Management"}</h1>
      <button
        type="button"
        className="focus:outline-none float-right text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={toggleModal}
      >
        Add Item
      </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Item</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="itemName" className="block mb-1">
                  Item Name:
                </label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block mb-1">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-1">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 w-32 rounded-md mr-2"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 w-32 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
          {tableRow.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 border border-gray-500">{row.itemId}</td>
              <td className="px-6 py-4 border border-gray-500">
                {row.itemName}
              </td>
              <td className="px-6 py-4 border border-gray-500">
                {row.quantity}
              </td>
              <td className="px-6 py-4 border border-gray-500">{row.price}</td>
              <td className="px-6 py-4 border border-gray-500 ">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md w-24 "
                  onClick={() => handleCancel(row.orderID)}
                >
                  {"Delete"}
                </button>
                <button
                  className="bg-yellow-500 text-black px-4 py-2 w-24 rounded-md mx-2"
                  onClick={() => handleEdit(row.orderID)}
                >
                  {"Edit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
