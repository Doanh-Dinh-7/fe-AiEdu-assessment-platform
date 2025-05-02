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
import { getClassList } from "../../lib/controller/class";
import { deleteClass } from "../../lib/controller/class";

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

  const handleDelete = async (MaLopHocPhan) => {
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Center>
  ) : (
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={6}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Danh sách lớp học phần
          </Heading>
        </Center>
        <Button
          colorScheme="blue"
          ml={4}
          px={8}
          fontWeight="bold"
          onClick={() => handleNavigateForm("create")}
        >
          Thêm
        </Button>
      </Flex>

      <Table variant="simple" size="md" w="100%" maxW="1200px" bg="white">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Tên lớp học phần</Th>
            <Th>Thời gian</Th>
            <Th>Số lượng</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {classes.map((clas, index) => (
            <Tr key={clas.MaLopHocPhan}>
              <Td>{index + 1}</Td>
              <Td>{clas.TenLopHocPhan}</Td>
              <Td>{clas.ThoiGianHoc}</Td>
              <Td>{clas.SoLuongThamGia}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
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
                  colorScheme="yellow"
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
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDelete(clas.MaLopHocPhan)}
                >
                  Xóa
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Class;
