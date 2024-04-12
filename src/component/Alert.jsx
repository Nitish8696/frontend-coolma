import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { alert } from "../Ultiles/Cartslices";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddToCartAlert = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(alert(false)); // Dispatch the alert action with false to hide the alert
  };

  return (
    <div>
      {/* Add to Cart Button */}
      {/* <button onClick={handleAddToCart}>Add to Cart</button> */}

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={cart.alert} // Use the alert state from Redux store
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ backgroundColor: "#00AFEF" }} // Change background color to your desired color
        >
          Item added to cart
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddToCartAlert;
