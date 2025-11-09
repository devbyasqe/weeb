import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export const CAROUSEL_INTERVAL = 10000;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const formatScore = (score?: number | null) => {
  return score ? score.toFixed(1) : "-";
};

export const formatDateString = (dateString?: string | null) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
