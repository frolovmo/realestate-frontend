export const STATUSES = {
  APPROVED: "approved",
  DRAFT: "draft",
  PENDING: "pending",
  REQUESTED_MORE_INFO: "requestedMoreInfo",
  ONHOLD: "onHold",
  REJECTED: "rejected",
};

export const UNIT_TYPES = {
  detached: "detached",
  apartment: "apartment",
  townhouse: "townhouse",
};

export const DEVELOPMENT_STAGES = {
  available: "available",
  underConstruction: "underConstruction",
};

export const DEFAULT_FACILITIES = {
  balcony: "balcony",
  elevator: "elevator",
  garden: "garden",
  smartHome: "smartHome",
  solar: "solar",
  wheelChair: "wheelChair",
};

export const HOUSE_PREFERENCE = {
  fromDeveloper: "fromDeveloper",
  typology: "typology",
};

export const MARITAL_STATUS = {
  single: "Single",
  married: "Married",
  divorced: "Divorced",
};

export const EMPLOYMENT_STATUS = {
  employed: "Employed",
  selfEmployed: "Self-Employed",
  unemployed: "Unemployed",
};

export const unitStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  REQUESTED_MORE_INFO: "requestedMoreInfo",
  SUBMITTED: "submitted",
  DRAFT: "draft",
} as const;

export const RWANDAN_DISTRICTS = [
  "Gasabo",
  "Kicukiro",
  "Nyarugenge",
  "Bugesera",
  "Gatsibo",
  "Kayonza",
  "Kirehe",
  "Ngoma",
  "Nyagatare",
  "Rwamagana",
  "Burera",
  "Gakenke",
  "Gicumbi",
  "Musanze",
  "Rulindo",
  "Gisagara",
  "Huye",
  "Kamonyi",
  "Muhanga",
  "Nyamagabe",
  "Nyanza",
  "Nyaruguru",
  "Ruhango",
  "Karongi",
  "Ngororero",
  "Nyabihu",
  "Rubavu",
  "Rutsiro",
  "Rusizi",
  "Nyamasheke",
] as const;

export const AUTHENTICATION_COOKIE = "Authentication";

export const basePath = "";

export const UPLOAD_IMAGES_MAX_SIZE = Number(
  process.env.NEXT_PUBLIC_UPLOAD_IMAGES_MAX_SIZE!
);
export const UPLOAD_PDF_MAX_SIZE = Number(
  process.env.NEXT_PUBLIC_UPLOAD_PDF_MAX_SIZE!
);
export const UPLOAD_VIDEOS_MAX_SIZE = Number(
  process.env.NEXT_PUBLIC_UPLOAD_VIDEOS_MAX_SIZE!
);
export const NUMERIC_INPUT_MAX_LIMIT = Number(
  process.env.NEXT_PUBLIC_NUMERIC_INPUT_MAX_LIMIT!
);
