import { UserType } from "./userType";

export interface ResponseApplicantsType {
  appliers: {
    id: number;
    name: string;
    email: string;
    image: string;
    temperature: number;
  }[];
}

export interface ResponseApplicantMemberType {
  members: {
    member: {
      id: number;
      user: UserType; // id, name, email, image, temperature
    }[];
  };
}

export interface ApplicantsType {
  id: number;
  name: string;
  email: string;
  image: string;
  temperature: number;
}

export interface ApplicantMemberType {
  id: number;
  user: UserType;
}
