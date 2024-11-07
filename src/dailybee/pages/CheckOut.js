import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Button, Divider, Typography } from "@mui/material";
import CheckOutItemCard from "../components/CheckOutItemCard/CheckOutItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PaymentBar from "../components/PaymentBar/PaymentBar";

const CheckOut = () => {
  const { totalItems } = useContext(DataContext);
  const navigate = useNavigate();
  const submitBack = () => {
    navigate("/home");
  };
  return (
    <Box sx={{ width: { xs: "100%", sm: "600px" } }}>
      <Box>
        <Button
          sx={{ marginTop: "10px", cursor: "pointer" }}
          onClick={submitBack}
        >
          <ArrowBackIcon />
        </Button>
        <Box sx={{ fontSize: "30px", fontWeight: "600", margin: "30px" }}>
          Restaurant Name
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Divider sx={{ width: { sm: "100%", xs: "90%" } }} />
        </Box>
        <Box sx={{ margin: "20px 30px" }}>
          {totalItems.length > 0 ? (
            totalItems.map((item, id) => {
              console.log(totalItems);
              return (
                <Box key={id}>
                  <CheckOutItemCard
                    itemName={item[0]}
                    icon={item[2]}
                    item={item[3]}
                    price={item[1]}
                    number={item[4]}
                  />
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "100px",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "fantasy",
                }}
              >
                Your Cart is empty
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "fantasy",
                }}
              >
                Please select atleast 1 item to order
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {totalItems.length > 0 && <PaymentBar />}
    </Box>
  );
};

export default CheckOut;
