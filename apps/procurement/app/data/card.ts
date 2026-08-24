import React from "react";

export type CardData = {
  title: string;
  description: string;
  icon: string | React.ReactNode;
};

export const features: CardData[] = [
  {
    title: "Tender Search",
    description:
      "Eay-to-use functionality to find relevant procurment opportunities across all sectors.",
    icon: "pi pi-search",
  },
  {
    title: "Notifications",
    description:
      "Stay updates ewith real-time alerts for new tenders, deadlines, and applications status changes.",
    icon: "pi pi-bell",
  },
  {
    title: "Document Management",
    description:
      "Secure document upload and management system for tender submissions and company documentation.",
    icon: "pi pi-file",
  },
];

export const steps: CardData[] = [
  {
    title: "Register",
    description: "Create your account with basic company information.",
    icon: "",
  },
  {
    title: "Complete Profile",
    description: "Add detailed company decumentation and certifications.",
    icon: "",
  },
  {
    title: "Browse Tenders",
    description: "Search and find relavant procurement opportunities.",
    icon: "",
  },
  {
    title: "Submit Proposals",
    description: "Apply for tenders with your documentation.",
    icon: "",
  },
];

export const benefits: CardData[] = [
  {
    title: "Transparency",
    description: "Clear procurement process and real-time status updates.",
    icon: "pi pi-check-circle",
  },
  {
    title: "Efficiency",
    description: "Streamlined digital submission and evaluation process.",
    icon: "pi pi-check-circle",
  },
  {
    title: "Equal Opportunity",
    description: "Fair access to all procurement opportunities.",
    icon: "pi pi-check-circle",
  },
  {
    title: "Support",
    description: "Dedicated help desk and documentation for suppliers.",
    icon: "pi pi-check-circle",
  },
];
