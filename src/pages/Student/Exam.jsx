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
            Danh sách bài thi
          </Heading>
        </Center>
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
          </Tr>
        </Thead>
        <Tbody>
          {exams.map((exam, idx) => (
            <Tr key={exam.ma_cuoc_thi}>
              <Td>{idx + 1}</Td>
              <Td>{exam.ten_cuoc_thi}</Td>
              <Td>
                {exam.thoi_gian_bat_dau
                  ? new Date(exam.thoi_gian_bat_dau).toLocaleTimeString(
                      "vi-VN",
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : ""}
              </Td>
              <Td>
                {exam.thoi_gian_bat_dau
                  ? new Date(exam.thoi_gian_bat_dau).toLocaleDateString("vi-VN")
                  : ""}
              </Td>
              <Td textAlign="center">
                {exam.trang_thai_luyen_thi === "có" && (
                  <Button
                    leftIcon={<FaEdit />}
                    size="sm"
                    colorScheme="yellow"
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
                  colorScheme="green"
                  variant="ghost"
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
