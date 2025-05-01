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
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursesList, deleteCourse } from "../../lib/controller/course";

// const initialData = [
//   { stt: 1, hocPhan: "Quản trị học", tinChi: 3, ngayTao: "12/04/2025" },
//   { stt: 2, hocPhan: "Kinh tế chính trị", tinChi: 3, ngayTao: "13/04/2025" },
//   { stt: 3, hocPhan: "Kinh doanh quốc tế", tinChi: 3, ngayTao: "14/04/2025" },
//   { stt: 4, hocPhan: "Cơ sở lập trình", tinChi: 3, ngayTao: "15/04/2025" },
// ];

const ExamBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    // Lấy dữ liệu từ API getCoursesList
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCoursesList();
        setCourses(data);
      } catch (error) {
        toast({
          title: "Lấy danh sách học phần thất bại",
          description: "Có lỗi xảy ra khi lấy danh sách học phần.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [toast]);

  const handleNavigateForm = (mode, defaultData = {}) => {
    navigate(`${location.pathname}/exam-bank-form`, {
      state: { mode, defaultData },
    });
  };

  const handleDelete = async (MaHocPhan, TenHocPhan) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa học phần ${TenHocPhan} này không?`
    );
    if (confirmDelete) {
      try {
        const data = await deleteCourse(MaHocPhan);
        console.log("data", data);

        if (!data) {
          throw new Error("Failed to fetch course detail");
        }
        toast({
          title: "Xóa học phần thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.MaHocPhan !== MaHocPhan)
        );
      } catch (error) {
        toast({
          title: "Xóa học phần thất bại",
          description: "Có lỗi xảy ra khi xóa học phần này.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      }
    }
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
            Ngân hàng đề thi
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
            <Th>Học phần</Th>
            <Th>Số tín chỉ</Th>
            <Th>Ngày tạo</Th>
            <Th textAlign="center"> </Th>
            <Th textAlign="center"> </Th>
            <Th textAlign="center"> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course, index) => (
            <Tr key={course.MaHocPhan}>
              <Td>{index + 1}</Td>
              <Td>{course.TenHocPhan}</Td>
              <Td>{course.SoTinChi}</Td>
              <Td>{course.NgayTao}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() =>
                    navigate(`${location.pathname}/${course.MaHocPhan}`)
                  }
                >
                  Xem chi tiết
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() => handleNavigateForm("edit", course)}
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
                  onClick={() =>
                    handleDelete(course.MaHocPhan, course.TenHocPhan)
                  }
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

export default ExamBank;
