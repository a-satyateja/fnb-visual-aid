import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuPopUp from "../MenuPopup/MenuPopup";

const MenuComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <MenuPopUp anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </div>
  );
};

export default MenuComp;
