import { ApiRequestTypes } from "../types";
import axios from "axios";
import { atom } from "jotai";

// Atom to manage loading state
export const loadingAtom = atom<boolean>(false);

// Atom to manage error state
export const errorAtom = atom<any | null>(null);

// Atom to store the response data
export const responseAtom = atom<any | null>(null);

export const sendRequestAtom = atom(
  null, // This atom is a write-only atom (i.e., used for side effects)
  async (
    get,
    set,
    { reqType, url, data = null, config = {} }: ApiRequestTypes
  ) => {
    try {
      const token = localStorage.getItem("token");

      // Set up request interceptor (optional, if you want to modify requests globally)
      axios.interceptors.request.use(
        (config) => {
          // You can manipulate request config here if necessary (e.g., attach headers)
          return config;
        },
        (error) => {
          // Handle request error here
          return Promise.reject(error);
        }
      );

      // Set up response interceptor
      axios.interceptors.response.use(
        (response) => {
          // Response successful, pass it through
          return response;
        },
        (error) => {
          if (error.response) {
            // Handle 4xx and other errors as needed
            const status = error.response.status;
            if (status >= 400 && status < 500) {
              console.log(`Caught ${status} error:`, error.response.data);
              // Optionally handle specific 4xx errors here (e.g., 401 Unauthorized)
            }
          }

          // Reject the error to handle it later in the catch block
          return Promise.reject(error);
        }
      );

      set(loadingAtom, true); // Set loading to true when request starts
      set(errorAtom, null); // Reset error state before the request

      let response;

      if (reqType === "get") {
        response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          },
          ...config,
        });
      } else {
        // Perform the request using axios
        response = await axios[reqType](
          process.env.NEXT_PUBLIC_API_URL + url,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to Authorization header
            },
            ...config,
          }
        );
      }

      set(loadingAtom, false); // Set loading to false when request completes
      set(responseAtom, response.data); // Store the response data
      return response.data;
    } catch (error: any) {
      set(loadingAtom, false); // Set loading to false when request fails
      set(errorAtom, error); // Set error state in case of a failed request
      console.log("API Error: ", error);

      // Still return the error or partial response if needed
      return error?.response?.data || null;
    }
  }
);
