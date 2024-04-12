import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import ArrowDropDownIcon

export default function Accordian() {
  return (
    <div className='px-2 m-auto block sm:hidden '>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />} // Use ArrowDropDownIcon here
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Useful Links</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className="text-[16px] flex flex-col gap-3 ">
            <h2>Privacy Policy</h2>
            <h2>Returns</h2>
            <h2>Terms & Conditions</h2>
            <h2>FAQs</h2>
            <h2>We’re Safe</h2>
            <h2>Track Order</h2>
            <h2>Contact Us</h2>
            <h2>Contact U</h2>
          </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />} // Use ArrowDropDownIcon here
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <h2>Men</h2>
            <h2>Women</h2>
            <h2>Baby</h2>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />} // Use ArrowDropDownIcon here
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>My Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <h2>Account</h2>
            <h2>Orders</h2>
            <h2>Addresses</h2>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
