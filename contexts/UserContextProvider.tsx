import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TopbarUserType } from "../types/userType";

interface UserActionType {
  login: (inputUser: TopbarUserType) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

interface ContextType {
  user: TopbarUserType | null;
  isLoginModalOpen: boolean;
}

export const UserContext = createContext<ContextType>({
  user: null,
  isLoginModalOpen: false,
});

export const UserActionContext = createContext<UserActionType>(
  {} as UserActionType
);

interface UserContextProviderProps {
  children: ReactNode;
  initialUser: TopbarUserType | null;
}

const UserContextProvider = ({
  children,
  initialUser,
}: UserContextProviderProps) => {
  const [context, setContext] = useState<ContextType>({
    user: initialUser,
    isLoginModalOpen: false,
  });
  const actions = useMemo(
    () => ({
      login(inputUser: TopbarUserType) {
        setContext((prevContext) => ({
          ...prevContext,
          user: inputUser,
        }));
      },
      logout() {
        setContext((prevContext) => ({
          ...prevContext,
          user: null,
        }));
      },
      openLoginModal() {
        setContext((prevContext) => ({
          ...prevContext,
          isLoginModalOpen: true,
        }));
      },
      closeLoginModal() {
        setContext((prevContext) => ({
          ...prevContext,
          isLoginModalOpen: false,
        }));
      },
    }),
    []
  );

  return (
    <UserActionContext.Provider value={actions}>
      <UserContext.Provider value={context}>{children}</UserContext.Provider>
    </UserActionContext.Provider>
  );
};

export default UserContextProvider;
