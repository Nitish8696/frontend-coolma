import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import PaymentForm from "./PaymentForm";

const steps = ["Billing Details", "Delivery", "Payment"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Initialize state to true

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryZip: "",
    deliveryNotes: "",
    paymentInfo: {}, // You can define the structure for payment information
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      deliveryAddress: "",
      deliveryCity: "",
      deliveryZip: "",
      deliveryNotes: "",
      paymentInfo: {},
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const calculateNextDisabled = () => {
    const formId = activeStep === 0 ? "billing-form" : "delivery-form";
    const form = document.getElementById(formId);
    if (form) {
      const inputs = form.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].hasAttribute("required") && !inputs[i].value) return true;
      }
    }
    return false;
  };
  useEffect(() => {
    setIsNextDisabled(calculateNextDisabled());
  }, [calculateNextDisabled]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form id="billing-form" className="shadow-2xl sm:p-10 p-2">
            <Typography variant="h6">Billing Details Form</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </form>
        );
      case 1:
        return (
          <form id="delivery-form" className="shadow-2xl sm:p-10 p-2">
            <Typography variant="h6">Delivery Form</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="deliveryAddress"
                  name="deliveryAddress"
                  label="Delivery Address"
                  fullWidth
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="deliveryCity"
                  name="deliveryCity"
                  label="Delivery City"
                  fullWidth
                  value={formData.deliveryCity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="deliveryZip"
                  name="deliveryZip"
                  label="Delivery Zip / Postal code"
                  fullWidth
                  value={formData.deliveryZip}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="deliveryNotes"
                  name="deliveryNotes"
                  label="Delivery Notes"
                  fullWidth
                  multiline
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </form>
        );
      case 2:
        return (
          <form className="shadow-2xl sm:p-10 p-2">
            <PaymentForm />
          </form>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div className="m-auto w-[70%] mt-10">
      <Box sx={{}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </div>
          ) : (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {getStepContent(activeStep)}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} disabled={isNextDisabled}>
  {activeStep === steps.length - 1 ? "Finish" : "Next"}
</Button>

              </Box>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}
