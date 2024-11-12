import React, { useContext, useState, useCallback } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import "./MainPage.css";
import { DataContext } from "../../context/DataContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const { setSheetId, errors, setErrors } = useContext(DataContext);
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const API_KEY = "AIzaSyDfGH9fno8N1KWLN9-Jhqm-zULjpAAm58w";
  const MENU_RANGE = "menus!A:E";

  const getSheetIdFromUrl = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  }, [location]);

  const handleSubmit = useCallback(
    async (sheetIdFromUrl = null) => {
      const extractedId = sheetIdFromUrl || extractSheetId(inputData);
      if (extractedId) {
        const isValid = await validateSheetId(extractedId);
        if (isValid) {
          localStorage.setItem("sheetId", extractedId);
          setSheetId(extractedId);
          navigate("/home");
        } else {
          alert("Invalid Excel link or Sheet ID.");
          setInputData("");
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        }
      } else {
        alert("Please enter a valid Excel link.");
      }
    },
    [inputData, setErrors, setSheetId, navigate]
  );

  React.useEffect(() => {
    const sheetId = getSheetIdFromUrl();
    if (sheetId) {
      handleSubmit(sheetId);
    }
  }, [location, getSheetIdFromUrl, handleSubmit]);

  const extractSheetId = (url) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const validateSheetId = async (sheetId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${MENU_RANGE}?key=${API_KEY}`
      );
      if (response.data.values) {
        return true;
      }
    } catch (error) {
      setErrors("Invalid sheet ID or the sheet is not accessible.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="Main__Box">
      <Input
        className="Main__Input"
        placeholder="Please input your Excel link here"
        onChange={(event) => setInputData(event.target.value)}
        value={inputData}
      />
      <Button
        className="Submit_Btn"
        onClick={() => handleSubmit()}
        disabled={loading}
      >
        {loading ? "Validating..." : "Submit"}
      </Button>

      {errors && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {errors}
        </Typography>
      )}
    </Box>
  );
};

export default MainPage;
