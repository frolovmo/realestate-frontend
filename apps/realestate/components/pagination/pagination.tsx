import {
  Pagination as DefaultPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { basePath } from "../../lib/constants";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  disableLink?: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  disableLink,
  onPageChange,
  itemsPerPage,
}: PaginationProps) {
  const getPageLink = (page: number) => {
    if (!disableLink) {
      return `${basePath}/properties?page=${page}&limit=${itemsPerPage}`;
    }
  };

  return (
    <DefaultPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageLink(currentPage > 1 ? currentPage - 1 : 1)}
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={getPageLink(index + 1)}
              onClick={() => onPageChange(index + 1)}
              isActive={currentPage === index + 1}
              className={
                index + 1 === currentPage ? "bg-primary text-white" : ""
              }
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={getPageLink(currentPage + 1)}
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </DefaultPagination>
  );
}
