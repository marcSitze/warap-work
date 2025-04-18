import {
  Pagination as PaginationCN,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { SIZE } from "@/constants/pagination";

export function Pagination({
  page,
  onPageChange,
  total,
}: {
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  hasMore: boolean;
}) {
  const pages = Math.floor(total / SIZE);

  return (
    <PaginationCN>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(page - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: pages }).map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink href="#" isActive={page === idx + 1} onClick={() => onPageChange(idx + 1)}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem> */}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        {page !== pages && pages !== 0 && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationCN>
  );
}
