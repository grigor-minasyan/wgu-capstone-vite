import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import * as tf from "@tensorflow/tfjs";
import { useContext, useState } from "react";
import { useAppState } from "../store/store";
import { collegeAppToTrainingData } from "../utils";
import { MAX_EPOCH } from "../utils/constants";
import { MLModelContext } from "./MLModelContext";
import MLLossChart from "./MLLossChart";

export default function ML() {
  const model = useContext(MLModelContext);

  const addMLLoss = useAppState((state) => state.addMLLoss);
  const addMLEpoch = useAppState((state) => state.addMLEpoch);

  const [isTraied, setIsTrained] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingPercentage, setTrainingPercentage] = useState(0);
  const mlLoss = useAppState((state) =>
    state.MLLoss.length ? state.MLLoss[state.MLLoss.length - 1] : 0
  );

  const collegeApps = useAppState((state) => state.collegeApps);
  const xs = tf.tensor2d(collegeApps.map(collegeAppToTrainingData));
  const ys = tf.tensor2d(collegeApps.map((c) => [c.chance]));

  // const [xTrain, xTest] = tf.split(xs, 2);
  // const [yTrain, yTest] = tf.split(ys, 2);

  const onTrain = async () => {
    setIsTraining(true);
    setIsTrained(true);
    setTrainingPercentage(0);
    // await model.fit(xTrain, yTrain, {
    await model.fit(xs, ys, {
      epochs: MAX_EPOCH,
      // validationData: [xTest, yTest],
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          setTrainingPercentage(Math.round(((epoch + 1) / MAX_EPOCH) * 100));
          addMLLoss(logs?.loss || 0);
          addMLEpoch();
        },
      },
    });

    setIsTraining(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          my: 2,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onTrain} variant="contained">
          Train ML
        </Button>
        <Alert sx={{ width: "300px" }} severity="info">
          {!isTraied
            ? "Model is not trained yet"
            : isTraining
            ? `Training... ${trainingPercentage}%`
            : "Model is trained"}
        </Alert>
        <Alert sx={{ width: "300px" }} severity="info">
          {!mlLoss
            ? "Train to see ML loss"
            : `ML Loss: ${(mlLoss * 100).toFixed(2)}%`}
        </Alert>
      </Box>
      <Box>
        {isTraining && (
          <LinearProgress variant="determinate" value={trainingPercentage} />
        )}
      </Box>
      <Box>
        <MLLossChart />
      </Box>
    </>
  );
}
