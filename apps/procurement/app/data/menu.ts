export type TopMenu = {
  title: string;
  link?: string;
};

export type SocialMediaLinks = {
  icon: string;
  link?: string;
};

export const topMenu: TopMenu[] = [
  { title: "Tenders", link: "tenders" },
  { title: "Features", link: "#features" },
  { title: "How it works", link: "#steps" },
  { title: "Benefits", link: "#reasons" },
];

export const bottomMenu: TopMenu[] = [
  { title: "Terms of Service", link: "#" },
  { title: "Privacy", link: "#" },
  { title: "Support", link: "#" },
];

export const socialMedialLinks: SocialMediaLinks[] = [
  { link: "#", icon: "pi pi-instagram" },
  { icon: "pi pi-twitter", link: "#" },
  { icon: "pi pi-linkedin", link: "#" },
  { icon: "pi pi-phone", link: "#" },
  { icon: "pi pi-envelope", link: "#" },
];
