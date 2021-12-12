import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Box, Heading, Flex, ButtonGroup, Button } from "@chakra-ui/react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "../Confirmation";
import { useEffect, useState } from "react";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Checkout = ({ cart }) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const next = (data) => {
    setShippingData(data)
  }

  const steps = [
    {
      label: "Shipping address",
      content: <AddressForm checkoutToken={checkoutToken} next={next} />,
    },
    { label: "Payment details", content: <PaymentForm checkoutToken={checkoutToken} prevStep={prevStep} /> },
    { label: "Confirmation", content: <Confirmation /> },
  ];

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  return (
    <Box py={14}>
      <Heading variant="h4" textAlign="center" pb={10}>
        Checkout
      </Heading>
      {checkoutToken && (
        <Steps activeStep={activeStep}>
          {steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
      )}
      <Flex justify="space-between">
        <Link to="/cart">
          <Button leftIcon={<MdArrowBack />} variant="link">
            Back to cart
          </Button>
        </Link>
        <ButtonGroup>
          {activeStep > 0 && (
            <Button onClick={prevStep} variant="ghost">
              {" "}
              Previous{" "}
            </Button>
          )}
          <Button onClick={nextStep} variant="ghost">
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Checkout;
