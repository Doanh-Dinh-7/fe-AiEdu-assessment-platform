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
            Quản lý kỳ thi
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
                Tên bài thi
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Giờ thi
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
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
              <Tr
                key={exam.MaCuocThi}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{idx + 1}</Td>
                <Td color="#1C1C1C">{exam.TenCuocThi}</Td>
                <Td color="#1C1C1C">
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
                <Td color="#1C1C1C">
                  {exam.NgayTao
                    ? new Date(exam.NgayTao).toLocaleDateString("vi-VN")
                    : ""}
                </Td>
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
                    borderRadius="999px"
                    bg="#E6F4EA"
                    color="#34A853"
                    fontWeight="bold"
                    _hover={{ bg: "#B7E6C6" }}
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
                    borderRadius="999px"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
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
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
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
    </Flex>
  );
};

export default ExamManagement;
