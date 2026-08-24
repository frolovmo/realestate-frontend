import axios from "axios";
import { createDecipheriv } from "crypto";
import JsCookie from "js-cookie";

const token = typeof window !== "undefined" && localStorage.getItem("token");
const role = typeof window !== "undefined" && localStorage.getItem("role");

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_HOST_ORIGIN,
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return api.defaults.headers.common["Authorization"];
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const isAuthPath = (pathname: string) => {
  return (
    pathname?.includes("auth") ||
    pathname === "/" ||
    pathname === "/mobile-app/terms"
  );
};

export const getRole = () => {
  return role;
};

export const getUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const userLogout = async () => {
  try {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEnc");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("ally-supports-cache");
    localStorage.removeItem("redirectPath");
    localStorage.removeItem("selectedDomain");
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("userRoles");
    window.location.href = "/";

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
};

export const decrypt = (hash: string) => {
  const algorithm = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM as string;
  const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
  const key = Buffer.from(encKey);

  const parts = hash.split(":");

  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = parts[1];

  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted).encrypt;
};

// This will only be used on client side (SOn server side, use nextjs's cookie)
export const setAuthCookie = (data: string) => {
  JsCookie.set("Authentication", data, {
    // httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    path: "/", // Make the cookie available across the site
    expires: 7, // Set expiration (1 week in seconds)
  });
};
