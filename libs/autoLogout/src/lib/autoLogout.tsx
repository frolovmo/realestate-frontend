import axios from "axios";
import { useEffect } from "react";
const token = typeof window !== "undefined" && localStorage.getItem("token");
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_HOST_ORIGIN,
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export const AutoLogout = () => {
  const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
  let logoutTimer: any;

  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(async () => {
      try {
        // Logout logic
        localStorage.removeItem("token");
        localStorage.removeItem("userEnc");
        localStorage.removeItem("username")
        localStorage.removeItem("userId");
        localStorage.removeItem("Admin");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("ally-supports-cache");
        localStorage.removeItem("redirectPath");
        localStorage.removeItem("selectedDomain");
        localStorage.removeItem("selectedRole");
        localStorage.removeItem("userRoles");
        window.location.href = "/"; // Redirect to login page

        const token = localStorage.getItem("token");
        const response = await api.get("/access/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Add event listeners for user activity
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();
    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);
  return null;
};
