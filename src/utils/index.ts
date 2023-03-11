import { CollegeApp } from "../types";
import {
  MAX_GPA,
  MAX_GRE_SCORE,
  MAX_LOR,
  MAX_SOP,
  MAX_TOEFL_SCORE,
  MAX_UNI_RANK,
} from "./constants";

export const collegeAppToTrainingData = (collegeApp: CollegeApp) => [
  collegeApp.GREScore / MAX_GRE_SCORE,
  collegeApp.TOEFLScore / MAX_TOEFL_SCORE,
  collegeApp.universityRank / MAX_UNI_RANK,
  collegeApp.SOPstrength / MAX_SOP,
  collegeApp.LORstrength / MAX_LOR,
  collegeApp.GPA / MAX_GPA,
  +collegeApp.researchExp,
];
