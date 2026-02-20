export interface FormData {
  parq: {
    q1: string; // problema cardíaco
    q2: string; // dor no peito durante atividade
    q3: string; // dor no peito sem esforço (último mês)
    q4: string; // perda de consciência / tontura
    q5: string; // problema ósseo ou articular
    q6: string; // medicamento para pressão/coração
    q7: string; // outra razão para não atividade física
  };
  personal: {
    fullName: string;
    email: string;
    phone: string;
    age: string;
    height: string;
    weight: string;
    trainingTime: string;
  };
  health: {
    hasHealthIssue: string;
    healthIssueDetail: string;
    hasJointPain: string;
    jointPainDetail: string;
    hasInjuryOrSurgery: string;
    injuryOrSurgeryDetail: string;
    usesSupplements: string;
    supplementsDetail: string;
    weeklyAvailability: string;
    dailyGymTime: string;
    sleepHours: string;
    sleepQuality: string;
    fitnessLevel: string;
    tiredEasily: string;
    discomfortExercise: string;
    discomfortExerciseDetail: string;
    mainGoals: string;
    specificGoal: string;
  };
}

export const initialFormData: FormData = {
  parq: {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  },
  personal: {
    fullName: "",
    email: "",
    phone: "",
    age: "25",
    height: "170",
    weight: "",
    trainingTime: "",
  },
  health: {
    hasHealthIssue: "",
    healthIssueDetail: "",
    hasJointPain: "",
    jointPainDetail: "",
    hasInjuryOrSurgery: "",
    injuryOrSurgeryDetail: "",
    usesSupplements: "",
    supplementsDetail: "",
    weeklyAvailability: "",
    dailyGymTime: "",
    sleepHours: "",
    sleepQuality: "",
    fitnessLevel: "",
    tiredEasily: "",
    discomfortExercise: "",
    discomfortExerciseDetail: "",
    mainGoals: "",
    specificGoal: "",
  },
};
