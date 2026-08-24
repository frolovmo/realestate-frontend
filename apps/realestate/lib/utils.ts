import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return formattedDate;
};

export const formatPrice = (price: number,isCustom=false) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: isCustom ?2:0,
    maximumFractionDigits: isCustom ?2:0,
  }).format(price);
};

export const encodeUrlLocation = ({
  address,
  province,
  district,
  sector,
  cell,
  village,
}: {
  address: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}) => {
  const addressParts = [
    address,
    village,
    cell,
    sector,
    district,
    province,
  ].filter((part) => part && part.trim().length > 0);

  const fullAddress = addressParts.join(", ");

  return encodeURIComponent(fullAddress);
};

export const encodeUrlEmail = (email:string):string=>{
  return encodeURIComponent(email);
}
type SalesData = {
  year: number;
  month: string;
  totalSales: number;
  totalAmount: number;
};

type GroupedSalesResult = {
  months: string[];
  sales: { month: string; totalSales: number; totalAmount: number }[];
};

// Define the correct month order
const MONTH_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const groupSalesByYear = (data: SalesData[], year: number): GroupedSalesResult => {
  const filteredData = data?.filter(item => item.year === year);

  const sortedSales = MONTH_ORDER.map(month => {
    const record = filteredData?.find(item => item.month === month);
    return record ? record : { month, totalSales: 0, totalAmount: 0 };
  });

  return {
    months: sortedSales.map(item => item.month),
    sales: sortedSales
  };
};

export const formatPropertyAddressLocation = ({
  province,
  district,
  sector,
  cell,
  village,
}: {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
})=>{
  const addressParts = [
    province,
    district,
    sector,
    cell,
    village,
  ]
  
  const fullAddress = addressParts.join(", ");
  return fullAddress;

}