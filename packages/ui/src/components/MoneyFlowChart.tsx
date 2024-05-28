"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
);


export default function MoneyflowChart({chartData}:{chartData:number[]}){
    const options = {
        responsive:true,
        maintainAspectRatio: false,
        scales:{
                x:{
                    grid:{
                        drawOnChartArea:false
                    }
                },
                y:{
                    grid:{
                        drawOnChartArea:false
                    }
                }
        },
        plugins:{
            legend:{
                display:false
            }
        }

    };

    const data = {
      labels: ["Now", "2-Min", "5-Min", "10-Min", "15-Min", "20-Min"],
  
      datasets: [
        {
          label: "Balance",
          data: chartData,
          tension: 0.3,
          
          borderColor: '#004852',
      backgroundColor: '#ccdadc',
      pointBackgroundColor:"#e3ff57",
      fill:true,
      pointRadius:6
          
         
        },
      ],
    };

    return (
        <Line options={options} data={data} />
    )
}