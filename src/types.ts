export type CollegeApp = {
  id: number;
  GREScore: number;
  TOEFLScore: number;
  universityRank: number;
  SOPstrength: number;
  LORstrength: number;
  GPA: number;
  researchExp: boolean;
  chance: number;
};

export type NNTrainData = {
  GREScore: number;
  TOEFLScore: number;
  universityRank: number;
  SOPstrength: number;
  LORstrength: number;
  GPA: number;
  researchExp: number;
};
