export const menuItems = [
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-home px-4 py-2",
    url: "/kataza/dashboard",
  },
  {
    label: "Profile",
    icon: "pi pi-fw pi-user px-4 py-2 text-green-500",
    url: "/profile",
  },
  {
    label: "Products",
    icon: "pi pi-th-large px-4 py-2 text-green-500",
    url: "/product",
    items: [
      {
        label: "Bundles",
        icon: "pi pi-box px-4 py-2 text-green-500",
        url: "/product/bundles",
      },
      {
        label: "Products",
        icon: "pi pi-gauge px-4 py-2 text-green-500",
        url: "/product/products",
      },
      {
        label: "Product Mapping",
        icon: "pi pi-reply px-4 py-2 text-green-500",
        url: "/product/product-mapping",
      },
    ],
  },
  {
    label: "Access",
    icon: "pi pi-fw pi-users px-4 py-2",
    items: [
      {
        label: "Users",
        icon: "pi pi-fw pi-users px-4 py-2 text-green-500",
        url: "/access/users",
      },
      {
        label: "Roles",
        icon: "pi pi-fw pi-lock px-4 py-2 text-green-500",
        url: "/access/roles",
      },
      {
        label: "Logout",
        icon: "pi pi-fw pi-power-off px-4 py-2 text-green-500",
        url: "/",
      },
    ],
  },
];
