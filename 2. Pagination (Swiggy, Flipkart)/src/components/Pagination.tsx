import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  numOfPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({
  numOfPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePageChange = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <div className="pagination-container">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        ←
      </button>

      {Array.from({ length: numOfPages }).map((_, index) => (
        <button
          key={index}
          className={
            currentPage === index + 1
              ? "page-number active-page"
              : "page-number"
          }
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button onClick={goToNextPage} disabled={currentPage === numOfPages}>
        →
      </button>
    </div>
  );
};

export default Pagination;
