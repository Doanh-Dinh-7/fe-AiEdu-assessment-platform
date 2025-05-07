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
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExam, getExamsList } from "../../lib/controller/examManagement";

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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="primary" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      pt={8}
      bg="background"
      borderRadius="12px"
      boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      px={{ base: 2, md: 8 }}
      fontFamily="Inter, sans-serif"
    >
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
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="primary"
          >
            Quản lý cuộc thi
          </Heading>
        </Center>
        <Button
          colorScheme="primary"
          ml={4}
          px={8}
          fontWeight="bold"
          borderRadius="12px"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          onClick={() => handleNavigateForm("create")}
        >
          Thêm
        </Button>
      </Flex>

      <Table
        variant="simple"
        size="md"
        bg="surface"
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        overflow="hidden"
        maxW="1200px"
      >
        <Thead>
          <Tr>
            <Th color="primary">STT</Th>
            <Th color="primary">Tên bài thi</Th>
            <Th color="primary">Giờ thi</Th>
            <Th color="primary">Ngày thi</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam, idx) => (
            <Tr key={exam.MaCuocThi} _hover={{ bg: "gray.50" }} fontSize="15px">
              <Td color="textPrimary">{idx + 1}</Td>
              <Td color="textPrimary">{exam.TenCuocThi}</Td>
              <Td color="textPrimary">
                {exam.ThoiGianBatDau
                  ? new Date(exam.ThoiGianBatDau).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Td>
              <Td color="textPrimary">
                {exam.NgayTao
                  ? new Date(exam.NgayTao).toLocaleDateString("vi-VN")
                  : ""}
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  borderRadius="12px"
                  fontWeight="medium"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                  onClick={() =>
                    navigate(`${location.pathname}/${exam.MaCuocThi}`)
                  }
                >
                  Xem
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<MdDocumentScanner />}
                  size="sm"
                  colorScheme="green"
                  variant="ghost"
                  borderRadius="12px"
                  fontWeight="medium"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                  onClick={() =>
                    navigate(`${location.pathname}/result/${exam.MaCuocThi}`)
                  }
                >
                  Xem kết quả
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  borderRadius="12px"
                  fontWeight="medium"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                  onClick={() => handleNavigateForm("edit", exam.MaCuocThi)}
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
                  borderRadius="12px"
                  fontWeight="medium"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                  onClick={() => handleDeleteExam(exam.MaCuocThi)}
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

export default ExamManagement;
