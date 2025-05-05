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
            Quản lý cuộc thi
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

      <Table variant="simple" size="md" bg="white" borderRadius="md">
        <Thead>
          <Tr>
            <Th color="#1976d2">STT</Th>
            <Th color="#1976d2">Tên bài thi</Th>
            <Th color="#1976d2">Giờ thi</Th>
            <Th color="#1976d2">Ngày thi</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam, idx) => (
            <Tr key={exam.MaCuocThi}>
              <Td>{idx + 1}</Td>
              <Td>{exam.TenCuocThi}</Td>
              <Td>
                {exam.ThoiGianBatDau
                  ? new Date(exam.ThoiGianBatDau).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </Td>
              <Td>
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
