import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

const CartItem = ({ image, size, price, productName }) => {
  return (
    <HStack>
      <Image src={image} />
      <Stack direction="column">
        <Text>{productName}</Text>
        <Text>Size: {size}</Text>
      </Stack>
      <Stack direction="column">
        <Text>{productName}</Text>
        <Text>{price}</Text>
      </Stack>
    </HStack>
  );
};

export default CartItem;
