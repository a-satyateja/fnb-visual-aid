import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [customizations, setCustomizations] = useState([]);
  const [group, setGroup] = useState([]);
  const [newData, setNewData] = useState([]); // Changed from useState([]) to useState to be able to modify newData
  const [totalItems, setTotalItems] = useState([]);
  const [sheetId, setSheetId] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [errors, setErrors] = useState([]);

  const API_KEY = "AIzaSyDfGH9fno8N1KWLN9-Jhqm-zULjpAAm58w";
  const MENU_RANGE = "menus!A:E";
  const ITEMS_RANGE = "items!A:P";
  const CUSTOMIZATIONS_RANGE = "customizations!A:I";
  const CUSTOM_GROUP_RANGE = "custom_group_mapping!A:H";

  const addError = (error, requestType) => {
    setErrors((prevErrors) => [
      ...prevErrors,
      { requestType, message: error.message },
    ]);
  };

  console.log("error::", errors);

  useEffect(() => {
    if (sheetId === "") return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${MENU_RANGE}?key=${API_KEY}`
        );
        setData(response.data.values);
      } catch (error) {
        console.error("Error fetching data:", error);
        addError(error, "Menu Data Fetch");
      }
    };
    fetchData();

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${ITEMS_RANGE}?key=${API_KEY}`
        );
        setItems(response.data.values);
      } catch (error) {
        console.error("Error fetching items:", error);
        addError(error, "Items Data Fetch");
      }
    };
    fetchItems();

    const fetchCustomizations = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${CUSTOMIZATIONS_RANGE}?key=${API_KEY}`
        );
        setCustomizations(response.data.values);
      } catch (error) {
        console.error("Error fetching customizations:", error);
        addError(error, "Customizations Data Fetch");
      }
    };
    fetchCustomizations();

    const fetchCustomGroups = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${CUSTOM_GROUP_RANGE}?key=${API_KEY}`
        );
        setGroup(response.data.values);
      } catch (error) {
        console.error("Error fetching custom groups:", error);
        addError(error, "Custom Groups Data Fetch");
      }
    };
    fetchCustomGroups();
  }, [sheetId]);

  useEffect(() => {
    const groupCustomise = () => {
      const updatedData = [];
      group.slice(1).forEach((e) => {
        let arr = [];
        arr.push(e[0]);
        arr.push(e[1]);

        let arr3 = [];
        e[2].split(",").forEach((it) => {
          let arr2 = [];

          customizations.slice(1).forEach((custom) => {
            if (custom[0] === it.trim()) {
              arr2[0] = it.trim();
              arr2[1] = custom[5] || "";
              arr2[2] = e[4] || "";
            }
          });
          if (arr2.length > 0) {
            arr3.push(arr2);
          }
        });
        arr.push(arr3, e[5], e[6]);
        arr.push(e[3]);

        if (arr3.length > 0) {
          updatedData.push(arr);
        }
      });
      setNewData(updatedData); // Update the state directly
    };
    groupCustomise();
  }, [group, customizations]);

  useEffect(() => {
    const updatedFinalPrice = totalItems.reduce(
      (acc, item) => acc + item[1],
      0
    );
    setFinalPrice(updatedFinalPrice);
  }, [totalItems]);

  return (
    <DataContext.Provider
      value={{
        data,
        items,
        customizations,
        group,
        newData,
        totalItems,
        setTotalItems,
        setSheetId,
        sheetId,
        finalPrice,
        setFinalPrice,
        errors,
        setErrors,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
