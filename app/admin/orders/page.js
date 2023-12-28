"use client";
import Table from "@/app/components/table";
export default function page() {
  const tableHead = [
    "Order ID",
    "Order Date",
    "Session",
    "Quantity",
    "Price",
    "Status",
    "Action",
  ];
  const tableRow = [
    {
      orderID: "1323432",
      orderDate: "10/12/2023",
      session: "Breakfast",
      quantity: "23",
      price: "299",
      status: "pending",
      action: "Cancel",
    },
    {
      orderID: "2432543",
      orderDate: "10/12/2023",
      session: "Breakfast",
      quantity: "23",
      price: "299",
      status: "pending",
      action: "Cancel",
    },
    {
      orderID: "3432564",
      orderDate: "10/12/2023",
      session: "Breakfast",
      quantity: "23",
      price: "299",
      status: "pending",
      action: "Cancel",
    },
  ];
  const handleCancel = (id) => {
    console.log(id);
  };
  const handleEdit = (id) => {
    
  }
  return (
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
          {tableRow.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 border border-gray-500">
                {row.orderID}
              </td>
              <td className="px-6 py-4 border border-gray-500">
                {row.orderDate}
              </td>
              <td className="px-6 py-4 border border-gray-500">
                {row.session}
              </td>
              <td className="px-6 py-4 border border-gray-500">
                {row.quantity}
              </td>
              <td className="px-6 py-4 border border-gray-500">{row.price}</td>
              <td className="px-6 py-4 border border-gray-500">{row.status}</td>
              <td className="px-6 py-4 border border-gray-500 ">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md "
                  onClick={() => handleCancel(row.orderID)}
                >
                  {row.action}
                </button>
                <button
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md mx-2"
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
