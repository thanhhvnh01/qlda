import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

const CartItem = ({ image, size, price, productName, onDelete }) => {
  const dispatch = useDispatch();

  return (
    <HStack color="wheat" w="100%" mb={2}>
      <Image src={image} height="70px" />
      <Stack w="100%">
        <Stack direction="row" justifyContent="space-between">
          <Text>{productName}</Text>
          <Text
            color="tomato"
            cursor="pointer"
            onClick={() => {
              onDelete();
            }}
          >
            X
          </Text>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Text>Size: {size}</Text>
          <Text>{Intl.NumberFormat("vi", { style: "currency", currency: "vnd" }).format(price)}</Text>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default CartItem;
