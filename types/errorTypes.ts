import type { AxiosError } from "axios";

interface ErrorType {
  message: string;
}

interface ErrorDataType {
  errors: ErrorType[];
}

export type ErrorResponseType = AxiosError<ErrorDataType>;
