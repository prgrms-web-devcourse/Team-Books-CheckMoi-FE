import { useContext } from "react";
import {
  UserActionContext,
  UserContext,
} from "../contexts/UserContextProvider";

export const useUserContext = () => useContext(UserContext);

export const useUserActionContext = () => useContext(UserActionContext);
