import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { User } from "../types/userType";
import { logout } from "../apis/user";

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
      async logout() {
        const token = document.cookie.split("token=");
        // TODO 백엔드 로그아웃 정상 수정되면 로그아웃 처리 수정, 에러 로직 추가
        try {
          await logout(token[1]);
        } finally {
          document.cookie = "token=; max-age=0;";
          setUser(null);
        }
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
