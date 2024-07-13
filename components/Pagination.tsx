"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationHome = ({ page, length }: { page: number; length: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [Next, setNext] = useState<number>(1);
  const [Previous, setPrevious] = useState<number | null>();

  useEffect(() => {
    const NoOfPages = Math.ceil(length / 10) - 1;
    const currentPage = Number(page) ? Number(page) : 0;

    if (currentPage < NoOfPages) {
      setNext(currentPage + 1);
    }

    if (currentPage > 1) {
      setPrevious(currentPage - 1);
    }
  }, [page, length]);

  const createPageUrl = (
    pageNumber: number | null | undefined,
    use: "previous" | "next"
  ) => {
    if (use === "previous" && Number(page) === 1) {
      replace(`${pathname}`);
    } else if (pageNumber) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {page && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => createPageUrl(Previous, "previous")}
            />
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => createPageUrl(Next, "next")} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationHome;
