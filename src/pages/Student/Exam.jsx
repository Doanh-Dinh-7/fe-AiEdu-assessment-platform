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
import { getExamsStudentList } from "../../lib/controller/examStudent";

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
            Danh sách bài thi
          </Heading>
        </Center>
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
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam, idx) => (
            <Tr
              key={exam.ma_cuoc_thi}
              _hover={{ bg: "gray.50" }}
              fontSize="15px"
            >
              <Td color="textPrimary">{idx + 1}</Td>
              <Td color="textPrimary">{exam.ten_cuoc_thi}</Td>
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
                  ? new Date(exam.thoi_gian_bat_dau).toLocaleDateString("vi-VN")
                  : ""}
              </Td>
              <Td textAlign="center">
                {exam.trang_thai_luyen_thi === "có" && (
                  <Button
                    leftIcon={<FaEdit />}
                    size="sm"
                    colorScheme="warning"
                    variant="solid"
                    borderRadius="12px"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.08)"
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
                  colorScheme="success"
                  variant="solid"
                  borderRadius="12px"
                  fontWeight="medium"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
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
