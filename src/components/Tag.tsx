"use client";

import { Chip } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface TagProps {
  label: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
  return (
    <Chip
      label={label}
      variant="outlined"
      deleteIcon={<ClearIcon />}
      onDelete={onDelete}
    />
  );
};

export default Tag;
