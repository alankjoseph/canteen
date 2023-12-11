import { useEffect } from "react";
import { Chart } from "chart.js";
function LineChart() {
  let array = [];
  for (let i = 1; i <= 31; i++) {
    array.push(i);
  }
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: array,
        datasets: [
          {
            data: [
              86, 114, 106, 106, 107, 111, 133, 86, 114, 106, 106, 107, 111,
              133, 86, 114, 106, 106, 107, 111, 133,
            ],
            label: "Current month",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false,
          },
          {
            data: [
              70, 90, 44, 60, 133, 86, 114, 106, 106, 107, 111, 133, 86, 83, 90,
              100, 86, 114, 106, 106, 107, 111, 114, 106, 106, 107, 111, 133,
            ],
            label: "Previous month",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            fill: false,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      {/* line chart */}
      <canvas id="myChart"></canvas>
    </>
  );
}

export default LineChart;
