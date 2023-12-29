"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartStore = useSelector((state) => state.cartStore);

  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="min-h-full">
      <main className="mx-32 my-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          {cartStore.length == 0 ? (
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
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
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
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartStore.map((item) => (
                        <tr>
                          <td className="py-4">
                            <div className="flex items-center">
                              <span className="font-semibold">{item.item}</span>
                            </div>
                          </td>
                          <td className="py-4">$19.99</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={handleDecrement}
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {quantity}
                              </span>
                              <button
                                className="border rounded-md py-2 px-4 ml-2"
                                onClick={handleIncrement}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">$19.99</td>
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
                    <span>$19.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$1.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">$21.98</span>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;
