import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Payment Method</FormLabel>
      <RadioGroup
        aria-label="payment-method"
        name="payment-method"
        value={paymentMethod}
        onChange={handlePaymentChange}
      >
        <FormControlLabel
          value="cash-on-delivery"
          control={<Radio />}
          label="Cash on Delivery"
        />
        <FormControlLabel value="upi" control={<Radio />} label="UPI" />
      </RadioGroup>
      {paymentMethod === 'upi' && (
        <TextField
          required
          id="upi-id"
          name="upi-id"
          label="UPI ID"
          fullWidth
          margin="normal"
        />
      )}
    </FormControl>
  );
}

export default PaymentForm;
