import { useEffect } from "react";
import { Chart } from "chart.js";

function Piechart() {
  useEffect(() => {
    var ctx = document.getElementById("pieChart").getContext("2d");
    var pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Breakfast", "Lunch", "Dinner"],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#7bb6dd", "#71d1bd", "#b97ff0"],
          },
        ],
      },
      options: {
        title: {
          text: "Pie Chart",
        },
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    });
  });

  return (
    <>
      <canvas id="pieChart"></canvas>
    </>
  );
}

export default Piechart;
