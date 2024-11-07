// import React, { useContext, useEffect, useState, useCallback } from "react";
// import { Box, Button, Typography } from "@mui/material";
// // import EditCustomization from "../EditCustomization/EditCustomization";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import { DataContext } from "../../context/DataContext";
// import EditCustomisePopup from "../EditCustomization/EditCustomization";

// const VegIcon = () => (
//   <Box
//     sx={{
//       width: 12,
//       height: 12,
//       bgcolor: "green",
//       borderRadius: "50%",
//       display: "inline-block",
//     }}
//   />
// );
// const NonVegIcon = () => (
//   <Box
//     sx={{
//       width: 12,
//       height: 12,
//       bgcolor: "red",
//       borderRadius: "50%",
//       display: "inline-block",
//     }}
//   />
// );

// const EggIcon = () => (
//   <Box
//     sx={{
//       width: 12,
//       height: 12,
//       bgcolor: "brown",
//       borderRadius: "50%",
//       display: "inline-block",
//     }}
//   />
// );

// const CheckOutItemCard = ({ itemName, icon, item, price, number }) => {
//   const { totalItems, setTotalItems } = useContext(DataContext);
//   const [finalNumber, setFinalNumber] = useState(number);
//   const [openCuston, setOpenCustom] = React.useState(false);
//   const [totalPrice, setTotalPrice] = useState(price);
//   const [isUpdated, setIsUpdated] = useState(false); // Track if there's a need to update totalItems

//   const capitalizeFirstLetter = (str) =>
//     str
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");

//   // To update price whenever the number changes
//   useEffect(() => {
//     const updatedPrice = (price / number) * finalNumber;
//     setTotalPrice(updatedPrice);
//   }, [finalNumber, price, number]);

//   // To handle item addition
//   const handleAddition = () => {
//     setFinalNumber((prev) => prev + 1);
//     setIsUpdated(true); // Mark that something has changed
//   };

//   // To handle item removal
//   const handleSubract = () => {
//     if (finalNumber > 1) {
//       setFinalNumber((prev) => prev - 1);
//       setIsUpdated(true); // Mark that something has changed
//     } else {
//       // If the quantity is 1 and the user removes the item, remove it from totalItems
//       const updatedItems = totalItems.filter((selectedItem) => {
//         const isNameMatched = selectedItem[0] === itemName;
//         const isArrayMatched =
//           JSON.stringify(selectedItem[3]) === JSON.stringify(item);
//         return !(isNameMatched && isArrayMatched); // Remove item from the list
//       });
//       setTotalItems(updatedItems); // Update the totalItems in context
//     }
//   };

//   // Memoize the updateTotalItems function to prevent re-creation on each render
//   const updateTotalItems = useCallback(() => {
//     const updatedItems = totalItems.map((selectedItem) => {
//       const isNameMatched = selectedItem[0] === itemName;
//       const isArrayMatched =
//         JSON.stringify(selectedItem[3]) === JSON.stringify(item);

//       if (isNameMatched && isArrayMatched) {
//         return [
//           selectedItem[0],
//           totalPrice, // Updated total price
//           selectedItem[2],
//           selectedItem[3],
//           finalNumber, // Updated quantity
//         ];
//       }
//       return selectedItem;
//     });

//     // Only update the context if something has changed
//     const hasChanged = updatedItems.some(
//       (item) => item[4] !== finalNumber || item[1] !== totalPrice
//     );

//     if (hasChanged) {
//       setTotalItems(updatedItems);
//     }
//   }, [totalItems, itemName, totalPrice, finalNumber, setTotalItems, item]);

//   // Trigger totalItems update only when price or quantity changes and if there was a meaningful change
//   useEffect(() => {
//     if (isUpdated) {
//       updateTotalItems();
//       setIsUpdated(false); // Reset flag after updating
//     }
//   }, [totalPrice, finalNumber, isUpdated, updateTotalItems]); // Add 'updateTotalItems' in the dependencies array

//   return (
//     <div>
//       <Box
//         sx={{
//           height: "140px",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//           }}
//           xs={8}
//         >
//           <Box sx={{ marginTop: "5px", marginRight: "10px" }}>
//             {icon === "veg" ? (
//               <VegIcon />
//             ) : icon === "egg" ? (
//               <EggIcon />
//             ) : (
//               <NonVegIcon />
//             )}
//           </Box>

//           <Box>
//             <Box sx={{ fontSize: "20px", fontWeight: "600" }}>
//               {capitalizeFirstLetter(itemName)}
//             </Box>
//             {item.map((sub) => {
//               return sub.map((subitems, index) => {
//                 return (
//                   <Box key={index}>
//                     {subitems[0]}
//                     {index < subitems.length - 1 && ","}
//                   </Box>
//                 );
//               });
//             })}

