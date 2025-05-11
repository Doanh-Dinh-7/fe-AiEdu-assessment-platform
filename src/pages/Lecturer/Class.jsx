import {
  Button,
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="#4A90E2" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      pt={8}
      bg="#F2F4F8"
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Danh sách lớp học phần
          </Heading>
        </Center>
        <Button
          bg="#4A90E2"
          color="#fff"
          borderRadius="999px"
          px={8}
          py={2}
          fontWeight="bold"
          fontSize="16px"
          boxShadow="0 2px 8px rgba(74,144,226,0.08)"
          _hover={{ bg: "#357ABD" }}
          onClick={() => handleNavigateForm("create")}
          leftIcon={<span style={{ fontSize: 18, marginRight: 4 }}>＋</span>}
        >
          Thêm
        </Button>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
        py={6}
      >
        <Table
          variant="simple"
          size="md"
          bg="transparent"
          borderRadius="12px"
          overflow="hidden"
        >
          <Thead bg="#F2F4F8">
            <Tr>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Tên lớp học phần
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Thời gian
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Số lượng
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {classes.map((clas, index) => (
              <Tr
                key={clas.MaLopHocPhan}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{index + 1}</Td>
                <Td color="#1C1C1C">{clas.TenLopHocPhan}</Td>
                <Td color="#1C1C1C">{clas.ThoiGianHoc}</Td>
                <Td color="#1C1C1C">{clas.SoLuongThamGia}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaEye />}
                    size="sm"
                    borderRadius="999px"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() => navigate(`/class/${clas.MaLopHocPhan}`)}
                  >
                    Xem
                  </Button>
                </Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaEdit />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
                    variant="ghost"
                    onClick={() => handleNavigateForm("edit", clas)}
                  >
                    Sửa
                  </Button>
                </Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaTrash />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteClass(clas.MaLopHocPhan)}
                  >
                    Xóa
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default Class;
