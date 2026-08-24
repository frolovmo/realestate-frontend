"use server";

import { createDecipheriv } from "crypto";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../lib/constants";
import { AUTH_BACKEND_API_URL, AUTH_LOGIN_PATH } from "../lib/api";
import {
  DecryptedUser,
  JwtDecodedData,
  JwtDecodedDataNewAPI,
  UserData,
  UserRole,
} from "../lib/types/index";

export type AuthFormState = {
  message: string;
};

type LoginResponse = {
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
  };
  token?: string;
  accessToken?: string;
  access_token?: string;
};

type ClassicJwtData = {
  sub?: string | number;
  id?: string | number;
  userId?: string | number;
  username?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  role?: string;
  roleName?: string;
  roles?: Array<string | { name?: string; roleName?: string }>;
};

function extractToken(data: LoginResponse) {
  return (
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.access_token ||
    data?.token ||
    data?.accessToken ||
    data?.access_token
  );
}

function getClassicRoleName(data: ClassicJwtData) {
  if (data.roleName) return data.roleName;
  if (data.role) return data.role;

  const firstRole = data.roles?.[0];
  if (typeof firstRole === "string") return firstRole;

  return firstRole?.roleName || firstRole?.name || UserRole.APPLICANT;
}

async function fetchNidaProfile(nationalId: string) {
  const token = await getAuthentication();
  const response = await fetch(`${AUTH_BACKEND_API_URL}/api/auth/nida/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify({
      nationalId,
    }),
  });

  if (!response.ok) return null;

  const nidaData = await response.json();
  const nida = nidaData?.data;

  if (!nida) return null;

  return {
    profileImage: nida?.photo ? `data:image/jpeg;base64,${nida.photo}` : null,
    address: {
      district: nida.district,
      village: nida.village,
      cell: nida.cell,
      sector: nida.sector,
      province: nida.province,
      country: nida.birthCountry,
    },
  };
}

export async function signUp(
  _state: AuthFormState,
  formData: FormData
): Promise<any> {
  const nationalId = formData.get("nationalId");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmationPassword = formData.get("confirmationPassword");
  const redirectTo = formData.get("redirectTo") || "/";

  const result = {
    success: false,
  };

  try {
    const response: Response = await fetch(
      `${AUTH_BACKEND_API_URL}/api/auth/register/applicant`,
      {
        method: "POST",
        body: JSON.stringify({
          nationalId,
          email,
          phone,
          password,
          confirmationPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { message: error.message };
    }

    const data = (await response.json()) as LoginResponse;
    const token = extractToken(data);

    if (!token) {
      return { message: "Signup succeeded but no token was returned" };
    }

    const cookieStore = cookies();
    cookieStore.set(AUTHENTICATION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    result.success = true;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "An unknown error occurred" };
  }

  if (result.success) redirect(redirectTo.toString());
}

export async function signIn(
  _state: AuthFormState,
  formData: FormData
): Promise<any> {
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/";

  const result = {
    success: false,
  };

  try {
    const response: Response = await fetch(
      `${AUTH_BACKEND_API_URL}${AUTH_LOGIN_PATH}`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          emailOrPhone: username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { message: error.message };
    }

    const data = (await response.json()) as LoginResponse;
    const token = extractToken(data);

    if (!token) {
      return { message: "Login succeeded but no token was returned" };
    }

    const cookieStore = cookies();
    cookieStore.set(AUTHENTICATION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    result.success = true;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "An unknown error occurred" };
  }

  if (result.success) redirect(redirectTo.toString());
}

export async function authenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value;
}

export async function decryptUser(hash: string) {
  try {
    const algorithm = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM!;
    const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
    const key = Buffer.from(encKey);

    const [ivPart, encryptedText] = hash.split(":");
    const iv = Buffer.from(ivPart, "hex");

    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(true);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Decryption failed");
  }
}

export async function getAuthentication() {
  return cookies().get(AUTHENTICATION_COOKIE);
}

export async function extractUserDataFromJwt() {
  const token = await getAuthentication();
  return token?.value ? jwtDecode(token.value) : null;
}

export const isApplicantRole = async () => {
  const user = await getUserData();

  return user?.roleName === UserRole.APPLICANT;
};

export type JWTData = JwtDecodedData & JwtDecodedDataNewAPI;

export async function getUserData(): Promise<UserData> {
  const data = (await extractUserDataFromJwt()) as JWTData;

  if (!data) return null;

  if (data?.userRole?.RoleName === "Applicant") {
    const baseUserData: Partial<UserData> = {
      userId: data.id,
      fullName: `${data.firstName} ${data.lastName}`,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      nationalId: data.nationalId,
      roleName: data.userRole.RoleName,
      createdAt: moment(data.userRole.createdAt).format("YYYY-MM-DD HH:mm"),
      updatedAt: moment(data.userRole.updatedAt).format("YYYY-MM-DD HH:mm"),
    };

    try {
      const profile = await fetchNidaProfile(data.nationalId);
      return profile
        ? ({ ...baseUserData, ...profile } as UserData)
        : (baseUserData as UserData);
    } catch (err) {
      console.error("Error fetching NIDA data:", err);
      return baseUserData as UserData;
    }
  }

  if (data.user) {
    const decrypted: DecryptedUser = await decryptUser(data.user);
    const {
      id,
      fullname,
      identificationNumber,
      roles,
      email,
      phone,
      identificationType,
    } = decrypted.encrypt;

    const baseUserData: Partial<UserData> = {
      userId: id,
      fullName: fullname,
      identificationType,
      nationalId: identificationNumber,
      roleName: roles[0].name,
      email,
      phone,
      firstname: fullname.split(" ")[0],
      lastname: fullname.split(" ").slice(1).join(" "),
    };

    if (identificationNumber) {
      try {
        const profile = await fetchNidaProfile(identificationNumber);
        return profile
          ? ({ ...baseUserData, ...profile } as UserData)
          : (baseUserData as UserData);
      } catch (err) {
        console.error("Error fetching NIDA data for non-applicant:", err);
        return baseUserData as UserData;
      }
    }

    return baseUserData as UserData;
  }

  const classicUser = data as unknown as ClassicJwtData;
  const userId = classicUser.userId || classicUser.id || classicUser.sub;
  const fullName =
    classicUser.fullName ||
    classicUser.name ||
    classicUser.username ||
    classicUser.email ||
    (userId ? String(userId) : "User");
  const [firstname, ...lastnameParts] = fullName.split(" ");

  return {
    userId: userId || fullName,
    fullName,
    firstname,
    lastname: lastnameParts.join(" "),
    email: classicUser.email,
    phone: classicUser.phone,
    nationalId: classicUser.nationalId || "",
    roleName: getClassicRoleName(classicUser),
  } as UserData;
}
