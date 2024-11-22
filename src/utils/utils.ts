import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  timeoutErrorMessage: 'İstek zaman aşımına uğradı, lütfen tekrar deneyin.',
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
