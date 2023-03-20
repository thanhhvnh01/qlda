import { getProductForHomePageAPI } from "@api/main";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import useMobile from "@hooks/useMobile";
import React, { useEffect, useState } from "react";
import { ResponsiveNavbarHeight } from "src/theme/ResponsiveTheme";
import LocaleHeader from "./LocaleHeader";
import Logo from "./Logo";
import NavbarItems from "./NavbarItems";
import NavbarVertical from "./NavbarVertical";
import { ToggleButton } from "./ToggleButton";

const NavBarContainer = ({ children, isMobile, ...props }) => {
  return (
    <Box
      w="100%"
      sx={{
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        position: "fixed",
        top: 0,
        zIndex: 6,
      }}
      bg="rgb(107,110,114,1)"
    >
      <LocaleHeader isMobile={isMobile} />
      <Flex
        as="nav"
        align="center"
        justifyContent="space-between"
        alignContent="center"
        wrap="wrap"
        h={ResponsiveNavbarHeight}
        p={4}
        maxW="1230px"
        sx={{ ml: "auto", mr: "auto" }}
        color={["#FFEA85", "#FFEA85", "#FFEA85", "#FFEA85"]}
        {...props}
      >
        {children}
      </Flex>
    </Box>
  );
};

const Navbar = ({ ...props }) => {
  const initLang = localStorage.getItem("language");
  const [isMobile] = useMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  const toggleOn = () => setOpen(true);
  const toggleOff = () => setOpen(false);

  const [dropDownData, setDropDownData] = useState([]);

  const fetchDropDownData = async (initLang) => {
    const res = await getProductForHomePageAPI(initLang);
    setDropDownData(res.data);
  };

  useEffect(() => {
    fetchDropDownData(initLang);
  }, [initLang]);
  // console.log(open);

  return (
    <NavBarContainer isMobile={isMobile} {...props}>
      <Logo w="100px" color={["white", "white", "primary.500", "primary.500"]} />
      <ToggleButton isMobile={isMobile} toggle={onOpen} isOpen={isOpen} />
      <NavbarItems dropDownData={dropDownData} isOpen={open} onMouseOver={toggleOn} onMouseLeave={toggleOff} />
      {isOpen && <NavbarVertical data={dropDownData} isOpen={isOpen} onClose={onClose} />}
    </NavBarContainer>
  );
};

export default Navbar;
