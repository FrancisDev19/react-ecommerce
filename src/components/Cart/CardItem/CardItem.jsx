import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Stack,
  Image,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

const CardItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
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
          src={item.image.url}
          alt={item.name}
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
            {item.name}
          </Heading>
          <Heading as="h5" size="md" fontWeight="black" color="gray.800">
            {item.price.formatted_with_symbol}
          </Heading>
          <Stack direction="row" justify="space-between" align="center">
            <ButtonGroup alignItems="center">
              <Button
                size="sm"
                variant="solid"
                colorScheme="white"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  handleUpdateCartQty(item.id, item.quantity - 1);
                  toast({
                    title: "Item removed",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                -
              </Button>
              <Text color="gray.800"> {item.quantity} </Text>
              <Button
                size="sm"
                variant="solid"
                colorScheme="white"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  handleUpdateCartQty(item.id, item.quantity + 1);
                  toast({
                  title: "Item added",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
                }}
              >
                +
              </Button>
            </ButtonGroup>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                handleRemoveFromCart(item.id);
                toast({
                  title: "Item removed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardItem;
