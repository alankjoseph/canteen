"use client"
import React from 'react'
import Card from '@/app/components/card'
import LineChart from '@/app/components/lineChart'
import PieChartPage from "@/app/components/piechart";

export default function page() {
  const items = [
    
    { name: "Today's Transaction", value: "4" },
    { name: "Today's Order", value: "30" },
    { name: "Today's revenue", value: "30" },
  ];
  return (
    <div className="min-h-full">
      <Card cardItem={items} />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6  lg:px-8 md:grid grid-cols-2 h-[500px]   gap-5">
          {/* Line Chart Card */}
          <div className="bg-[#f9f9fc] rounded-lg shadow-md px-[24px] py-[40px]   w-full">
            {/* Add your Line Chart component here */}
            <h2 className="font-semibold pb-8 text-center">
              Current month vs Previous month expense
            </h2>

            <LineChart />
          </div>

          {/* Pie Chart Card */}
          <div className="bg-[#f9f9fc] rounded-lg shadow-md px-[24px] py-[40px]   w-full">
            {/* Add your Pie Chart component here */}
            <h2 className="font-semibold pb-8 text-center">
              Monthly Expense Ratio
            </h2>
            <PieChartPage />
          </div>
        </div>
      </main>
    </div>
  )
}

