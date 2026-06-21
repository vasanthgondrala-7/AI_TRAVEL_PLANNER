"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const savedToken =
      localStorage.getItem(
        "travel_planner_token"
      );

    if (savedToken) {
      setToken(savedToken);
    }

    setLoading(false);

  }, []);

  const login = (
    newToken: string
  ) => {

    localStorage.setItem(
      "travel_planner_token",
      newToken
    );

    setToken(newToken);
  };

  const logout = () => {

    localStorage.removeItem(
      "travel_planner_token"
    );

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);