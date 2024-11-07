import React, { useContext, useState } from "react";
import { Box, Button, Input } from "@mui/material";
import "./MainPage.css";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { setSheetId } = useContext(DataContext);
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

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
      // Store the sheet ID in localStorage
      localStorage.setItem("sheetId", extractedId);

      // Set the sheet ID in the context
      setSheetId(extractedId);
      navigate("/home");
      setInputData("");
    } else {
      // Handle invalid input case (optional)
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
