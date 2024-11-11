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
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: { xs: "100%", sm: "640px" },
        height: "50px",
        backgroundColor: "#1976D2",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "18px",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        textTransform: "none",
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
