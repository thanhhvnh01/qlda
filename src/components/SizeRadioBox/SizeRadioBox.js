import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import React from "react";

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        boxShadow="md"
        _checked={{
          borderColor: "#FF0000",
          borderWidth: "2px",
        }}
        // _focus={{
        //   boxShadow: "outline",
        // }}
        px={3}
        py={2}
        fontWeight="bold"
      >
        {props.children}
      </Box>
    </Box>
  );
};

const SizeRadioBox = ({ setSize }) => {
  const options = ["40", "41", "42", "43"];

  const handleChange = (value) => {
    setSize(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "size",
    defaultValue: "41",
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default SizeRadioBox;
