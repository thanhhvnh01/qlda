import { getProductDetailsAPI, getProductsAPI, getRelateProductAPI } from "@api/main";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProductSlider from "@components/ProductSlider";
import SizeRadioBox from "@components/SizeRadioBox";
import useMobile from "@hooks/useMobile";
import { handleAddCartAC } from "@store/actions/cart";
import {
  HairStyleDisplayConfig,
  LengthMeasureUnitDisplayConfig,
  MaterialTypeDisplayConfig,
  PackingRuleDisplayConfig,
  WeightMeasureUnitDisplayConfig,
} from "@utility/constant";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const query = useLocation().search;
  const productId = new URLSearchParams(query).get("productId");
  const [size, setSize] = useState("41");
  const [data, setData] = useState();
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [productId]);

  const fetchData = async () => {
    if (!!productId) {
      try {
        const res = await getProductsAPI();

        const productData = res.data.filter((i) => {
          return i.productId === Number(productId);
        });
        const related = res.data.filter((i) => {
          return i.brand === productData[0].brand;
        });
        setData(productData[0]);
        setRelatedProductData(related);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchRelatedProductData = async () => {
    if (!!productId) {
      try {
        const productRes = await getRelateProductAPI(12, 1, productId);
        setRelatedProductData(productRes.data.pageData);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchRelatedProductData(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleAddCartItem = () => {
    dispatch(
      handleAddCartAC({
        productId: data.productId,
        productName: data.productName,
        price: data.price,
        size: 40,
      })
    );
  };

  return (
    <>
      <Image
        id="product-image"
        mt={["87px", "87px", "113px", "113px", "113px"]}
        w="100%"
        h={["128px", "auto", "auto", "auto", "auto"]}
        src="/images/product_main.png"
      />
      <Container
        bg="#ffff"
        p={2}
        maxW={isMobile ? "100%" : "1200px"}
        mt={[0, "-100px", "-100px", "-100px", "-100px"]}
        sx={{
          mb: "20px",
          minHeight: "90vh !important",
          mr: "auto",
          ml: "auto",
          position: "relative",
          zIndex: 5,
          boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          pb: "30px",
        }}
      >
        <Box mt={10} pb={5}>
          <Grid templateColumns="repeat(7,1fr)">
            <GridItem colSpan={[7, 4, 4, 4, 4]}>
              <Center>
                <Image
                  sx={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
                  w={["390px", "390px", "460px", "460px", "480px"]}
                  h={["390px", "390px", "460px", "460px", "480px"]}
                  src={data?.image[imageIndex]}
                />
              </Center>
              <Center mt={4}>
                <HStack spacing="27px">
                  {data?.image?.map((image, index) => {
                    return (
                      <Image
                        onClick={() => {
                          setImageIndex(index);
                        }}
                        sx={{
                          boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);",
                          cursor: "pointer",
                          border: "1px solid #AAAAAA",
                        }}
                        key={index}
                        w={["40px", "50px", "50px", "90px", "90px"]}
                        h={["40px", "50px", "50px", "90px", "90px"]}
                        src={image}
                      />
                    );
                  })}
                </HStack>
              </Center>
            </GridItem>
            <GridItem colSpan={[7, 3, 3, 3, 3]}>
              <VStack alignItems="flex-start" p={3}>
                <Text fontSize={["20px", "20px", "26px", "26px", "26px"]} fontWeight="bold">
                  {data?.productName}
                </Text>
                <HStack>
                  <Text fontWeight="bold">
                    <FormattedMessage id="label.color" />:{" "}
                  </Text>
                </HStack>
              </VStack>
              <VStack alignItems="flex-start" p={3}>
                <VStack alignItems="flex-start" spacing="10px">
                  <Text>Size: </Text>
                  <SizeRadioBox setSize={setSize} />
                  <Button
                    _hover={{
                      boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);",
                    }}
                    variant="solid"
                    bg="tomato"
                    color="#ffff"
                    onClick={handleAddCartItem}
                  >
                    <FormattedMessage id="button.addCart" />
                  </Button>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
        {relatedProductData.length > 0 && (
          <Box mt={16}>
            <Box pb={[0, 0, 0, 6, 6]}>
              <Text
                fontSize={isMobile ? "20px" : "40px"}
                fontWeight="bold"
                textAlign="center"
                textTransform="uppercase"
                pt={5}
              >
                <FormattedMessage id="label.relatedProduct" />
              </Text>
              <Flex bg="black" w={97} h="3px" m="auto" />
            </Box>
            <Box bg="#ffff" p={isMobile ? 0 : 0}>
              <ProductSlider data={relatedProductData} isMobile={isMobile} />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
