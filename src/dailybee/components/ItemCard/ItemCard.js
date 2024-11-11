import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CustomisePopup from "../Customisation/Customisation";
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
const NonVegIcon = () => (
  <Box
    sx={{
      width: 12,
      height: 12,
      bgcolor: "red",
      borderRadius: "50%",
      display: "inline-block",
    }}
  />
);

const EggIcon = () => (
  <Box
    sx={{
      width: 12,
      height: 12,
      bgcolor: "brown",
      borderRadius: "50%",
      display: "inline-block",
    }}
  />
);

const ItemCard = ({ data, items, selectedItem, mrp, sellingprice, icon }) => {
  const [openpopup, setOpenpopup] = React.useState(false);
  const [item, setItem] = React.useState("");

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "200px",
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ marginRight: "10px" }}>
                {icon === "veg" ? (
                  <VegIcon />
                ) : icon === "egg" ? (
                  <EggIcon />
                ) : (
                  <NonVegIcon />
                )}
              </Box>

              <Typography
                component="div"
                variant="h5"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  width: { xs: "190px", sm: "321px" },
                  whiteSpace: "normal",
                }}
              >
                {capitalizeFirstLetter(selectedItem)}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700 }}>
                <CurrencyRupeeIcon sx={{ fontSize: "small" }} />
                {sellingprice}
              </Typography>
            </Box>
          </CardContent>
          <Box display="flex" flexDirection="column">
            <CardMedia
              component="img"
              sx={{
                width: { xs: "90%", sm: "121px" },
                height: { xs: "90px", sm: "120px" },
                objectFit: "cover",
              }}
              image="/pexels-pixabay-235985.jpg"
              alt="image"
            />
            <Button
              sx={{
                marginTop: "5px",
                cursor: "pointer",
                bgcolor: "white",
                color: "light-blue",
                fontWeight: "900",
                borderColor: "grey",
                border: "2px solid grey",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "120px",
              }}
              onClick={() => {
                setOpenpopup(true);
                setItem(selectedItem);
              }}
            >
              ADD +
            </Button>
          </Box>
        </Box>
      </Card>
      <CustomisePopup
        open={openpopup}
        setOpen={setOpenpopup}
        selectedPizza={item}
        price={sellingprice}
      />
    </div>
  );
};

export default ItemCard;
