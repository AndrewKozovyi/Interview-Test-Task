import { FormControl } from "@angular/forms";

export interface Skill {
  skill: string;
  yearExperience: number;
}

export interface SkillFormGroup {
  skill: FormControl<string | null>;
  yearExperience: FormControl<number | null>;
}
