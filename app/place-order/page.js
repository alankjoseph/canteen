"use client";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Table from "@/app/components/table";

import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import axios from "axios";
import Spinner from "../components/spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceOrder() {
  const dispatch = useDispatch();

  const [buttonClick, setbuttonClick] = useState(false);
  const [error, setError] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [addItem, setAddItem] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    date: "",
    category: "",
  });
  const { date, category } = orderDetails;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const fetchItems = async () => {
    const res = await axios.get(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/items/category/" +
        category.toLowerCase(),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setItemDetails(res.data);
    setIsLoading(false);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if (date.length == 0 || category.length == 0) {
      setError("Must fill all the field");
      return;
    } else {
      setError("");
    }
    fetchItems();
    setbuttonClick(true);
  };

  const addItemToCart = async (item) => {
    const cartItem = {
      item_id: item.id,
      name: item.name,
      userId: localStorage.getItem("userId"),
      quantity: 1,
      price: item.price,
      category: category,
    };
    const res = await axios.post(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/cart",
      cartItem,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status == 208) {
      toast.warn("Item already exist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(res);
    // const cartItem = {
    //   item_id: itemId,
    //   quantity: 1,
    // };
    // setAddItem((prevItems) => [...prevItems, cartItem]);
    dispatch(addItem(item));
  };

  const placeOrderHandler = async (cartItem) => {
    const item = {
      category: category,
      userId: localStorage.getItem("userId"),
      items: addItem,
    };
    const res = await axios.post(
      "https://lionfish-app-bihwo.ondigitalocean.app/api/orders/add",
      item,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
  };
  useEffect(() => {
    console.log(addItem);
  }, [addItem]);

  const sessions = [
    "--- Select One ---",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Snacks",
  ];

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Item",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Availability",
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          className="bg-[#40f57d] h-8 w-14 text-sm text-black font-normal rounded"
          onClick={() => addItemToCart(row)}
        >
          Add
        </button>
      ),
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
                value={date}
                onChange={(e) => onInputChange(e)}
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
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={category}
                onChange={(e) => onInputChange(e)}
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
              {error && <p className="text-center text-red-500">{error}</p>}
            </div>
          </form>
        </div>
        {buttonClick && (
          <div className="pl-[10%] pr-[10%] my-10">
            {isloading ? (
              <Spinner />
            ) : (
              <>
                {/* <button
                  type="button"
                  onClick={placeOrderHandler}
                  class="float-right text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Place Order
                </button> */}

                <Table columns={columns} data={itemDetails} />
              </>
            )}
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}
