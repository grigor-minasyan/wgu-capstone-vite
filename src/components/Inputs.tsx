import { type ChangeEvent, useState } from "react";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export function SliderWithLabel({
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
  const [localState, setLocalState] = useState(value);
  return (
    <Grid container sx={{ my: 4 }}>
      <Grid item xs={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Slider
          value={localState}
          aria-label="Default"
          valueLabelDisplay="on"
          min={0}
          max={max}
          step={step}
          onChangeCommitted={onChange}
          onChange={(_e, v) => setLocalState(Number(v))}
        />
      </Grid>
    </Grid>
  );
}

export function SwitchWithLabel({
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
