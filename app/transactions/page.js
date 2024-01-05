"use client";
import Header from "@/app/components/header";
import Table from "@/app/components/table";
import axios from "axios";
import { useState } from "react";
import Spinner from "../components/spinner";
const columns = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: "Item",
    selector: (row) => row.item,
    
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
];

export default function Page() {
  const [buttonClick, setButtonClick] = useState(false);
  const [error, setError]=useState('')
  const [items, setItems] = useState([])
  const [isLoading,setIsLoading]= useState(true)
  const [transactionDetails, setTransactionDetails] = useState({
    start_date:"",
    end_date:""
  })
  console.log(transactionDetails);
  const {start_date, end_date} = transactionDetails
  const fetchTransaction =async()=>{
    const data = {
      start_date:start_date,
      end_date: end_date,
      user_id:localStorage.getItem("userId")
    }
    try {
      const res = await axios.post("https://lionfish-app-bihwo.ondigitalocean.app/api/orders/transactions",data,{
        headers:{
          Authorization: localStorage.getItem("token")
        }
      })
      setItems(res.data)
      setIsLoading(false)
    } catch (error) {
      
    }
  }

  
  const clickHandler = (e) => {
    e.preventDefault();
    if(start_date.length==0 || end_date.length==0){
      setError("Must fill all the field")
      return
    }else{
      setError('')
    }
    fetchTransaction()
    setButtonClick(!buttonClick);
  };
  const onInputChange = (e)=>{
    const { name, value } = e.target;
    setTransactionDetails({ ...transactionDetails, [name]: value })
  }
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
                From Date:
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={start_date}
                onChange={(e)=>onInputChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                To Date:
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={end_date}
                onChange={(e)=>onInputChange(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
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
        <div className="pl-[10%] pr-[10%] my-10">
          {items.length >0 && <Table columns={columns} data={items} />}
        </div>
      </main>
    </div>
  );
}
