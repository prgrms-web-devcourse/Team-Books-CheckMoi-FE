export interface ResponseApplicantsType {
  appliers: {
    id: number;
    name: string;
    email: string;
    image: string;
    temperature: number;
  }[];
}

export interface ApplicantsType {
  id: number;
  name: string;
  email: string;
  image: string;
  temperature: number;
}
