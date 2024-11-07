import {
  Box,
  Divider,
  List,
  ListItemButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import ItemCard from "../ItemCard/ItemCard";

const MenuItems = () => {
  const { data, items } = useContext(DataContext);

  // Store expanded states for all items, initializing all to true (expanded)
  const [expandedItems, setExpandedItems] = useState(
    data.slice(1).map((_, index) => index)
  );

  const sortedData = data.slice(1).sort((a, b) => a[4] - b[4]);

  const handleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const capitalizeFirstLetter = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "0", sm: "0 16px" },
        margin: "0 auto",
        maxWidth: { xs: "100%", sm: "700px" },
        boxSizing: "border-box",
      }}
    >
      {data &&
        sortedData.map((dat, id) => (
          <MenuItem
            sx={{
              flexDirection: "row",
              "&:hover": { backgroundColor: "transparent" },
              "&:focus": { backgroundColor: "transparent" },
            }}
            key={id}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton
                onClick={() => handleExpand(id)}
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  "&:focus": { backgroundColor: "transparent" },
                  padding: { xs: "10px 8px", sm: "16px" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "row" },
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    style={{
                      color: "#2884C6",
                      fontWeight: 800,
                      fontSize: { xs: "16px", sm: "20px" },
                    }}
                  >
                    {capitalizeFirstLetter(dat[0])}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "20px", sm: "24px" } }}>
                    {expandedItems.includes(id) ? "-" : "+"}
                  </Typography>
                </Box>
              </ListItemButton>
              {expandedItems.includes(id) &&
                items.slice(1).map((item, itemsindex) => {
                  if (item[3] === dat[0]) {
                    return (
                      <ItemCard
                        key={itemsindex}
                        selectedItem={item[0]}
                        icon={item[11]}
                        items={items}
                        data={data}
                        mrp={item[9]}
                        sellingprice={item[10]}
                      />
                    );
                  }
                  return null;
                })}
              <Divider sx={{ borderBottomWidth: 2, marginTop: "5px" }} />
            </List>
          </MenuItem>
        ))}
    </Box>
  );
};

export default MenuItems;
