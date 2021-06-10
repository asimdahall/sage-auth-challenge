import React from "react";
import useUser from "../../hooks/useUser";
import { Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <Flex padding="1.6rem" width="100vh" h="4rem">
      {JSON.stringify(user)}
    </Flex>
  );
};

export default Dashboard;
