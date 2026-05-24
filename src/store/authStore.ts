"use client";

import { useSyncExternalStore } from "react";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
};

let state: AuthState = {
  user: null,
};

const listeners = new Set<() => void>();
export const authStore = {
  getState: () => state,
  setState: (next: Partial<AuthState>) => {
    state = { ...state, ...next };
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useAuthStore() {
  // Provide a server snapshot function (same as getState) to satisfy
  // server-rendering requirements of `useSyncExternalStore`.
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getState,
    authStore.getState,
  );
}
