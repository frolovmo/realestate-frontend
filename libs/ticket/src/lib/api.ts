
export const AUTH_USERNAME =process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME!;
export const AUTH_PASSWORD =process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME!;
export const FILE_STORAGE_API = process.env.NEXT_PUBLIC_FILE_STORAGE_API_URL!;
export const basePath = process.env.NODE_ENV === "production" ? "/crm" : "";
export const ROLE_USER = process.env.NEXT_PUBLIC_ROLE_USER!;
export const ROLE_CUSTOMER_EXPERIENCE = process.env.NEXT_PUBLIC_ROLE_CUSTOMER_EXPERIENCE!;
export const ROLE_MINUZA_CUSTOMER_EXPERIENCE = process.env.NEXT_PUBLIC_ROLE_MINUZA_CUSTOMER_EXPERIENCE!;
export const ROLE_MINUZA_USER = process.env.NEXT_PUBLIC_ROLE_MINUZA_USER!;