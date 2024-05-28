"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,  plugins,} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend,plugins );


const options = {
    responsive:true,
    maintainAspectRatio: false,
 
    plugins:{
        legend:{
            display:false
        }
    }

};


type Props = {
    totalWalletMoneyAdded: number,
    totalPeerSent:number,
    totalPeerReceived:number
}

export default function ({totalPeerReceived,totalWalletMoneyAdded,totalPeerSent}:Props) {

  if(!(totalPeerReceived || totalWalletMoneyAdded || totalPeerSent)){
    return <div className=" flex justify-center pt-6">
      <p className=" text-muted-foreground">No Data</p>
    </div>
  }

    const data = {
        labels: ["Wallet Add Money", "Peers sent", "Peers Received"],
        datasets: [
          {
            label: "Amount",
            data: [totalWalletMoneyAdded, totalPeerSent, totalPeerReceived],
            backgroundColor: [
              "#004852",
              "#93da9d",
              "#e3ff57",
            ],
          
            borderWidth: 1,
          },
        ],
      };

  return <Pie options={options} data={data} />;
}
