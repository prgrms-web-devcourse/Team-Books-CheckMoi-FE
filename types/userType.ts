export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string;
  temperature: number;
}

interface SimpleStudyType {
  id: string;
  name: string;
  thumbnail: string;
}

export interface TopbarUserType extends UserType {
  studies: SimpleStudyType[];
}
