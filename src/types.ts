type BaseApplication = {
  GREScore: number;
  TOEFLScore: number;
  universityRank: number;
  SOPstrength: number;
  LORstrength: number;
  GPA: number;
};

export type NNTrainData = BaseApplication & {
  researchExp: number;
};

export type CollegeApp = BaseApplication & {
  id: number;
  chance: number;
  researchExp: boolean;
};
