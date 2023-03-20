import React from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { ResponsiveLogoConfig } from "src/theme/ResponsiveTheme";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link href="/">
        <Flex>
          <Image boxSize={ResponsiveLogoConfig} src="/logo/AndreaHair_logo.svg" />
        </Flex>
      </Link>
    </Box>
  );
}
