import {
  Box,
  Stack,
  Heading,
  Image,
  IconButton,
  Circle,
} from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const logo = "logo.png";

  const location = useLocation();

  return (
    <Box
      w="full"
      p={10}
      pos="sticky"
      display="flex"
      justifyContent="space-between"
      boxShadow="lg"
    >
      <Link to="/">
        <Stack direction="row" align="center">
          <Image src={logo} h="25px" alt="Commerce" />
          <Heading as="h1" size="md">
            ECommerce
          </Heading>
        </Stack>
      </Link>
      {location.pathname === "/" && (
        <Box position="relative">
          <Link to="/cart">
            <IconButton
              variant="ghost"
              icon={<MdShoppingCart />}
              size="lg"
              borderRadius="full"
            />
          </Link>
          {totalItems > 0 && (
            <Circle
              position="absolute"
              h="20px"
              w="20px"
              top={0}
              right={0}
              bg="red"
              borderRadius="full"
              variant="solid"
              fontSize="sm"
              userSelect="none"
            >
              {totalItems}
            </Circle>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
