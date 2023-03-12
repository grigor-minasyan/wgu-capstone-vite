import { create } from "zustand";
import { initialCollegeApps } from "./initialCollegeApps";
import { CollegeApp } from "../types";
import {
  MAX_CHART_SIZE,
  MAX_GPA,
  MAX_GRE_SCORE,
  MAX_LOR,
  MAX_SOP,
  MAX_TOEFL_SCORE,
  MAX_UNI_RANK,
} from "../utils/constants";

interface AppState {
  collegeApps: CollegeApp[];
  sliders: {
    GREScore: number;
    TOEFLScore: number;
    universityRank: number;
    SOPstrength: number;
    LORstrength: number;
    GPA: number;
    researchExp: number;
  };
  setSlider: (
    slider: keyof AppState["sliders"],
    value: number | number[]
  ) => void;
  predictedChance: number;
  setPredictedChance: (value: number) => void;
  MLLoss: number[];
  MLEpoch: number[];
  addMLLoss: (value: number) => void;
  addMLEpoch: () => void;
}

export const useAppState = create<AppState>()((set) => ({
  collegeApps: initialCollegeApps,
  sliders: {
    GREScore: Math.round(MAX_GRE_SCORE * 0.8),
    TOEFLScore: Math.round(MAX_TOEFL_SCORE * 0.8),
    universityRank: Math.round(MAX_UNI_RANK * 0.8),
    SOPstrength: Math.round(MAX_SOP * 0.8),
    LORstrength: Math.round(MAX_LOR * 0.8),
    GPA: Math.round(MAX_GPA * 0.8),
    researchExp: 1,
  },
  setSlider: (slider, value) =>
    set((state) => ({
      sliders: { ...state.sliders, [slider]: Number(value) },
    })),
  predictedChance: 0,
  setPredictedChance: (value) => set({ predictedChance: value }),
  MLLoss: [],
  MLEpoch: [],
  addMLLoss: (value) =>
    set((state) => {
      const newArr = [...state.MLLoss, value];
      if (newArr.length > MAX_CHART_SIZE) {
        newArr.shift();
      }
      return { MLLoss: newArr };
    }),
  addMLEpoch: () =>
    set((state) => {
      const newArr = [
        ...state.MLEpoch,
        state.MLEpoch.length ? state.MLEpoch[state.MLEpoch.length - 1] + 1 : 1,
      ];
      if (newArr.length > MAX_CHART_SIZE) {
        newArr.shift();
      }
      return {
        MLEpoch: newArr,
      };
    }),
}));
