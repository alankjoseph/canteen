
export default function Card({ cardItem }) {
 
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-6 grid sm:grid-cols-1 lg:flex md:grid-cols-2  lg:flex-row">
      {cardItem.map((item, index) => (
        <div
          key={index}
          className="bg-[#f9f9fc] rounded-lg shadow-md px-[24px] py-[40px] m-4 max-w-xs w-full md:mx-auto"
        >
          <p className="text-[24px] font-bold">{item.value}</p>
          <h2 className="text-[16px] text-gray-500 font-medium">{item.name}</h2>
        </div>
      ))}
    </div>
  );
}
