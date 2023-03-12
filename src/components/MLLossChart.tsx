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
} from "chart.js";
import { useAppState } from "../store/store";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MLLossChart() {
  const MLLoss = useAppState((state) => state.MLLoss);
  const MLEpoch = useAppState((state) => state.MLEpoch);
  const min = Math.min(...MLLoss);
  const max = Math.max(...MLLoss);
  return (
    <Line
      data={{
        labels: MLEpoch,
        datasets: [
          {
            label: "Loss",
            data: MLLoss,
            fill: false,
            tension: 0.4,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "ML epoch vs loss chart (lower is better)",
          },
        },
        interaction: { intersect: false },
        scales: {
          x: {
            display: true,
            title: { display: true, text: "Epoch" },
          },
          y: {
            display: true,
            title: { display: true, text: "Loss" },
            suggestedMin: min,
            suggestedMax: max,
          },
        },
      }}
    />
  );
}
