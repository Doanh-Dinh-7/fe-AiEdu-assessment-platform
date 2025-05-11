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
            Danh sách bài thi
          </Heading>
        </Center>
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
            </Tr>
          </Thead>
          <Tbody>
            {exams.map((exam, idx) => (
              <Tr
                key={exam.ma_cuoc_thi}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{idx + 1}</Td>
                <Td color="#1C1C1C">{exam.ten_cuoc_thi}</Td>
                <Td color="#1C1C1C">
                  {exam.thoi_gian_bat_dau
                    ? new Date(exam.thoi_gian_bat_dau).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : ""}
                </Td>
                <Td color="#1C1C1C">
                  {exam.thoi_gian_bat_dau
                    ? new Date(exam.thoi_gian_bat_dau).toLocaleDateString(
                        "vi-VN"
                      )
                    : ""}
                </Td>
                <Td textAlign="center">
                  {exam.trang_thai_luyen_thi === "có" && (
                    <Button
                      leftIcon={<FaEdit />}
                      size="sm"
                      borderRadius="999px"
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
                    >
                      Luyện thi
                    </Button>
                  )}
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
                    variant="solid"
                    onClick={() =>
                      setStartModal({
                        isOpen: true,
                        maCuocThi: exam.ma_cuoc_thi,
                        mode: "exam",
                      })
                    }
                  >
                    Thi
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
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
