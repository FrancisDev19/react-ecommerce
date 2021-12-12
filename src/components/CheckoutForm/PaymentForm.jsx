import { Box, Heading, Flex, Button, Divider } from "@chakra-ui/react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, prevStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
    }
  };
  return (
    <Box py={10}>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Heading as="h6" py={10}>
        Order Summary
      </Heading>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <Flex justify="space-between" py={10}>
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="green"
                  disabled={!stripe}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </Flex>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </Box>
  );
};

export default PaymentForm;
