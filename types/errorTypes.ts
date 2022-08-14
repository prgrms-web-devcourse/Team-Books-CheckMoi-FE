import type { AxiosError } from "axios";

interface ErrorType {
  message: string;
}

export interface ErrorDataType {
  errors: ErrorType[];
}

export type ErrorResponseType = AxiosError<ErrorDataType>;
