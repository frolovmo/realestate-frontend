import { basePath } from "./constants";

export const PUBLIC_ROUTES = [
  `${basePath}`,
  `${basePath}/login`,
  `${basePath}/signup`,
  `${basePath}/verify-otp`,
  `${basePath}/reset`,
  `${basePath}/forgot-password`,
  `${basePath}/explore`,
  `${basePath}/terms`,
  `${basePath}/cookies`,
  new RegExp(`^${basePath}/unit/[^/?]+(?:\\?.*)?$`),
  new RegExp(`.*${basePath}/bucket/pdf/[^/?]+(?:\\?.*)?$`),
];

export const ROLE_BASED_ROUTES: Record<string, (string | RegExp)[]> = {
  developer: [
    `${basePath}/dashboard`,
    `${basePath}/properties`,
    `${basePath}/properties/create-property`,
    `${basePath}/profile`,
    new RegExp(`^${basePath}/properties/.*`),
    new RegExp(`^${basePath}/unit/[^/?]+(?:\\?.*)?$`),
  ],
  staff: [
    `${basePath}/requests`,
    `${basePath}/profile`,
    new RegExp(`^${basePath}/requests/.*`),
    new RegExp(`^${basePath}/unit/[^/?]+(?:\\?.*)?$`),
  ], // regex for dynamic route
  applicant: [
    `${basePath}/application`,
    `${basePath}/application/create-application`,
    `${basePath}/profile`,
    new RegExp(`^${basePath}/unit/[^/?]+(?:\\?.*)?$`),
  ],
};
