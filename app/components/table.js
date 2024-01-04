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

export default function Table({columns,data }) {
  
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      customStyles={customStyles}
      highlightOnHover
      fixedHeader
      
    />
  );
}
