"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { apiGet, apiPost, updateProfile } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const data = await apiGet("/api/auth/me");
      setUser(data?.user || null);
    } catch (error) {
      const msg = error?.message || "";
      const isExpectedAuthError =
        msg.includes("Not authorized") ||
        msg.includes("User not found") ||
        msg.includes("token");

      if (!isExpectedAuthError) {
        console.error("Auth check failed:", error);
      } else if (msg.includes("User not found")) {
        // Clear invalid token cookie if user no longer exists in DB
        apiPost("/api/auth/logout", {}).catch(() => {});
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    const data = await apiPost("/api/auth/login", credentials);
    setUser(data?.user || null);
    return data;
  };

  const register = async (payload) => {
    const data = await apiPost("/api/auth/register", payload);
    setUser(data?.user || null);
    return data;
  };

  const logout = async () => {
    try {
      await apiPost("/api/auth/logout", {});
    } finally {
      setUser(null);
    }
  };

  const updateUser = async (profileData) => {
    const data = await updateProfile(profileData);
    setUser(data?.user || null);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
