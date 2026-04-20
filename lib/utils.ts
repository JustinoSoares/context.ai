import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maxMessageLength(content: string, maxLength = 45) {
  if (content.length <= maxLength) {
    return content;
  }
  return content.slice(0, maxLength) + "...";
}