//             <Button
//               onClick={() => {
//                 setOpenCustom(true);
//               }}
//             >
//               Edit
//             </Button>
//           </Box>
//         </Box>
//         <Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               border: "1px solid #ddd",
//               borderRadius: "4px",
//               padding: "2px", // Reduce padding for a smaller box
//               fontSize: "14px", // Reduce font size for compact display
//               width: "fit-content",
//               height: "28px",
//               marginTop: "5px", // Fit content to the button and count
//             }}
//           >
//             <Button
//               sx={{
//                 minWidth: "30px", // Reduce button width
//                 padding: "0 4px", // Compact button padding
//                 fontSize: "12px",
//                 cursor: "pointer", // Smaller font size
//               }}
//               onClick={handleSubract}
//             >
//               -
//             </Button>
//             <Box sx={{ paddingX: 1, minWidth: "20px", textAlign: "center" }}>
//               {finalNumber}
//             </Box>
//             <Button
//               sx={{
//                 minWidth: "30px", // Reduce button width
//                 padding: "0 4px", // Compact button padding
//                 fontSize: "12px",
//                 cursor: "pointer", // Smaller font size
//               }}
//               onClick={handleAddition}
//             >
//               +
//             </Button>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "10px",
//             }}
//           >
//             <span>
//               <Typography sx={{ display: "flex", flexDirection: "row" }}>
//                 <span sx={{ paddingTop: "1px" }}>
//                   <CurrencyRupeeIcon
//                     sx={{ fontSize: "14px", fontWeight: 700 }}
//                   />
//                 </span>
//                 <span sx={{ fontWeight: 700 }}>{totalPrice}</span>
//               </Typography>
//             </span>
//           </Box>
//         </Box>
//       </Box>
//       {/* <EditCustomization
//         open={openCuston}
//         setOpen={setOpenCustom}
//         selectedPizza={itemName}
//         price={price}
//       /> */}
//       <EditCustomisePopup
//         open={openCuston}
//         setOpen={setOpenCustom}
//         selectedPizza={itemName}
//         price={price}
//         selectedOption={item}
//       />
//     </div>
//   );
// };

// export default CheckOutItemCard;

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, Button, Typography, selectClasses } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DataContext } from "../../context/DataContext";
import EditCustomisePopup from "../EditCustomization/EditCustomization";

const CheckOutItemCard = ({
  itemName,
  icon,
  item,
  price,
  number,
  // initialNumber,
}) => {
  const { totalItems, setTotalItems } = useContext(DataContext);
  const [openCuston, setOpenCustom] = React.useState(false);

  const [finalNumber, setFinalNumber] = useState(number);
  const [totalPrice, setTotalPrice] = useState(price);

  // Capitalize item names
  const capitalizeFirstLetter = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Update total price based on the number of items
  // useEffect(() => {
  //   setTotalPrice(price * finalNumber);
  //   console.log("totalprice:", totalPrice);
  //   console.log("price", price);
  //   console.log("number", number);
  //   console.log("finalNumber", finalNumber);
  // }, [finalNumber, price, number]);

  // Update the context whenever finalNumber or totalPrice changes
  const updateTotalItems = (fn, pp) => {
    const updatedItems = totalItems.map((selectedItem) => {
      const isNameMatched = selectedItem[0] === itemName;
      const isArrayMatched =
        JSON.stringify(selectedItem[3]) === JSON.stringify(item);
      if (isNameMatched && isArrayMatched) {
        return [
          selectedItem[0],
          pp * fn, // Updated total price
          selectedItem[2],
          selectedItem[3],
          fn, // Updated quantity
        ];
      }
      return selectedItem;
    });
    // Only update if there's a change in finalNumber or totalPrice
    // const hasChanged = updatedItems.some(
    setTotalItems(updatedItems);
    console.log(updatedItems, "updatedItems");
    //   (selectedItem) =>
    //     selectedItem[4] !== finalNumber || selectedItem[1] !== totalPrice
    // );

    // if (hasChanged) {
    //   setTotalItems(updatedItems);
    // }
  };

  // Call updateTotalItems when finalNumber or totalPrice changes
  // useEffect(() => {
  //   updateTotalItems();
  //   console.log(totalItems, "totalOItems");
  // }, [finalNumber]);

  // Handle item addition
  const handleAddition = () => {
    setFinalNumber((prev) => {
      const uNumber = prev + 1;
      const pperitem = price / number;
      updateTotalItems(uNumber, pperitem);
      return uNumber;
    });
  };
  console.log("finalnumber", finalNumber);
  // Handle item subtraction
  const handleSubract = () => {
    if (finalNumber > 1) {
      setFinalNumber((prev) => {
        const uNumber = prev - 1;
        const pperitem = price / number;
        updateTotalItems(uNumber, pperitem);
        return uNumber;
      });
    } else {
      // Remove item if finalNumber is 1 and user tries to subtract
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
