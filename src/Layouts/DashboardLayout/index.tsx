import React from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const DashboardLayout: React.FC = ({ children }) => {
  const { handleLogout } = useAuth();
  return (
    <Box>
      <Box p="1.4rem">
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {children}
    </Box>
  );
};

export default DashboardLayout;
