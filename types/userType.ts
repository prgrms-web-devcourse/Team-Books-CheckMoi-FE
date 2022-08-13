export interface UserType {
  id: number;
  name: string;
  email: string;
  image: string;
  temperature: number;
}

interface SimpleStudyType {
  id: number;
  name: string;
  thumbnail: string;
}

export interface TopbarUserType extends UserType {
  studies: SimpleStudyType[];
}
