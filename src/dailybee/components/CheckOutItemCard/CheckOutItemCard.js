import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, Button, Typography, selectClasses } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DataContext } from "../../context/DataContext";
import EditCustomisePopup from "../EditCustomization/EditCustomization";

const CheckOutItemCard = ({ itemName, icon, item, price, number }) => {
  const { totalItems, setTotalItems } = useContext(DataContext);
  const [openCuston, setOpenCustom] = React.useState(false);

  const [finalNumber, setFinalNumber] = useState(number);
  const [totalPrice, setTotalPrice] = useState(price);

  const capitalizeFirstLetter = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const updateTotalItems = (fn, pp) => {
    const updatedItems = totalItems.map((selectedItem) => {
      const isNameMatched = selectedItem[0] === itemName;
      const isArrayMatched =
        JSON.stringify(selectedItem[3]) === JSON.stringify(item);
      if (isNameMatched && isArrayMatched) {
        return [selectedItem[0], pp * fn, selectedItem[2], selectedItem[3], fn];
      }
      return selectedItem;
    });

    setTotalItems(updatedItems);
    console.log(updatedItems, "updatedItems");
  };

  const handleAddition = () => {
    setFinalNumber((prev) => {
      const uNumber = prev + 1;
      const pperitem = price / number;
      updateTotalItems(uNumber, pperitem);
      return uNumber;
    });
  };
  console.log("finalnumber", finalNumber);
  const handleSubract = () => {
    if (finalNumber > 1) {
      setFinalNumber((prev) => {
        const uNumber = prev - 1;
        const pperitem = price / number;
        updateTotalItems(uNumber, pperitem);
        return uNumber;
      });
    } else {
      const updatedItems = totalItems.filter((selectedItem) => {
        const isNameMatched = selectedItem[0] === itemName;
        const isArrayMatched =
          JSON.stringify(selectedItem[3]) === JSON.stringify(item);
        return !(isNameMatched && isArrayMatched);
      });
      setTotalItems(updatedItems);
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "140px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ marginTop: "5px", marginRight: "10px" }}>
            {icon === "veg" ? (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "green",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : icon === "egg" ? (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "brown",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "red",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            )}
          </Box>

          <Box>
            <Box sx={{ fontSize: "20px", fontWeight: "600" }}>
              {capitalizeFirstLetter(itemName)}
            </Box>
            {item.map((sub) =>
              sub.map((subitems, index) => (
                <Box key={index}>
                  {subitems[0]}
                  {index < subitems.length - 1 && ","}
                </Box>
              ))
            )}

            <Button onClick={() => setOpenCustom(true)}>Edit</Button>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "2px",
              fontSize: "14px",
              width: "fit-content",
              height: "28px",
              marginTop: "5px",
            }}
          >
            <Button
              sx={{ minWidth: "30px", padding: "0 4px", fontSize: "12px" }}
              onClick={handleSubract}
            >
              -
            </Button>
            <Box sx={{ paddingX: 1, minWidth: "20px", textAlign: "center" }}>
              {finalNumber}
            </Box>
            <Button
              sx={{ minWidth: "30px", padding: "0 4px", fontSize: "12px" }}
              onClick={handleAddition}
            >
              +
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Typography sx={{ display: "flex", flexDirection: "row" }}>
              <CurrencyRupeeIcon sx={{ fontSize: "14px", fontWeight: 700 }} />
              <span sx={{ fontWeight: 700 }}>{price}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <EditCustomisePopup
        open={openCuston}
        setOpen={setOpenCustom}
        selectedPizza={itemName}
        price={price}
        selectedOption={item}
        fnumber={finalNumber}
      />
    </div>
  );
};

export default CheckOutItemCard;
