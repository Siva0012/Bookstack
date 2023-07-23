import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut  } from "react-chartjs-2";
import { useState, useEffect } from "react";

//admin APIs
import { getCheckoutData } from "../../../Utils/AdminApis";



function Graph() {
  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    getCheckoutData().then((response) => {
      if (response.data.data) {
        setCategoryCount(response.data.data);
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
        dynamicColors.push(randomColor)
      }
      return dynamicColors
    };

    const catData = {
      labels: categoryCount.map(data => data._id),
      datasets: [
        {
          label: "No.of checkouts",
          data: categoryCount.map(data => data.count),
          backgroundColor: generateColors(categoryCount.length),
          borderColor: 'rgba(256,256,256,.5)',
          borderWidth: 2,
        },
      ],
    };

  return (
      <div className="lg:w-[350px] lg:h-[350px]">
        {categoryCount && <Doughnut data={catData} />}
      </div>
  );
}

export default Graph;
