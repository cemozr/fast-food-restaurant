import { useState } from "react";
type usePaginationProps<T> = {
  itemList: T[];
  itemsPerPage: number;
};
export default function usePagination<T>({
  itemList,
  itemsPerPage,
}: usePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = itemList.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return {
    startIndex,
    endIndex,
    displayedItems,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
  };
}
