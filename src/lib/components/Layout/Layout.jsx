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
  const hideSidebar =
    location.pathname.startsWith("/exams/taking") ||
    location.pathname.startsWith("/exams/practice");
  const disableBreadcrumb = hideSidebar;

  return (
    <Flex
      direction="row"
      minH="100vh"
      bg="background"
      fontFamily="Inter, sans-serif"
    >
      {!hideSidebar && (
        <Flex>
          <Sidebar />
        </Flex>
      )}
      {/* Header + Main + Footer */}
      <Flex direction="column" flex="1" minH="100vh">
        {/* Header */}
        <Box
          bg="surface"
          color="textPrimary"
          py={3}
          textAlign="center"
          fontWeight="bold"
          fontSize="20px"
          letterSpacing={1}
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          borderBottomRadius="12px"
        >
          Phần mềm hỗ trợ thi vấn đáp
        </Box>
        {/* Main content */}
        <Flex flex="1" minH={0} p={{ base: 2, md: 6 }}>
          <Box
            flex="1"
            overflow="auto"
            p={{ base: 2, md: 6 }}
            bg="surface"
            borderRadius="12px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          >
            {/* Breadcrumb */}
            <Breadcrumbs disableBreadcrumb={disableBreadcrumb} />
            <Outlet />
          </Box>
        </Flex>
        {/* Footer */}
        <Box
          bg="surface"
          color="textSecondary"
          py={1}
          textAlign="center"
          fontSize="14px"
          fontWeight="medium"
          borderTopRadius="12px"
          boxShadow="0 -2px 6px rgba(0,0,0,0.04)"
        >
          Copyright © 2025 by ... v1.0.0
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
              colorScheme="primary"
              borderRadius="md"
            />
            <Box textAlign="center" mt={2} color="primary" fontWeight="bold">
              Đang mã hoá tài liệu, vui lòng chờ...
            </Box>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Layout;
