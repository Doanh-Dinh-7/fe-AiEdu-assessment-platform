import {
  Box,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaChevronDown,
  FaBook,
  FaUsers,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../../controller/jwt";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("VaiTro");
    localStorage.removeItem("MaTaiKhoan");
    await logout();
    navigate("/login");
  };

  const maTaiKhoan = localStorage.getItem("MaTaiKhoan") || "Đinh Sỹ Quốc Doanh";
  const vaiTro = localStorage.getItem("VaiTro") || "student";

  return (
    <Box
      w={isCollapsed ? "70px" : "250px"}
      h="100vh"
      bg="background"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      transition="width 0.2s"
      boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      borderRadius="12px"
      fontFamily="Inter, sans-serif"
    >
      <VStack spacing={4} align="stretch" w="100%">
        <IconButton
          icon={<FaBars color="#4A90E2" />}
          aria-label="Toggle sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
          mb={4}
          bg="surface"
          color="primary"
          _hover={{ bg: "primary", color: "white" }}
          borderRadius="12px"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        />

        {vaiTro === "lecturer" && (
          <>
            <Tooltip
              label="Ngân hàng đề thi"
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Button
                leftIcon={<FaBook color="#4A90E2" />}
                bg="surface"
                color="textPrimary"
                w="100%"
                h="50px"
                fontWeight="medium"
                borderRadius="12px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/exam-bank")}
                _hover={{ bg: "primary", color: "white" }}
                _active={{ bg: "primary", color: "white" }}
              >
                {!isCollapsed && "Ngân hàng đề thi"}
              </Button>
            </Tooltip>

            <Tooltip
              label="Quản lý lớp học phần"
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Button
                leftIcon={<FaUsers color="#4A90E2" />}
                bg="surface"
                color="textPrimary"
                w="100%"
                h="50px"
                fontWeight="medium"
                borderRadius="12px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/class")}
                _hover={{ bg: "primary", color: "white" }}
                _active={{ bg: "primary", color: "white" }}
              >
                {!isCollapsed && "Quản lý lớp học phần"}
              </Button>
            </Tooltip>

            <Tooltip
              label="Quản lý kỳ thi"
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Button
                leftIcon={<FaFileAlt color="#4A90E2" />}
                bg="surface"
                color="textPrimary"
                w="100%"
                h="50px"
                fontWeight="medium"
                borderRadius="12px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/exam-management")}
                _hover={{ bg: "primary", color: "white" }}
                _active={{ bg: "primary", color: "white" }}
              >
                {!isCollapsed && "Quản lý kỳ thi"}
              </Button>
            </Tooltip>
          </>
        )}

        {vaiTro === "student" && (
          <Tooltip label="Cuộc thi" placement="right" isDisabled={!isCollapsed}>
            <Button
              leftIcon={<FaFileAlt color="#4A90E2" />}
              bg="surface"
              color="textPrimary"
              w="100%"
              h="50px"
              fontWeight="medium"
              borderRadius="12px"
              boxShadow="0 2px 6px rgba(0,0,0,0.08)"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              onClick={() => navigate("/exams")}
              _hover={{ bg: "primary", color: "white" }}
              _active={{ bg: "primary", color: "white" }}
            >
              {!isCollapsed && "Cuộc thi"}
            </Button>
          </Tooltip>
        )}
      </VStack>

      <Menu>
        <MenuButton
          as={Button}
          bg="surface"
          w="100%"
          h="60px"
          rightIcon={<FaChevronDown color="#4A90E2" />}
          color="textPrimary"
          fontWeight="bold"
          borderRadius="12px"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          _hover={{ bg: "primary", color: "white" }}
        >
          <HStack>
            <Avatar
              size="sm"
              bg="gray.200"
              name={maTaiKhoan}
              color="textPrimary"
            />
            <Box textAlign="left" isTruncated>
              <Text
                fontWeight="bold"
                color="textPrimary"
                fontSize="md"
                isTruncated
              >
                {maTaiKhoan}
              </Text>
              <Text fontSize="sm" color="textSecondary">
                {vaiTro === "lecturer" ? "Giảng viên" : "Sinh viên"}
              </Text>
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg="surface"
          borderRadius="12px"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        >
          <MenuItem
            color="red"
            _hover={{ bg: "red", color: "white" }}
            borderRadius="12px"
            onClick={handleLogout}
          >
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Sidebar;
