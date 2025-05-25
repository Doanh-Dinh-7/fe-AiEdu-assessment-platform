// src/components/Layout/Layout.jsx
import { Box, Flex, Progress, useTheme, Image, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { useContext } from "react";
import { ProgressContext } from "./ProgressContext";
import Logo from "../../../asset/images/logo-DUE.png";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  const { showProgress } = useContext(ProgressContext);
  const theme = useTheme();
  // Updated gradient to reflect technology and academic feel with blue and purple
  const gradientMain = `linear-gradient(to right, ${theme.colors.brand[500]}, ${theme.colors.accent[500]})`; // Gradient from blue to purple
  // // Updated gradient to reflect logo colors: orange, green, blue
  // const gradientLogo = `linear-gradient(to right, ${theme.colors.warning[500]}, ${theme.colors.success[500]}, ${theme.colors.brand[500]})`;

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
          bg={gradientMain}
          color="white"
          py={3}
          textAlign="center"
          fontSize="20px"
          fontWeight="bold"
          letterSpacing={1}
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          borderBottomRadius="md"
        >
          <Flex align="center" justify="center" gap={4} px={4}>
            <Image src={Logo} alt="Logo Trường Đại học Kinh tế" h="10" />
            <Flex direction="column">
              <Text fontSize="md" fontWeight="bold" color="white">
                Trường Đại học Kinh tế - Đại học Đà Nẵng
              </Text>
              <Text fontSize="sm">Hệ thống hỗ trợ thi Vấn đáp - Tự luận</Text>
            </Flex>
          </Flex>
        </Box>
        {/* Main content */}
        <Flex flex="1" minH={0} p={{ base: 2, md: 6 }}>
          <Box
            flex="1"
            overflowY="auto"
            p={{ base: 2, md: 6 }}
            bg="surface"
            borderRadius="md"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          >
            {/* Breadcrumb */}
            <Breadcrumbs disableBreadcrumb={disableBreadcrumb} />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", height: "100%" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Flex>
        {/* Footer */}
        <Box
          bg={gradientMain}
          color="white"
          py={1}
          textAlign="center"
          fontSize="14px"
          fontWeight="medium"
          borderTopRadius="md"
          boxShadow="0 -2px 6px rgba(0,0,0,0.04)"
        >
          Copyright © 2025 by Dragon Team {"        "} v2.0.0
        </Box>
        {showProgress && (
          <Box
            position="fixed"
            bottom={6}
            left="50%"
            transform="translateX(-50%)"
            zIndex={9999}
            w="400px"
            bg="surface"
            p={4}
            borderRadius="md"
            boxShadow="lg"
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
