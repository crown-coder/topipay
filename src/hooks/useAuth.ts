"use client";

import { useCallback } from "react";
import { authStore, useAuthStore } from "@/store/authStore";
import type { User } from "@/types";

export function useAuth() {
  const { user } = useAuthStore();

  const login = useCallback((nextUser: User) => {
    authStore.setState({ user: nextUser });
  }, []);

  const logout = useCallback(() => {
    authStore.setState({ user: null });
  }, []);

  return { user, isAuthenticated: Boolean(user), login, logout };
}
