import { Menu, MenuButton } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import React from "react";

const Cart = () => {
  return (
    <Menu>
      <MenuButton>
        <TiShoppingCart />
      </MenuButton>
    </Menu>
  );
};

export default Cart;
