import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import { useAppState } from "../store/store";
import { collegeAppToTrainingData } from "../utils";

export default function ML() {
  const collegeApps = useAppState((state) => state.collegeApps);
  console.time("ML");
  const tx = tf.tensor2d(collegeApps.map(collegeAppToTrainingData));
  const ty = tf.tensor(collegeApps.map((c) => c.chance));
  tx.print();
  ty.print();
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      inputShape: [tx.shape[1]],
      units: tx.shape[1],
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 1,
      activation: "softmax",
    })
  );
  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });
  console.timeEnd("ML");

  const onTrain = async () => {
    console.log("Training ML");
    await model.fit(tx, ty, {
      shuffle: true,
      epochs: 20,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log("Epoch " + epoch);
          console.log("Loss: " + logs?.loss + " accuracy: " + logs?.acc);
        },
      },
    });

    console.log("Training ML end");
  };

  return (
    <Box sx={{ width: "100%", my: 2, py: 2 }}>
      <Button onClick={onTrain} variant="contained">
        Train ML
      </Button>
    </Box>
  );
}
