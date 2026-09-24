import axios, { AxiosError } from "axios";
import { serverApi } from "../../lib/config";

const apiClient = axios.create({
  baseURL: serverApi,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

let onUnauthorized: (() => void) | null = null;

export const registerUnauthorizedHandler = (handler: () => void): void => {
  onUnauthorized = handler;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("memberData");
      if (onUnauthorized) onUnauthorized();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
