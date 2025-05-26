import {
  Center,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  Spinner,
  Box,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExam, getExamsList } from "../../lib/service/examManagement";

// const initialExams = [
//   { stt: 1, name: "CSLT GK", time: "07:00", date: "20/04/2024" },
//   { stt: 2, name: "QTH CK", time: "07:00", date: "20/04/2024" },
//   { stt: 3, name: "KTCT CK", time: "07:00", date: "20/04/2024" },
// ];

const ExamManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ API getExamsList
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = await getExamsList();
        if (!data) throw new Error("Error fetching Exams");
        setExams(data);
      } catch (error) {
        toast({
          title: "Lấy danh sách cuộc thi thất bại",
          description: "Có lỗi xảy ra khi lấy danh sách cuộc thi.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching Exams:", error);
        setExams([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [toast]);

  const handleNavigateForm = (mode, maCuocThi = {}) => {
    navigate(`${location.pathname}/exam-form`, {
      state: { mode, maCuocThi },
    });
  };

  const handleDeleteExam = async (MaCuocThi) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa cuộc thi ${MaCuocThi} này không?`
    );
    if (confirmDelete) {
      try {
        const data = await deleteExam(MaCuocThi);
        if (!data) {
          throw new Error("Failed to delete class");
        }
        toast({
          title: "Xoá cuộc thi thành công",
          description: "Đã xoá cuộc thi thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setExams(exams.filter((item) => item.MaCuocThi !== MaCuocThi));
      } catch (error) {
        toast({
          title: "Xoá cuộc thi thất bại",
          description: "Có lỗi xảy ra khi xoá cuộc thi.",
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
            Quản lý kỳ thi
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
          aria-label="Thêm kỳ thi"
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
                Tên bài thi
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Loại
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Giờ thi
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ngày thi
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {exams.map((exam, idx) => (
              <Tr key={exam.MaCuocThi} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{idx + 1}</Td>
                <Td color="textPrimary">{exam.TenCuocThi}</Td>
                <Td color="textPrimary">
                  <Badge
                    colorScheme={
                      exam.HinhThucThi === "vấn đáp" ? "accent" : "brand"
                    }
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {exam.HinhThucThi}
                  </Badge>
                </Td>
                <Td color="textPrimary">
                  {exam.ThoiGianBatDau
                    ? new Date(exam.ThoiGianBatDau).toLocaleTimeString(
                        "vi-VN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : ""}
                </Td>
                <Td color="textPrimary">
                  {exam.NgayTao
                    ? new Date(exam.NgayTao).toLocaleDateString("vi-VN")
                    : ""}
                </Td>
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
                      navigate(`${location.pathname}/${exam.MaCuocThi}`)
                    }
                    boxShadow="sm"
                    aria-label="Xem thông tin kỳ thi"
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<MdDocumentScanner />}
                    size="sm"
                    borderRadius="full"
                    bg="#E6E6FA"
                    color="#6C63FF"
                    fontWeight="bold"
                    _hover={{ bg: "#CFCFFF" }}
                    variant="ghost"
                    onClick={() =>
                      navigate(`${location.pathname}/result/${exam.MaCuocThi}`)
                    }
                    boxShadow="sm"
                    aria-label="Xem kết quả kỳ thi"
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
                    onClick={() => handleNavigateForm("edit", exam.MaCuocThi)}
                    boxShadow="sm"
                    aria-label="Sửa kỳ thi"
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
                    onClick={() => handleDeleteExam(exam.MaCuocThi)}
                    boxShadow="sm"
                    aria-label="Xóa kỳ thi"
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

export default ExamManagement;
