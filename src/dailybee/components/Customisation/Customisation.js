import React, { useCallback, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "./Customisation.css";
import { DataContext } from "../../context/DataContext";
import { Button, ButtonGroup } from "@mui/material";

const VegIcon = () => (
  <Box
    sx={{
      width: 12,
      height: 12,
      bgcolor: "green",
      borderRadius: "50%",
      display: "inline-block",
    }}
  />
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomisePopup({
  open,
  setOpen,
  selectedPizza,
  price,
}) {
  const { items, newData, setTotalItems } = useContext(DataContext);
  const [checked, setChecked] = useState([]);
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [isMinSelectionMet, setIsMinSelectionMet] = useState(true);

  // Function to initialize checkbox states based on newData[5]
  useEffect(() => {
    if (open && newData) {
      const initialCheckedState = [];

      newData
        .filter((value) => value && value[0] === selectedPizza)
        .forEach((value, index) => {
          // Check if newData[5] contains any preselected customization values
          const preselected = value[5] ? value[5].split(",") : [];
          const categoryChecked = [];

          value[2]?.forEach((item) => {
            // If the customization is in newData[5], mark the checkbox as checked
            if (preselected.includes(item[0])) {
              categoryChecked.push(item);
            }
          });

          // Save the checked values for this category
          initialCheckedState[index] = categoryChecked;
        });

      // Set the checked state with the initial values
      setChecked(initialCheckedState);
    }
  }, [open, newData, selectedPizza]);

  const handleSubmit = () => {
    let selectedItems = [];
    const totalItemCost =
      price < count * number ? count : Number(price) + count;

    let selectionsArray = checked.map((categoryChecked) => [
      ...categoryChecked,
    ]);

    selectedItems.push(selectedPizza);
    selectedItems.push(totalItemCost);

    items.slice(1).forEach((item) => {
      if (selectedPizza === item[0]) {
        selectedItems.push(item[11]);
      }
    });
    selectedItems.push(selectionsArray);
    selectedItems.push(number);

    // Check if the selected item already exists in totalItems
    setTotalItems((prevItems) => {
      // Find if the selected pizza and customization already exist
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item[0] === selectedPizza &&
          JSON.stringify(item[3]) === JSON.stringify(selectionsArray) // Compare customizations
      );

      if (existingItemIndex !== -1) {
        // If the item exists, increase the quantity (index 4 holds quantity)
        prevItems[existingItemIndex][4] += number; // Add new quantity to the existing one
        prevItems[existingItemIndex][1] += totalItemCost;
        return [...prevItems]; // Return the updated list
      } else {
        // If the item doesn't exist, add the new selected item
        return Array.isArray(prevItems)
          ? [...prevItems, selectedItems]
          : [selectedItems];
      }
    });

    setOpen(false); // Close the modal after submission
  };

  const handleToggle = (categoryIndex, value, maxSelection) => () => {
    const currentCategoryChecked = checked[categoryIndex] || [];
    const currentIndex = currentCategoryChecked.indexOf(value);
    const newChecked = [...currentCategoryChecked];

    if (maxSelection === 1) {
      setChecked((prevState) => {
        const updatedState = [...prevState];
        updatedState[categoryIndex] = currentIndex === -1 ? [value] : [];
        return updatedState;
      });
    } else {
      if (currentIndex === -1) {
        if (newChecked.length >= maxSelection) {
          newChecked.shift();
        }
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked((prevState) => {
        const updatedState = [...prevState];
        updatedState[categoryIndex] = newChecked;
        return updatedState;
      });
    }
  };

  const sumCount = useCallback(() => {
    let sum = 0;

    // Ensure checked is an array before calling forEach
    if (Array.isArray(checked)) {
      checked.forEach((categoryChecked) => {
        if (Array.isArray(categoryChecked)) {
          categoryChecked.forEach((e) => {
            sum += Number(e[1]);
          });
        }
      });
    }

    setCount(sum);
  }, [checked]);

  useEffect(() => {
    sumCount();
  }, [checked, sumCount]);

  const handleCountDecrease = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const handleCountIncrease = () => {
    setNumber(number + 1);
  };

  // Check if minimum selection requirements are met
  useEffect(() => {
    let isMinSelectionReached = true;

    if (Array.isArray(newData)) {
      newData
        .filter((value) => {
          // console.log("Checking value:", value); // Log each entry of newData
          return (
            value &&
            Array.isArray(value) &&
            value.length > 0 &&
            value[0] === selectedPizza
          );
        })
        .forEach((value, index) => {
          // console.log("Filtered value:", value); // Log after filtering

          // Ensure value[2] is an array before processing
          if (Array.isArray(value[2])) {
            const minSelection = parseInt(value[3], 10);
            const currentChecked = checked[index] || [];
            // console.log("Current checked:", currentChecked);

            // Allow 0 minimum selections, ensure the condition only breaks if min > 0
            if (minSelection > 0 && currentChecked.length < minSelection) {
              isMinSelectionReached = false;
            }
          } else {
            // console.warn("value[2] is not an array:", value[2]);
          }
        });
    } else {
      // console.warn("newData is not an array or is undefined");
    }

    setIsMinSelectionMet(isMinSelectionReached);
  }, [checked, newData, selectedPizza]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "100%" }}
      >
        <Box sx={style}>
          <Box className="Header">
            <Typography sx={{ fontWeight: 800 }}>Customize</Typography>
            <CloseIcon
              onClick={() => setOpen(false)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600 }}>{selectedPizza}</Typography>
          </Box>

          <List
            sx={{ width: "100%", maxWidth: 420, bgcolor: "background.paper" }}
          >
            {newData
              .filter(
                (value) =>
                  value && value.length > 0 && value[0] === selectedPizza
              )
              .map((value, index) => {
                if (value[2] && Array.isArray(value[2])) {
                  const categoryIndex = index;
                  const maxSelection = parseInt(value[4], 10);

                  return (
                    <div key={`group-${categoryIndex}`}>
                      <Typography sx={{ fontWeight: 600, padding: "10px 0px" }}>
                        {value[1]}
                      </Typography>
                      <Box className="Item_Box">
                        {value[2].map((item, itemIndex) => (
                          <Box
                            className="List_Content"
                            key={`item-${itemIndex}`}
                          >
                            <VegIcon />
                            <ListItem
                              sx={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: "25px",
                              }}
                            >
                              <ListItemButton
                                role={undefined}
                                onClick={handleToggle(
                                  categoryIndex,
                                  item,
                                  maxSelection
                                )}
                                dense
                              >
                                <ListItemText primary={item[0]} />
                                <Box className="Price_Checkbox">
                                  <CurrencyRupeeIcon
                                    sx={{ fontSize: "small" }}
                                  />
                                  <ListItemText
                                    primary={item[1]}
                                    sx={{ paddingRight: "10px" }}
                                  />
                                  <ListItemIcon>
                                    <Checkbox
                                      checked={
                                        Array.isArray(checked[categoryIndex]) &&
                                        checked[categoryIndex].includes(item)
                                      }
                                      tabIndex={-1}
                                      inputProps={{
                                        "aria-labelledby": item[0],
                                      }}
                                    />
                                  </ListItemIcon>
                                </Box>
                              </ListItemButton>
                            </ListItem>
                          </Box>
                        ))}
                      </Box>
                    </div>
                  );
                }
                return null;
              })}

            <Box sx={{ width: "100%" }}>
              <ButtonGroup
                sx={{
                  padding: "15px 10px 0px 0px",
                  width: "40%",
                }}
              >
                <Button
                  sx={{
                    minWidth: "30px", // Reduce button width
                    padding: "0 4px", // Compact button padding
                    fontSize: "12px",
                    cursor: "pointer", // Smaller font size
                  }}
                  onClick={handleCountDecrease}
                >
                  -
                </Button>
                <Typography
                  sx={{ paddingX: 1, minWidth: "20px", textAlign: "center" }}
                >
                  {number}
                </Typography>
                <Button
                  sx={{
                    minWidth: "30px", // Reduce button width
                    padding: "0 4px", // Compact button padding
                    fontSize: "12px",
                    cursor: "pointer", // Smaller font size
                  }}
                  onClick={handleCountIncrease}
                >
                  +
                </Button>
              </ButtonGroup>

              <Button
                sx={{
                  bgcolor: isMinSelectionMet ? "#1976D2" : "#1976D2",
                  color: isMinSelectionMet ? "white" : "rgba(0, 0, 0, 0)",
                  width: "55%",
                  pointerEvents: isMinSelectionMet ? "auto" : "none",
                  cursor: "pointer",
                }}
                onClick={handleSubmit}
                disabled={!isMinSelectionMet}
              >
                Add Item Total-{" "}
                {price < count ? count * number : Number(price) + count}
              </Button>
            </Box>
          </List>
        </Box>
      </Modal>
    </div>
  );
}