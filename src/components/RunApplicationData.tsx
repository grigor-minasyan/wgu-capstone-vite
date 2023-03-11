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

export default function RunApplicationData() {
  const sliders = useAppState((state) => state.sliders);
  const setSliders = useAppState((state) => state.setSlider);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SliderWithLabel
            label={"GRE Score"}
            max={MAX_GRE_SCORE}
            value={sliders.GREScore}
            onChange={(_event, newValue) => setSliders("GREScore", newValue)}
          />
          <SliderWithLabel
            label={"TOEFL Score"}
            max={MAX_TOEFL_SCORE}
            value={sliders.TOEFLScore}
            onChange={(_event, newValue) => setSliders("TOEFLScore", newValue)}
          />
          <SliderWithLabel
            label={"University rank"}
            max={MAX_UNI_RANK}
            value={sliders.universityRank}
            onChange={(_event, newValue) =>
              setSliders("universityRank", newValue)
            }
          />
          <SliderWithLabel
            label={"Statement of purpose strength"}
            max={MAX_SOP}
            value={sliders.SOPstrength}
            onChange={(_event, newValue) => setSliders("SOPstrength", newValue)}
          />
          <SliderWithLabel
            label={"Letter of recommendation strength"}
            max={MAX_LOR}
            value={sliders.LORstrength}
            onChange={(_event, newValue) => setSliders("LORstrength", newValue)}
          />
          <SliderWithLabel
            label={"GPA (out of 10)"}
            max={MAX_GPA}
            value={sliders.GPA}
            onChange={(_event, newValue) => setSliders("GPA", newValue)}
            step={0.1}
          />
          <SwitchWithLabel
            label={"Research experience"}
            value={Boolean(sliders.researchExp)}
            onChange={(_event, newValue) =>
              setSliders("researchExp", Number(newValue))
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
