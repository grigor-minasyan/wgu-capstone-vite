import { createContext, type ReactNode } from "react";
import * as tf from "@tensorflow/tfjs";

export const MLModelContext = createContext(tf.sequential());

export const MLModelProvider = ({ children }: { children: ReactNode }) => {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 16, activation: "sigmoid", inputShape: [7] })
  );
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });

  return (
    <MLModelContext.Provider value={model}>{children}</MLModelContext.Provider>
  );
};
