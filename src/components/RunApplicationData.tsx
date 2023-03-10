import { type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
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
import { NNTrainData } from "../types";

export default function RunApplicationData() {
  const [sliderStates, setSliderStates] = useState<NNTrainData>({
    GREScore: Math.round(MAX_GRE_SCORE * 0.8),
    TOEFLScore: Math.round(MAX_TOEFL_SCORE * 0.8),
    universityRank: Math.round(MAX_UNI_RANK * 0.8),
    SOPstrength: Math.round(MAX_SOP * 0.8),
    LORstrength: Math.round(MAX_LOR * 0.8),
    GPA: Math.round(MAX_GPA * 0.8),
    researchExp: 1,
  });

  const handleSliderChange = (
    key: keyof NNTrainData,
    newValue: number | number[]
  ) => {
    setSliderStates({
      ...sliderStates,
      [key]: Number(newValue),
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SliderWithLabel
            label={"GRE Score"}
            max={MAX_GRE_SCORE}
            value={sliderStates.GREScore}
            onChange={(_event, newValue) =>
              handleSliderChange("GREScore", newValue)
            }
          />
          <SliderWithLabel
            label={"TOEFL Score"}
            max={MAX_TOEFL_SCORE}
            value={sliderStates.TOEFLScore}
            onChange={(_event, newValue) =>
              handleSliderChange("TOEFLScore", newValue)
            }
          />
          <SliderWithLabel
            label={"University rank"}
            max={MAX_UNI_RANK}
            value={sliderStates.universityRank}
            onChange={(_event, newValue) =>
              handleSliderChange("universityRank", newValue)
            }
          />
          <SliderWithLabel
            label={"Statement of purpose strength"}
            max={MAX_SOP}
            value={sliderStates.SOPstrength}
            onChange={(_event, newValue) =>
              handleSliderChange("SOPstrength", newValue)
            }
          />
          <SliderWithLabel
            label={"Letter of recommendation strength"}
            max={MAX_LOR}
            value={sliderStates.LORstrength}
            onChange={(_event, newValue) =>
              handleSliderChange("LORstrength", newValue)
            }
          />
          <SliderWithLabel
            label={"GPA (out of 10)"}
            max={MAX_GPA}
            value={sliderStates.GPA}
            onChange={(_event, newValue) => handleSliderChange("GPA", newValue)}
            step={0.1}
          />
          <SwitchWithLabel
            label={"Research experience"}
            value={Boolean(sliderStates.researchExp)}
            onChange={(_event, newValue) =>
              handleSliderChange("researchExp", Number(newValue))
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
              {0.87 ? (100 * 0.87).toFixed(2) + "%" : "N/A"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function SliderWithLabel({
  label,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  max: number;
  value: number;
  step?: number;
  onChange?: (event: unknown, value: number | number[]) => void;
}) {
  return (
    <Grid container sx={{ my: 4 }}>
      <Grid item xs={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Slider
          defaultValue={value}
          aria-label="Default"
          valueLabelDisplay="on"
          min={0}
          max={max}
          step={step}
          onChangeCommitted={onChange}
        />
      </Grid>
    </Grid>
  );
}

function SwitchWithLabel({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: boolean) => void;
}) {
  return (
    <Grid container sx={{ my: 4 }}>
      <Grid item xs={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Switch checked={value} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
