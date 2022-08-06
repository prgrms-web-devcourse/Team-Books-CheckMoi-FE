import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/userType";
import { logout } from "../apis/user";

interface UserActionType {
  login: (inputUser: User) => void;
  logout: () => void;
}

export const UserContext = createContext<User | null>(null);
export const UserActionContext = createContext<UserActionType>(
  {} as UserActionType
);

interface UserContextProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

const UserContextProvider = ({
  children,
  initialUser,
}: UserContextProviderProps) => {
  const [user, setUser] = useState(initialUser);
  const actions = useMemo(
    () => ({
      login(inputUser: User) {
        setUser(inputUser);
      },
      async logout() {
        const token = document.cookie.split("token=");
        await logout(token[1]);
        document.cookie = "token=; max-age=0;";
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
