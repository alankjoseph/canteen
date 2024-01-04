"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner";
import { TrashIcon } from "@heroicons/react/24/outline";

function Cart() {
  const router = useRouter();
  const cartStore = useSelector((state) => state.cartStore);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("");

  const [quantity, setQuantity] = useState(1);
  const fetchItems = async () => {
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/cart?user_id=" +
        userId,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setCartItems(res.data);
    setIsLoading(false);
  };
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (userId) {
      fetchItems();
    }
  }, [userId]);
  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(cartItems);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateQuantity(cartItems);
  };
  const updateQuantity = async (data) => {
    const res = await axios.put(
      `https://lionfish-app-bihwo.ondigitalocean.app/api/cart`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
  };
  useEffect(() => {
    // Calculate total cost when cartItems change
    let sum = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalCost(sum);
    setTax(sum * 0.05);
  }, [cartItems]);
  const handleDelete = async (id) => {
    console.log(id);
    const userId = localStorage.getItem("userId");
    const res = await axios.delete(
      `https://lionfish-app-bihwo.ondigitalocean.app/api/cart?user_id=${userId}&item_id=${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    fetchItems();
  };

  const handleCheckout = async () => {
    const data = [];
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/cart/checkout?user_id=" +
        userId,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setRedirectUrl(res.data.url);

    router.push(res.data.url);
  };
  return (
    <div className="min-h-full">
      <main className="mx-32 my-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart </h1>

          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {cartItems.length == 0 ? (
                <div>
                  <div className="flex justify-center">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                      alt=""
                    />
                  </div>
                  <div className="flex  justify-center">
                    <p className="text-3xl text-center items-center mr-4">
                      Cart is Empty
                    </p>
                    <Link href={"/place-order"}>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                      >
                        Add item
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left font-semibold">Item</th>
                            <th className="text-left font-semibold">Price</th>
                            <th className="text-left font-semibold w-[200px]">
                              Quantity
                            </th>
                            <th className="text-left font-semibold">Delete</th>
                            <th className="text-left font-semibold">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="py-4">
                                <div className="flex items-center">
                                  <span className="font-semibold">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4">₹{item.price}</td>
                              <td className="py-4">
                                <div className="flex items-center">
                                  <button
                                    className="border rounded-md py-2 px-4 mr-2"
                                    onClick={() => handleDecrement(item.id)}
                                  >
                                    -
                                  </button>
                                  <span className="text-center w-8">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="border rounded-md py-2 px-4 ml-2"
                                    onClick={() => handleIncrement(item.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td
                                className="py-4"
                                onClick={() => handleDelete(item.item_id)}
                              >
                                <TrashIcon height={"20px"} />
                              </td>
                              <td className="py-4">
                                ₹{item.price * item.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-lg font-semibold mb-4">Summary</h2>
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{totalCost}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>

                      <hr className="my-2" />
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                          ₹{(totalCost + tax).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;
