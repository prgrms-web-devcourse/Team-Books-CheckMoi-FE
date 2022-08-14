import { UserType } from "./userType";

export interface ApplicantsType {
  id: number;
  name: string;
  email: string;
  image: string;
  temperature: number;
}
export interface ResponseApplicantsType {
  appliers: ApplicantsType[];
}

export interface ResponseApplicantMemberType {
  members: {
    id: number;
    user: UserType;
  }[];
}

export interface ApplicantMemberType {
  id: number;
  user: UserType;
}
