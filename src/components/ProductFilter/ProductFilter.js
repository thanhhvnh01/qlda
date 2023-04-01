import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import { RHFRadioGroup } from "@components/hook-form";
import { arrayToSelectOptions } from "@utility/ultils";
import { FormattedMessage } from "react-intl";

const ProductFilter = ({ categoryId, setValue }) => {
  const options = [
    {
      label: "Adidas",
      id: 1,
    },
    {
      label: "Nike",
      id: 2,
    },
    {
      label: "Puma",
      id: 3,
    },
  ];

  return (
    <Box>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem borderTop="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton py={3}>
                <Box flex="1" textAlign="left">
                  <Text fontSize={["16px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
                    <FormattedMessage id="label.category" />
                  </Text>
                </Box>
                {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
              </AccordionButton>
              <AccordionPanel p={0} pl={[3, 0, 0, 3, 3]} sx={{ borderTop: "1px solid #AAAAAA" }}>
                <RHFRadioGroup
                  isClearable
                  selectedOption={categoryId}
                  handleClearOption={() => {
                    setValue("categoryId", null);
                  }}
                  name="categoryId"
                  options={arrayToSelectOptions(options, "label", "id")}
                />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ProductFilter;
