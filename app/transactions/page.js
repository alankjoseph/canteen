"use client";
import Header from "@/app/components/header";
import Table from "@/app/components/table";
import { useState } from "react";
const columns = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Outlet",
    selector: (row) => row.outlet,
    sortable: true,
  },
  {
    name: "Session",
    selector: (row) => row.session,
    sortable: true,
  },
  {
    name: "Ordered by",
    selector: (row) => row.ordered,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    date: "Beetlejuice",
    outlet: "1988",
    session: "Lunch",
    ordered: "You",
    amount: 34,
  },
  {
    id: 1,
    date: "Beetlejuice",
    outlet: "1988",
    session: "Lunch",
    ordered: "You",
    amount: 34,
  },
];
export default function Page() {
  const [buttonClick, setButtonClick] = useState(false);
  const [error, setError]=useState('')
  const [transactionDetails, setTransactionDetails] = useState({
    from:"",
    to:""
  })
  const {from, to} = transactionDetails
  const clickHandler = (e) => {
    e.preventDefault();
    if(from.length==0 || to.length==0){
      setError("Must fill all the field")
      return
    }else{
      setError('')
    }
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
                id="date"
                name="from"
                value={from}
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
                id="date"
                name="to"
                value={to}
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
          {buttonClick && <Table columns={columns} data={data} />}
        </div>
      </main>
    </div>
  );
}
