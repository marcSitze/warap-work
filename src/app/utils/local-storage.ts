"use client";

import { isStringifiedObjectOrArray } from "@/constants/storageRegex";


export function getLocalStorageItem<T = string>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return (
      isStringifiedObjectOrArray.test(item) ? JSON.parse(item) : item
    ) as T;
  }

  return null;
}

export function setLocalStorageItem<T = string>(key: string, item: T) {
  if (typeof window !== "undefined") {
    const value = typeof item === "string" ? item : JSON.stringify(item);
    localStorage.setItem(key, value);
  }

  return null;
}

export function removeLocalStorageItem(key: string) {
  return typeof window !== "undefined" ? localStorage.removeItem(key) : null;
}

export function clearLocalStorage() {
  return typeof window !== "undefined" ? localStorage.clear() : null;
}
