import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { initialCollegeApps } from "./initialCollegeApps";
import { CollegeApp } from "../types";

interface AppState {
  collegeApps: CollegeApp[];
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        collegeApps: initialCollegeApps,
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
