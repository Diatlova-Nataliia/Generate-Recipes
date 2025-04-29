import Button from "@/components/Button";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

interface PaginationProps {
  incrementPage: () => void;
  decrementPage: () => void;
  className: string;
  disabledStart: boolean;
  disabledEnd: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  incrementPage,
  decrementPage,
  className,
  disabledStart,
  disabledEnd,
}) => {
  return (
    <>
      <Button
        className={className}
        onClick={decrementPage}
        disabled={disabledStart}
      >
        {disabledStart ? (
          <ArrowCircleLeftIcon fontSize="large" color="disabled" />
        ) : (
          <ArrowCircleLeftIcon fontSize="large" />
        )}
      </Button>
      <Button
        className={className}
        onClick={incrementPage}
        disabled={disabledEnd}
      >
        {disabledEnd ? (
          <ArrowCircleRightIcon fontSize="large" color="disabled" />
        ) : (
          <ArrowCircleRightIcon fontSize="large" />
        )}
      </Button>
    </>
  );
};

export default Pagination;
