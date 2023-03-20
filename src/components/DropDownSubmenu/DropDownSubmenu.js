import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropDownSubmenu = ({ title, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleMenuClick = (category) => {
    if (submenuOpen) {
      navigate(`/products?categoryId=${category.categoryId}`);
    }
  };

  const handleSubmenuClick = (category, productType) => {
    navigate(`/products?categoryId=${category.categoryId}&productTypeId=${productType.productTypeId}`);
  };

  return (
    <div
      className="dropdown-wrapper"
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <div className="dropdown-button">{title}</div>
      {open && (
        <div className="dropdown-menu">
          <ul>
            <Box
              bg="#575757"
              sx={{
                borderBottom: "none",
                // opacity: "1 !important",
                boxShadow: "-4px 0px 3px rgba(0, 0, 0, 0.25)",
              }}
            >
              {data?.map((item, index) => {
                const isLastItem = Boolean(index + 1 === data.length);
                return (
                  <li
                    onClick={() => {
                      handleMenuClick(item);
                    }}
                    onMouseEnter={() => {
                      setMenuIndex(index);
                      setSubmenuOpen(true);
                    }}
                    className={isLastItem ? "last-menu-item" : "menu-item"}
                    key={item.categoryId}
                  >
                    <Text>{item.categoryName}</Text>
                    {!!item.productTypes && menuIndex === index && (
                      <div className="submenu">
                        <ul>
                          <Box sx={{ borderBottom: "none" }}>
                            {item.productTypes.map((i, a) => {
                              const isLastChildItem = Boolean(a + 1 === item.productTypes.length);
                              return (
                                <li
                                  onMouseEnter={() => {
                                    setSubmenuOpen(false);
                                  }}
                                  onClick={() => {
                                    handleSubmenuClick(item, i);
                                  }}
                                  key={i.productTypeId}
                                  className={isLastChildItem ? "last-child-item" : "child-item"}
                                >
                                  <Text>{i.productTypeName}</Text>
                                </li>
                              );
                            })}
                          </Box>
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </Box>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownSubmenu;
