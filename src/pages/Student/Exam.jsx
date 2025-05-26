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
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import ExamStartModal from "../../lib/components/Exam/ExamStartModal";
import { getExamsStudentList } from "../../lib/service/examStudent";

// const initialExams = [
//   { stt: 1, name: "CSLT GK", time: "07:00", date: "20/04/2024" },
//   { stt: 2, name: "QTH CK", time: "07:00", date: "20/04/2024" },
//   { stt: 3, name: "KTCT CK", time: "07:00", date: "20/04/2024" },
// ];

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [startModal, setStartModal] = useState({
    isOpen: false,
    data: null,
    mode: "exam",
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = await getExamsStudentList();
        setExams(data || []);
      } catch {
        setExams([]);
        toast({
          title: "Lỗi khi lấy danh sách cuộc thi",
          description: "Không thể lấy dữ liệu cuộc thi. Vui lòng thử lại!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [toast]);

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
            Danh sách bài thi
          </Heading>
        </Center>
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
              <Th
                textAlign="center"
                fontWeight="bold"
                fontSize="sm"
                color="textSecondary"
              >
                Luyện thi
              </Th>
              <Th
                textAlign="center"
                fontWeight="bold"
                fontSize="sm"
                color="textSecondary"
              >
                Thi
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {exams.map((exam, idx) => (
              <Tr key={exam.ma_cuoc_thi} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{idx + 1}</Td>
                <Td color="textPrimary">{exam.ten_cuoc_thi}</Td>
                <Td color="textPrimary">
                  <Badge
                    colorScheme={
                      exam.hinh_thuc_thi === "vấn đáp" ? "accent" : "brand"
                    }
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {exam.hinh_thuc_thi}
                  </Badge>
                </Td>
                <Td color="textPrimary">
                  {exam.thoi_gian_bat_dau
                    ? new Date(exam.thoi_gian_bat_dau).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : ""}
                </Td>
                <Td color="textPrimary">
                  {exam.thoi_gian_bat_dau
                    ? new Date(exam.thoi_gian_bat_dau).toLocaleDateString(
                        "vi-VN"
                      )
                    : ""}
                </Td>
                <Td textAlign="center">
                  {exam.trang_thai_luyen_thi === "có" && (
                    <IconButton
                      icon={<FaEdit />}
                      size="sm"
                      borderRadius="full"
                      bg="#FFF7E0"
                      color="#FBBC05"
                      fontWeight="bold"
                      _hover={{ bg: "#FFE6A1" }}
                      variant="ghost"
                      onClick={() =>
                        setStartModal({
                          isOpen: true,
                          maCuocThi: exam.ma_cuoc_thi,
                          mode: "practice",
                        })
                      }
                      aria-label="Luyện thi"
                    />
                  )}
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<MdDocumentScanner />}
                    size="sm"
                    borderRadius="full"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() =>
                      setStartModal({
                        isOpen: true,
                        maCuocThi: exam.ma_cuoc_thi,
                        mode: "exam",
                      })
                    }
                    aria-label="Thi"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <ExamStartModal
        isOpen={startModal.isOpen}
        onClose={() =>
          setStartModal({ isOpen: false, maCuocThi: null, mode: "exam" })
        }
        maCuocThi={startModal.maCuocThi}
        mode={startModal.mode}
      />
    </Flex>
  );
};

export default Exam;
