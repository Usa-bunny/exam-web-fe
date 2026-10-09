"use client"

import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "@/services/authService";

export interface User {
  id?: string | number;
  name?: string;
  email?: string;
  role?: "admin" | "teacher" | "student" | string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);

      const token = result.data.token;
      const userData = result.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAdmin, isTeacher, isStudent }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
