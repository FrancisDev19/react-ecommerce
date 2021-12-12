import {
  Box,
  Center,
  Stack,
  Image,
  Text,
  Heading,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Product = ({ product, onAddToCart }) => {
  const toast = useToast();

  return (
    <Box
      minH="xs"
      w="100%"
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
      border="1px"
      borderColor="gray.800"
    >
      <Center minH="250px">
        <Image
          borderTopRadius="lg"
          objectFit="cover"
          src={product.image.url}
          alt={product.name}
        />
      </Center>
      <Box p={5} maxW="full">
        <Stack>
          <Heading
            as="h6"
            size="sm"
            fontWeight="normal"
            color="gray.800"
            isTruncated
          >
            {product.name}
          </Heading>
          <Heading as="h5" size="md" fontWeight="black" color="gray.800">
            {product.price.formatted_with_symbol}
          </Heading>
          <Stack direction="row" justify="space-between" align="center">
            <Text
              dangerouslySetInnerHTML={{ __html: product.description }}
              color="gray.600"
              fontSize="sm"
              noOfLines={2}
            />
            <IconButton
              variant="ghost"
              color="gray.800"
              size="lg"
              _hover={{ bg: "gray.100" }}
              aria-label="Add to cart"
              icon={<MdOutlineAddShoppingCart />}
              onClick={() => {
                onAddToCart(product.id, 1);
                toast({
                  title: "Item Added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Product;
