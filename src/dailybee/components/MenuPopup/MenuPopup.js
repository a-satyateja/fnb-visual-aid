import React, { useContext, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataContext } from "../../context/DataContext";
import CustomisePopup from "../Customisation/Customisation";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import "./MenuPopup.css";

const MenuPopUp = (props) => {
  const { data, items } = useContext(DataContext);
  const [modal, setModal] = useState(false);
  const [expand, setExpand] = useState(null);
  const [selectedPizza, SetSelectedPizza] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const handleExpand = (id) => {
    setExpand((e) => (e === id ? null : id));
  };
  const sortedData = data.slice(1).sort((a, b) => a[4] - b[4]);

  return (
    <div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box className="Menu_Header">
          <Typography style={{ fontWeight: 700, paddingLeft: "20px" }}>
            Our Menu
          </Typography>
          <CloseIcon onClick={props.handleClose} sx={{ cursor: "pointer" }} />
        </Box>
        <Divider className="Divider" />

        {data &&
          sortedData.map((dat, id) => {
            return (
              <MenuItem sx={{ flexDirection: "row" }} key={id}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton
                    onClick={() => {
                      handleExpand(id);
                    }}
                  >
                    <ListItemText
                      style={{ color: "#2884C6", fontWeight: 800 }}
                      primary={dat[0]}
                    />
                    <div>{expand === id ? "-" : "+"}</div>
                  </ListItemButton>
                  {expand === id &&
                    items
                      .slice(1)
                      .filter((item) => item[4] !== undefined)
                      .sort((a, b) => a[4] - b[4])
                      .map(
                        (item, id) =>
                          item[3] === dat[0] && (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={item[0]}
                              onClick={() => {
                                setModal(true);
                                SetSelectedPizza(item[0]);
                                setPrice(item[10]);
                              }}
                            >
                              <ListItemText primary={item[0]} />
                            </ListItemButton>
                          )
                      )}
                </List>
              </MenuItem>
            );
          })}
        {modal && (
          <CustomisePopup
            open={modal}
            setOpen={setModal}
            selectedPizza={selectedPizza}
            price={price}
            handleclose={props.handleClose}
          />
        )}
      </Menu>
    </div>
  );
};

export default MenuPopUp;
