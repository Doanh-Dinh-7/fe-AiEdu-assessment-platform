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
  useToast,
  Box,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursesList, deleteCourse } from "../../lib/service/course";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ API getCoursesList
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCoursesList();
        if (!data) throw new Error("Error fetching courses");
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

  const handleDeleteCourse = async (MaHocPhan, TenHocPhan) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa học phần ${TenHocPhan} này không?`
    );
    if (confirmDelete) {
      try {
        const data = await deleteCourse(MaHocPhan);

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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="background"
      pt={8}
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
            Ngân hàng đề thi
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
          aria-label="Thêm"
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
        <Table variant="simple" size="md" w="100%">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Học phần
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Loại
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Số tín chỉ
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ngày tạo
              </Th>
              <Th textAlign="center"> </Th>
              <Th textAlign="center"> </Th>
              <Th textAlign="center"> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course, index) => (
              <Tr key={course.MaHocPhan} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{index + 1}</Td>
                <Td color="textPrimary">{course.TenHocPhan}</Td>
                <Td color="textPrimary">
                  <Badge
                    colorScheme={course.HinhThucThi === "vấn đáp" ? "accent" : "brand"}
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {course.HinhThucThi}
                  </Badge>
                </Td>

                <Td color="textPrimary">{course.SoTinChi}</Td>
                <Td color="textPrimary">{course.NgayTao}</Td>
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
                    onClick={() =>
                      navigate(`${location.pathname}/${course.MaHocPhan}`)
                    }
                    boxShadow="sm"
                    aria-label="Xem chi tiết"
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
                    onClick={() => handleNavigateForm("edit", course)}
                    boxShadow="sm"
                    aria-label="Sửa học phần"
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
                    onClick={() =>
                      handleDeleteCourse(course.MaHocPhan, course.TenHocPhan)
                    }
                    boxShadow="sm"
                    aria-label="Xóa học phần"
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

export default ExamBank;
