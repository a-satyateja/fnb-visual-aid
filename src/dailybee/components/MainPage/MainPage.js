import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input } from "@mui/material";
import "./MainPage.css";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useLocation } from "react-router-dom";

const MainPage = () => {
  const { setSheetId } = useContext(DataContext);
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract sheetId from the query parameter
  const getSheetIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };

  // Automatically load when a sheetId is present in the URL
  useEffect(() => {
    const sheetId = getSheetIdFromUrl();
    if (sheetId) {
      localStorage.setItem("sheetId", sheetId);
      setSheetId(sheetId);
      navigate("/home");
    }
  }, [location]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const extractSheetId = (url) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = () => {
    const extractedId = extractSheetId(inputData);
    if (extractedId) {
      localStorage.setItem("sheetId", extractedId);
      setSheetId(extractedId);
      navigate("/home");
      setInputData("");
    } else {
      alert("Please enter a valid Excel link.");
    }
  };

  return (
    <Box className="Main__Box">
      <Input
        className="Main__Input"
        placeholder="Please input your excel link here"
        onChange={handleInputChange}
        value={inputData}
      />
      <Button className="Submit_Btn" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default MainPage;
