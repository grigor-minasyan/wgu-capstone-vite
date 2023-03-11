import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
  MAX_GPA,
  MAX_GRE_SCORE,
  MAX_LOR,
  MAX_SOP,
  MAX_TOEFL_SCORE,
  MAX_UNI_RANK,
} from "../utils/constants";
import { useAppState } from "../store/store";
import { SliderWithLabel, SwitchWithLabel } from "./Inputs";
import { MLModelContext } from "./MLModelContext";
import { useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import { collegeAppToTrainingData } from "../utils";

export default function RunApplicationData() {
  const model = useContext(MLModelContext);
  const predictedChance = useAppState((state) => state.predictedChance);
  const setPredictedChance = useAppState((state) => state.setPredictedChance);
  const sliders = useAppState((state) => state.sliders);
  const setSliders = useAppState((state) => state.setSlider);
  const handleSetSlider = (
    key: keyof typeof sliders,
    value: number | number[]
  ) => {
    setSliders(key, value);
    const newChances = model.predict(
      tf.tensor2d([
        collegeAppToTrainingData({
          ...sliders,
          id: 1,
          chance: 0,
          researchExp: Boolean(sliders.researchExp),
        }),
      ])
    );

    if (!Array.isArray(newChances)) {
      setPredictedChance(newChances.dataSync()[0]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SliderWithLabel
            label={"GRE Score"}
            max={MAX_GRE_SCORE}
            value={sliders.GREScore}
            onChange={(_event, newValue) =>
              handleSetSlider("GREScore", newValue)
            }
          />
          <SliderWithLabel
            label={"TOEFL Score"}
            max={MAX_TOEFL_SCORE}
            value={sliders.TOEFLScore}
            onChange={(_event, newValue) =>
              handleSetSlider("TOEFLScore", newValue)
            }
          />
          <SliderWithLabel
            label={"University rank"}
            max={MAX_UNI_RANK}
            value={sliders.universityRank}
            onChange={(_event, newValue) =>
              handleSetSlider("universityRank", newValue)
            }
          />
          <SliderWithLabel
            label={"Statement of purpose strength"}
            max={MAX_SOP}
            value={sliders.SOPstrength}
            onChange={(_event, newValue) =>
              handleSetSlider("SOPstrength", newValue)
            }
          />
          <SliderWithLabel
            label={"Letter of recommendation strength"}
            max={MAX_LOR}
            value={sliders.LORstrength}
            onChange={(_event, newValue) =>
              handleSetSlider("LORstrength", newValue)
            }
          />
          <SliderWithLabel
            label={"GPA (out of 10)"}
            max={MAX_GPA}
            value={sliders.GPA}
            onChange={(_event, newValue) => handleSetSlider("GPA", newValue)}
            step={0.1}
          />
          <SwitchWithLabel
            label={"Research experience"}
            value={Boolean(sliders.researchExp)}
            onChange={(_event, newValue) =>
              handleSetSlider("researchExp", Number(newValue))
            }
          />
        </Grid>
        <Grid
          container
          item
          xs={6}
          alignItems={"center"}
          justifyContent="center"
        >
          <Paper sx={{ p: 2, m: 4, width: "100%" }}>
            <Typography variant="h4" align="center">
              Chance of admission
            </Typography>
            <Typography variant="body1" align="center">
              Based on the input on the, the model predicts that your chances of
              admission are:
            </Typography>
            <Typography variant="h2" align="center">
              {(predictedChance * 100).toFixed(2) + "%"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
