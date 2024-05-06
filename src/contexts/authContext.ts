import { createContext, useContext } from "react";

const authContext = createContext<any>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  user: null as any,
  setUser: () => {},
});

const AuthProvider = authContext.Provider;

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };

