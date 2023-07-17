import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

import { getMembershipData } from "../../../Utils/AdminApis";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "Category",
//       data: [15, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

function MembershipGraph() {
  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    getMembershipData().then((response) => {
      if (response.data.memberShipData) {
            const data = response.data.memberShipData;
            console.log(data , "alsdjfaopdsijfpsdoij");
        setMembershipData(data);
      }
});
}, []);
console.log("data" ,membershipData);

  const generateColors = (count) => {
    const dynamicColors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.9)`;
      dynamicColors.push(randomColor);
    }
    return dynamicColors;
  };

  const data = {
    labels: membershipData.map(data => data._id.charAt(0).toUpperCase() + data._id.slice(1)),
    datasets: [
      {
        label: "Membership type",
        data: membershipData.map(data => data.count),
        backgroundColor: generateColors(membershipData.length),
        borderColor: "rgba(256,256,256,.5)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lg:w-[350px] lg:h-[350px]">
      {membershipData && <Pie data={data} />}
    </div>
  );
}

export default MembershipGraph;
