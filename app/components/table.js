import { useState } from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  
  head: {
    style: {
      fontWeight: "bold", // Make the header cells bold
      fontSize: "14px", // Increase the font size for the header cells
      borderBottum: "1px solid #ccc", // Add a gray bottom border to header cells
    },
  },
  
};

export default function Table({columns,data}) {
  const [search, setSearch] = useState('')
  const onChangeHandler = (e)=>{
    setSearch(e.target.value)
  }
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      customStyles={customStyles}
      highlightOnHover
      fixedHeader
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search"
          className="shadow appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
          value={search}
          onChange={(e)=>onChangeHandler(e)}
        />
      }
    />
  );
}
