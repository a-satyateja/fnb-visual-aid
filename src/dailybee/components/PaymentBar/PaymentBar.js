import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const CheckOutBar = () => {
  const { finalPrice } = useContext(DataContext);
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box> Order Total -</Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ paddingTop: "3px" }}>
              <CurrencyRupeeIcon sx={{ fontSize: "17px" }} />
            </Box>
            <Box>{finalPrice}</Box>
          </Box>
        </Box>
      </span>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box>Pay Now</Box>
        <Box sx={{ paddingTop: "11px" }}>
          <ArrowRightAltIcon />
        </Box>
      </Box>
    </Button>
  );
};

export default CheckOutBar;
