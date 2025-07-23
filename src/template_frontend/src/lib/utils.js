import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserId() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.user_id || user.id; // Adjust based on your user object structure
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  return null;
}