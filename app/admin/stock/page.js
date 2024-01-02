"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/app/components/spinner";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });
  const { itemName, price, category, quantity } = itemDetails;
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableHead = [
    "Item ID",
    "Name",
    "session",
    "Quantity",
    "Price",
    "Action",
  ];
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  const fetchItems = async () => {
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/items",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setItem(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/items",
      itemDetails,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if(res.status==200){
      fetchItems()
      setItemDetails({
        name: "",
        price: "",
        category: "",
        quantity: "",
      });
      toggleModal();
    }
    
    
    
  };
  const onChangeHandler = (e)=>{
    const {name , value} = e.target
    setItemDetails({...itemDetails, [name]:value})
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
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
                <form onSubmit={handleAddItem}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-1">
                      Item Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={itemName}
                      onChange={(e) => onChangeHandler(e)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="category" className="block mb-1">
                      Category:
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => onChangeHandler(e)}
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
                      name="quantity"
                      value={quantity}
                      onChange={(e) => onChangeHandler(e)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="block mb-1">
                      Price:
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={price}
                      onChange={(e) => onChangeHandler(e)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
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
              {item.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border border-gray-500">{row.id}</td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.quantity}
                  </td>
                  <td className="px-6 py-4 border border-gray-500">
                    {row.price}
                  </td>
                  <td className="px-6 py-4 border border-gray-500 ">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md w-24 "
                      onClick={() => handleCancel(row.id)}
                    >
                      {"Delete"}
                    </button>
                    <button
                      className="bg-yellow-500 text-black px-4 py-2 w-24 rounded-md mx-2"
                      onClick={() => handleEdit(row.id)}
                    >
                      {"Edit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Page;
