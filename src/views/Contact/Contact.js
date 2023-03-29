import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
  GridItem,
  Grid,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useMobile from "@hooks/useMobile";
import SupporterCard from "@components/SupporterCard";
import { getSupportersAPI, sendMessageAPI } from "@api/main";
import { FormProvider, RHFInput } from "@components/hook-form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@api/handleApiError";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "@components/CartItem/CartItem";
import { handleDeleteCartAC } from "@store/actions/cart";

const Contact = () => {
  const [isMobile] = useMobile();
  const cart = useSelector((state) => state.cart);
  const [supporterData, setSupporterData] = useState([]);

  const intl = useIntl();
  const toast = useToast();
  const dispatch = useDispatch();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const ContactSchema = yup.object().shape({
    firstName: yup.string().required().max(256),
    lastName: yup.string().required().max(256),
    email: yup.string().email().required().max(256),
    phoneNumber: yup.string().required(),
    message: yup.string().required(),
  });

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(ContactSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
    };
    try {
      await sendMessageAPI(formData);
      toast({
        title: "Success",
        description: intl.formatMessage({ id: "toast.messageContactSuccess" }),
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  const fetchSupporterData = async () => {
    try {
      const res = await getSupportersAPI(12, 1);
      setSupporterData(res.data.pageData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSupporterData();
  }, []);

  // action
  const handleDeleteItem = (key) => {
    dispatch(handleDeleteCartAC(key));
    toast({
      title: "Đã xóa khỏi giỏ hàng",
      status: "error",
      duration: 1500,
    });
  };

  return (
    <Box bg="#F5F5F5">
      <Image
        mt={["87px", "87px", "113px", "113px", "113px"]}
        w="100%"
        h={["128px", "auto", "auto", "auto", "auto"]}
        src="/images/product_main.png"
      />

      <Container
        p={0}
        maxW={["100%", "100%", "100%", "1200px", "1200px"]}
        sx={{ mt: 0, minHeight: "60vh !important", mr: "auto", ml: "auto" }}
      >
        <Box py={3} px={3}>
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem color="#3182CE">
              <BreadcrumbLink href="/">
                <FormattedMessage id="label.home" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Breadcrumb href="/contact">
                <FormattedMessage id="title.contact" />
              </Breadcrumb>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <Text
            fontSize={["20px", "20px", "20px", "40px", "40px"]}
            fontWeight="bold"
            color="#000000"
            textAlign="center"
            textTransform="uppercase"
          >
            <FormattedMessage id="label.contactUs" />
          </Text>
          <Text
            fontSize={["12px", "12px", "12px", "18px", "18px"]}
            fontWeight="regular"
            color="#000000"
            textAlign="center"
            textTransform="uppercase"
          >
            <FormattedMessage id="label.any" />
          </Text>
        </Box>

        <Flex bg="#FFFFFF" my={5}>
          <Grid templateColumns="repeat(10, 1fr)" w="100%">
            <GridItem colSpan={5} bg="grey">
              <Box sx={{ p: 10 }}>
                <Text
                  fontSize={["16px", "24px", "24px", "24px", "24px"]}
                  fontWeight="bold"
                  color="#FFFFFF"
                  textTransform="uppercase"
                >
                  <FormattedMessage id="label.contactInformation" />
                </Text>
                {cart.carts?.map((c, index) => {
                  return (
                    <CartItem
                      key={index}
                      image={c.image}
                      size={c.size}
                      price={c.price}
                      productName={c.productName}
                      onDelete={() => {
                        handleDeleteItem(index);
                      }}
                    />
                  );
                })}
              </Box>
            </GridItem>
            <GridItem w="100%" colSpan={5} sx={{ mt: "auto", mb: "auto", display: "flex" }}>
              <Box w="100%" p={6} py={10}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Grid templateColumns="repeat(2,1fr)" gap={10}>
                    <GridItem colSpan={1}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.firstName" />
                        </Text>
                        <RHFInput name="firstName" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.lastName" />
                        </Text>
                        <RHFInput name="lastName" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.email" />
                        </Text>
                        <RHFInput name="email" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.phoneNumber" />
                        </Text>
                        <RHFInput name="phoneNumber" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.message" />
                        </Text>
                        <RHFInput
                          placeholder={intl.formatMessage({ id: "placeholder.message" })}
                          name="message"
                          variant="flushed"
                        />
                      </Box>
                    </GridItem>
                  </Grid>
                  <Box sx={{ display: "flex", mt: 10 }}>
                    <Button
                      _hover={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
                      disabled={!isDirty || !isValid}
                      type="submit"
                      ml="auto"
                      p={6}
                      bg="#000000"
                      variant="solid"
                      fontWeight="500"
                      textTransform="none"
                    >
                      <FormattedMessage id="button.sendMessage" />
                    </Button>
                  </Box>
                </FormProvider>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
