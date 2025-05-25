import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Flex,
  Heading,
  Spinner,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getClassList } from "../../lib/service/class";
import { deleteClass } from "../../lib/service/class";

// const initialClassData = [
//   { stt: 1, id: "QTH-47K21.1", name: "CSLT", time: "123 T6", quantity: 30 },
//   { stt: 2, id: "QTH-47K21.2", name: "QTH", time: "123 T7", quantity: 30 },
//   { stt: 3, id: "KTCT-47K21.1", name: "KTCT", time: "123 T2", quantity: 30 },
// ];

const Class = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const data = await getClassList();
        if (!data) throw new Error("Error fetching classes");
        setClasses(data);
      } catch (error) {
        toast({
          title: "Lỗi khi lấy danh sách lớp học phần",
          description: "Không thể lấy dữ liệu lớp học phần. Vui lòng thử lại!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setClasses([]);
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [toast]);

  const handleDeleteClass = async (MaLopHocPhan) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa lớp học phần ${MaLopHocPhan} này không?`
    );
    if (confirmDelete) {
      try {
        const data = await deleteClass(MaLopHocPhan);
        if (!data) {
          throw new Error("Failed to delete class");
        }
        toast({
          title: "Xoá lớp học phần thành công",
          description: "Đã xoá lớp học phần thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setClasses(
          classes.filter((item) => item.MaLopHocPhan !== MaLopHocPhan)
        );
      } catch (error) {
        toast({
          title: "Xoá lớp học phần thất bại",
          description: "Có lỗi xảy ra khi xoá lớp học phần.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      }
    }
  };

  const handleNavigateForm = (mode, defaultData = {}) => {
    navigate(`${location.pathname}/class-form`, {
      state: { mode, defaultData },
    });
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      pt={8}
      bg="background"
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Danh sách lớp học phần
          </Heading>
        </Center>
        <IconButton
          icon={<span style={{ fontSize: 18, marginRight: 4 }}>＋</span>}
          colorScheme="brand"
          borderRadius="full"
          px={8}
          py={2}
          fontWeight="bold"
          fontSize="md"
          boxShadow="md"
          onClick={() => handleNavigateForm("create")}
          variant="ghost"
          aria-label="Thêm lớp học phần"
        />
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
        py={6}
      >
        <Table variant="simple" size="md">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Tên lớp học phần
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Thời gian
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Số lượng
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {classes.map((clas, index) => (
              <Tr key={clas.MaLopHocPhan} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{index + 1}</Td>
                <Td color="textPrimary">{clas.TenLopHocPhan}</Td>
                <Td color="textPrimary">{clas.ThoiGianHoc}</Td>
                <Td color="textPrimary">{clas.SoLuongThamGia}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEye />}
                    size="sm"
                    borderRadius="full"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() => navigate(`/class/${clas.MaLopHocPhan}`)}
                    boxShadow="sm"
                    aria-label="Xem chi tiết lớp học phần"
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    borderRadius="full"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
                    variant="ghost"
                    onClick={() => handleNavigateForm("edit", clas)}
                    boxShadow="sm"
                    aria-label="Sửa lớp học phần"
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="full"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteClass(clas.MaLopHocPhan)}
                    boxShadow="sm"
                    aria-label="Xóa lớp học phần"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Class;
