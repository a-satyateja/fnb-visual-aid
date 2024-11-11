import { Box, Button, Divider } from "@mui/material";
import React, { useContext } from "react";
import MenuComp from "../components/Menu/Menu";
import MenuItems from "../components/MenuItems/MenuItems";
import { DataContext } from "../context/DataContext";
import CheckOutBar from "../components/CheckOutBar/CheckOutBar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function App() {
  const { totalItems, setTotalItems } = useContext(DataContext);
  const navigate = useNavigate();

  const submitBack = () => {
    navigate("/");
    setTotalItems([]);
  };
  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            width: "100%",
          }}
        >
          <Box>
            <Button
              sx={{ marginTop: "", cursor: "pointer" }}
              onClick={submitBack}
            >
              <ArrowBackIcon />
            </Button>
          </Box>
          <Box
            sx={{
              color: "black",
              fontSize: "26px",
              fontFamily: "revert",
              fontWeight: 600,
            }}
          >
            <MenuComp />
          </Box>
        </Box>
        <Divider />

        <MenuItems />

        {totalItems.length > 0 && <CheckOutBar />}
      </Box>
    </div>
  );
}

export default App;
