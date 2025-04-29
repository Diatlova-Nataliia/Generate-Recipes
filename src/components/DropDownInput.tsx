"use client";

import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface DropDownInput {
  onChange: (e: React.SyntheticEvent, value: string[]) => void;
  options: string[];
  value: string[];
}

const DropDownInput: React.FC<DropDownInput> = ({
  onChange,
  options,
  value,
}) => {
  return (
    <Autocomplete
      multiple
      onChange={onChange}
      disablePortal
      filterSelectedOptions
      options={options}
      value={value}
      className="w-full p-4"
      sx={{
        "& .MuiFilledInput-root": {
          borderRadius: "33px",
          paddingTop: "0!important",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "33px",
        },
        "& fieldset": {
          borderRadius: "33px",
        },
      }}
      renderTags={() => null}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Please, choose ingredients for recipes..."
        />
      )}
    />
  );
};

export default DropDownInput;
