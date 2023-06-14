import React, { ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface SearchButtonProps {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  searchTerm,
  handleSearch,
}) => {
  return (
    <Box
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        backgroundColor: "black",
        marginRight: "8px",
        width: "30%",
      }}
    >
      <InputBase
        placeholder="Search Pokemon..."
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={handleSearch}
        style={{
          color: "inherit",
          width: "250px",
          padding: "8px 36px",
          backgroundColor: "white",
          borderRadius: "10px",
          marginLeft: "3rem",
          borderColor: "black",
        }}
      />
    </Box>
  );
};

export default SearchButton;
