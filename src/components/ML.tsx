import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as tf from "@tensorflow/tfjs";
import { useAppState } from "../store/store";
import { collegeAppToTrainingData } from "../utils";

export default function ML() {
  const collegeApps = useAppState((state) => state.collegeApps);
  const xs = tf.tensor2d(collegeApps.map(collegeAppToTrainingData));
  const ys = tf.tensor2d(collegeApps.map((c) => [c.chance]));

  const [xTrain, xTest] = tf.split(xs, 2);
  const [yTrain, yTest] = tf.split(ys, 2);

  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 16, activation: "sigmoid", inputShape: [7] })
  );
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });

  const onTrain = async () => {
    await model.fit(xTrain, yTrain, {
      epochs: 30,
      validationData: [xTest, yTest],
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log("Epoch " + epoch + " Loss: " + logs?.loss);
        },
      },
    });

    const loss = model.evaluate(xTest, yTest);
    if (!Array.isArray(loss)) {
      console.log("loss", loss.dataSync()[0].toFixed(4));
    }
    const newChances = model.predict(
      tf.tensor2d([[1, 0.2, 0.1, 0.1, 0.1, 1, 1]])
    );

    if (!Array.isArray(newChances)) {
      console.log(
        `Chances of admission: ${newChances.dataSync()[0].toFixed(4)}`
      );
    }
  };

  return (
    <Box sx={{ width: "100%", my: 2, py: 2 }}>
      <Button onClick={onTrain} variant="contained">
        Train ML
      </Button>
    </Box>
  );
}
