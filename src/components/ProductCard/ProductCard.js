import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

const ProductCard = ({ title, subtitle, thumbImage, images, sx, onClick, isBestSelling }) => {
  const [hoverImage, setHoverImage] = useState(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      onClick={() => {
        onClick();
      }}
      bg="#ffff"
      tabIndex={0}
      w={["175px", "182px", "182px", "270px", "270px"]}
      h={["280px", "290px", "290px", "480px", "480px"]}
      sx={{ ...sx, cursor: "pointer", position: "relative" }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Image
        w="100%"
        h={["233px", "238px", "238px", "360px", "360px"]}
        src={hoverImage === null ? thumbImage : images[hoverImage]}
        alt="product"
      />
      {isBestSelling && (
        <Box p={1} px={2} bg="red" top="10px" left="-3px" sx={{ position: "absolute" }}>
          <Text color="#ffff" fontSize="12px" fontWeight="500">
            <FormattedMessage id="label.bestSelling" />
          </Text>
        </Box>
      )}

      <Box mt={1}>
        <VStack spacing="5px" px={1} display="block">
          <Text
            textTransform="uppercase"
            fontWeight="600"
            m="auto"
            fontSize={["12px", "12px", "12px", "13px", "13px"]}
            noOfLines={2}
          >
            {title}
          </Text>
        </VStack>
        <Box sx={{ bottom: 0 }} mb={2} ml={1}>
          <Text textTransform="none" fontSize="12px" color="#AAAAAA">
            {`${subtitle}`}
          </Text>
          {isHover && (
            <HStack display={["none", "none", "none", "flex", "flex"]}>
              {images.slice(0, 3)?.map((image, index) => {
                return (
                  <Image
                    onMouseEnter={() => {
                      setHoverImage(index);
                    }}
                    onMouseLeave={() => {
                      setHoverImage(null);
                    }}
                    h="47px"
                    w="48px"
                    key={index}
                    src={image}
                  />
                );
              })}
            </HStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
