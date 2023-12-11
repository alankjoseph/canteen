import DataTable from "react-data-table-component";

// const columns = [
//   {
//     name: "Date",
//     selector: (row) => row.date,
//     sortable: true,
//   },
//   {
//     name: "Outlet",
//     selector: (row) => row.outlet,
//     sortable: true,
//   },
//   {
//     name: "Session",
//     selector: (row) => row.session,
//     sortable: true,
//   },
//   {
//     name: "Ordered by",
//     selector: (row) => row.ordered,
//     sortable: true,
//   },
//   {
//     name: "Amount",
//     selector: (row) => row.amount,
//     sortable: true,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     date: "Beetlejuice",
//     outlet: "1988",
//     session: "Lunch",
//     ordered: "You",
//     amount: 34,
//   },
//   {
//     id: 1,
//     date: "Beetlejuice",
//     outlet: "1988",
//     session: "Lunch",
//     ordered: "You",
//     amount: 34,
//   },
// ];
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
          value={""}
        />
      }
    />
  );
}
