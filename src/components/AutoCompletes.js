import React from "react";
import { styled } from "@mui/system";
import { Autocomplete } from "@mui/material";

function AutoCompletes(props) {
  return (
    <div>
      <Autocomplete
        {...props}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}

export default AutoCompletes;
