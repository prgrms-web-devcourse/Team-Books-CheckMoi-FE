import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { User } from "../types/userType";

type UserActionType = {
  login: (inputUser: User) => void;
  logout: () => void;
};

export const UserContext = createContext<User | null>(null);
export const UserActionContext = createContext<UserActionType>(
  {} as UserActionType
);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const actions = useMemo(
    () => ({
      login(inputUser: User) {
        setUser(inputUser);
      },
      logout() {
        setUser(null);
      },
    }),
    []
  );

  return (
    <UserActionContext.Provider value={actions}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UserActionContext.Provider>
  );
};

export default UserContextProvider;
