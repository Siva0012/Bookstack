import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

import { getMembershipData } from "../../../Utils/AdminApis";

function MembershipGraph() {
  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    getMembershipData().then((response) => {
      if (response.data.memberShipData) {
            const data = response.data.memberShipData;
        setMembershipData(data);
      }
});
}, []);

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
        label: "No.of membership",
        data: membershipData.map(data => data.count),
        backgroundColor: generateColors(membershipData.length),
        borderColor: "rgba(256,256,256,.5)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="lg:w-[320px] lg:h-[320px]">
      {membershipData && <Pie data={data} />}
    </div>
  );
}

export default MembershipGraph;
