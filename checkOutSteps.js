import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp';
import LibraryAddCheckSharpIcon from '@mui/icons-material/LibraryAddCheckSharp';
import AccountBalanceWalletSharpIcon from '@mui/icons-material/AccountBalanceWalletSharp';
import "./checkOutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingSharpIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckSharpIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceWalletSharpIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
