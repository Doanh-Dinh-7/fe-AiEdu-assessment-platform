// src/components/Layout/Layout.jsx
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => {
  const location = useLocation();

  // Ẩn sidebar và disable breadcrumb ở các route thi/luyện thi
  const hideSidebar = ["/exams/taking", "/exams/practice"].includes(
    location.pathname
  );
  const disableBreadcrumb = hideSidebar;

  return (
    <Flex h="100vh" bg="gray.50">
      {!hideSidebar && (
        <Flex>
          <Sidebar />
        </Flex>
      )}
      <Box flex="1" overflow="auto" p={4}>
        {/* Breadcrumb */}
        <Breadcrumbs disableBreadcrumb={disableBreadcrumb} />
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
