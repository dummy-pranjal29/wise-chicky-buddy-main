import { RoleKey } from "@/data/roles";

const LEGACY_ROLE_STORAGE_KEY = "wise-chicky-role";
export const ROLE_STORAGE_KEY = "wise-chicky-confirmed-role";
export const PENDING_ROLE_STORAGE_KEY = "wise-chicky-pending-role";

export const isRoleKey = (value: unknown): value is RoleKey =>
  value === "student" || value === "teacher" || value === "parent" || value === "doctor";

export const getSavedRole = (): RoleKey | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ROLE_STORAGE_KEY);
  return isRoleKey(value) ? value : null;
};

export const saveRole = (role: RoleKey) => {
  window.localStorage.setItem(ROLE_STORAGE_KEY, role);
  window.localStorage.removeItem(PENDING_ROLE_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_ROLE_STORAGE_KEY);
};

export const clearSavedRole = () => {
  window.localStorage.removeItem(ROLE_STORAGE_KEY);
  window.localStorage.removeItem(PENDING_ROLE_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_ROLE_STORAGE_KEY);
};

export const getPendingRole = (): RoleKey | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(PENDING_ROLE_STORAGE_KEY);
  return isRoleKey(value) ? value : null;
};

export const savePendingRole = (role: RoleKey) => {
  window.localStorage.setItem(PENDING_ROLE_STORAGE_KEY, role);
};

export const clearPendingRole = () => {
  window.localStorage.removeItem(PENDING_ROLE_STORAGE_KEY);
};
