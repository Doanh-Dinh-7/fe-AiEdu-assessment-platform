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
      bg="blue.300"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      transition="width 0.2s"
    >
      <VStack spacing={4} align="stretch" w="100%">
        <IconButton
          icon={<FaBars />}
          aria-label="Toggle sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
          mb={4}
        />

        {vaiTro === "lecturer" && (
          <>
            <Tooltip
              label="Ngân hàng đề thi"
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Button
                leftIcon={<FaBook />}
                bg="white"
                color="black"
                w="100%"
                h="50px"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/exam-bank")}
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
                leftIcon={<FaUsers />}
                bg="white"
                color="black"
                w="100%"
                h="50px"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/class")}
              >
                {!isCollapsed && "Quản lý lớp học phần"}
              </Button>
            </Tooltip>

            <Tooltip
              label="Quản lý bài thi"
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Button
                leftIcon={<FaFileAlt />}
                bg="white"
                color="black"
                w="100%"
                h="50px"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                onClick={() => navigate("/exam-management")}
              >
                {!isCollapsed && "Quản lý bài thi"}
              </Button>
            </Tooltip>
          </>
        )}

        {vaiTro === "student" && (
          <Tooltip label="Cuộc thi" placement="right" isDisabled={!isCollapsed}>
            <Button
              leftIcon={<FaFileAlt />}
              bg="white"
              color="black"
              w="100%"
              h="50px"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              onClick={() => navigate("/exams")}
            >
              {!isCollapsed && "Cuộc thi"}
            </Button>
          </Tooltip>
        )}
      </VStack>

      <Menu>
        <MenuButton
          as={Button}
          bg="white"
          w="100%"
          h="60px"
          rightIcon={<FaChevronDown />}
        >
          <HStack>
            <Avatar size="sm" bg="gray.300" name={maTaiKhoan} />
            <Box textAlign="left" isTruncated>
              <Text fontWeight="bold" color="black" fontSize="md" isTruncated>
                {maTaiKhoan}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {vaiTro === "lecturer" ? "Giảng viên" : "Sinh viên"}
              </Text>
            </Box>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem color="red.500" onClick={handleLogout}>
            Đăng Xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Sidebar;
