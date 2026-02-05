
export interface PlannerField {
  label: string;
  value: string;
  key: string;
}

export interface PlannerSection {
  id: number;
  title: string;
  fields: PlannerField[];
}

export interface BeautyPlannerData {
  clientName: string;
  cosmetologistName: string;
  sections: PlannerSection[];
}
