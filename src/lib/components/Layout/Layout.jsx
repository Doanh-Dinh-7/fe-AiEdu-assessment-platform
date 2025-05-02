// src/components/Layout/Layout.jsx
import { Box, Flex, Progress } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { useContext } from "react";
import { ProgressContext } from "./ProgressContext";

const Layout = () => {
  const location = useLocation();
  const { showProgress } = useContext(ProgressContext);

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
      {showProgress && (
        <Box
          position="fixed"
          bottom="24px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={9999}
          w="400px"
        >
          <Progress
            size="md"
            isIndeterminate
            colorScheme="blue"
            borderRadius="md"
          />
          <Box textAlign="center" mt={2} color="blue.600" fontWeight="bold">
            Đang mã hoá tài liệu, vui lòng chờ...
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Layout;
