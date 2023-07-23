import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getBookWiseCheckoutData } from "../../../Utils/AdminApis";

function BookGraph() {
  const [bookData, setBookData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getBookWiseCheckoutData();
      if (response.data.bookData) {
        setBookData(response.data.bookData);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
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
    labels: bookData.map((data) => data.bookTitle),
    datasets: [
      {
        label: "No.of checkouts",
        data: bookData.map(data => data.count),
        backgroundColor: generateColors(bookData.length),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
        title: {
          display: true,
          text: "Count of Checkouts",
          color : 'white'
        },
      },
      x: {
        title: {
          display: true,
          text: "Book Title",
          color : 'white'
        },
        ticks: {
          maxRotation: 90, // Set maxRotation to 0 to prevent labels from rotating
          minRotation: 90, // Set minRotation to 0 to prevent labels from rotating
          autoSkip: true, // Enable autoSkip to automatically hide overlapping labels
        },
      },
    },
  };

  return (
    <div className="lg:w-full lg:h-full">
      <Bar options={options} data={data} />
    </div>
  );
}

export default BookGraph;
