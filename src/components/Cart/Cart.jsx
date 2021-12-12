import {
  Box,
  Flex,
  Button,
  ButtonGroup,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import CardItem from "./CardItem/CardItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const EmptyCart = () => (
    <Box pt={14}>
      <Heading size="md">
        You have no items in your shopping cart,{' '}
        <Link to="/">
          start adding some!
        </Link>
      </Heading>
    </Box>
  );

  const FilledCart = () => (
    <Box pt={14}>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        {cart.line_items.map((item) => (
          <CardItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
        ))}
      </SimpleGrid>
      <Flex justify="space-between" direction={['column', 'row']} pt={10}>
        <Heading as="h5" fontSize={['xl', '2xl', '4xl']} pb={[5, null]}>
          {" "}
          Subtotal: {cart.subtotal.formatted_with_symbol}{" "}
        </Heading>
        <ButtonGroup>
          <Button size="lg" variant="solid" colorScheme="red" onClick={handleEmptyCart}>
            Empty Cart
          </Button>
          <Link to="/checkout">
            <Button size="lg" variant="solid" colorScheme="green">
              Checkout
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Box py={14}>
      <Heading as="h2" size="lg">
        Your Shopping Cart
      </Heading>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Box>
  );
};

export default Cart;
