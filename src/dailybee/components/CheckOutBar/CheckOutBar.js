import { Button } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const CheckOutBar = () => {
  const { totalItems } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/checkout");
  };

  return (
    <Button
      sx={{
        position: "fixed", // Sticks to the bottom of the viewport
        bottom: 0, // Aligns at the bottom
        left: "50%", // Moves to the horizontal center
        transform: "translateX(-50%)", // Ensures perfect centering
        width: "100%", // Full width for small screens
        maxWidth: { xs: "100%", sm: "640px" }, // Limit width on larger screens
        height: "50px", // Adjust height as needed
        backgroundColor: "#1976D2", // Background color
        color: "white", // Text color
        display: "flex", // Flexbox layout
        justifyContent: "space-between", // Space between items
        alignItems: "center", // Center content vertically
        fontSize: "18px", // Adjust font size
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)", // Optional shadow for elevation
        cursor: "pointer", // Pointer cursor
        textTransform: "none", // Remove uppercase transformation
        padding: "0 16px",
      }}
      onClick={handleSubmit}
    >
      <span>
        {totalItems.length === 1
          ? "1 item added"
          : `${totalItems.length} items added`}
      </span>
      <span>View Cart </span>
    </Button>
  );
};

export default CheckOutBar;
