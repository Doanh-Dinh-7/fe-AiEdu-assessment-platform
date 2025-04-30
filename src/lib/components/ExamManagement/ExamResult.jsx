import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const examInfo = {
  name: "Đề thi mẫu giữa kỳ",
  totalQuestions: 6,
  subject: "Kinh tế chính trị",
  duration: 60,
  chapters: "1, 2, 3",
  class: "Lớp 48K21.1",
};

const studentResults = [
  {
    stt: 1,
    mssv: "2212152138",
    name: "Nguyễn Văn Quang",
    cau1: 2,
    phu1: "-",
    cau2: 2,
    phu2: "-",
    cau3: 6,
    phu3: "-",
    total: 10,
  },
  {
    stt: 2,
    mssv: "221121514206",
    name: "Đinh Sỹ Quốc Doanh",
    cau1: 2,
    phu1: "-",
    cau2: 2,
    phu2: "-",
    cau3: 6,
    phu3: "-",
    total: 10,
  },
  ...Array.from({ length: 8 }).map((_, idx) => ({
    stt: idx + 3,
    mssv: "",
    name: "",
    cau1: "",
    phu1: "",
    cau2: "",
    phu2: "",
    cau3: "",
    phu3: "",
    total: "",
  })),
];

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        direction="column"
        mb={6}
        gap={4}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Kết quả bài thi
          </Heading>
        </Center>

        <Flex wrap="wrap" gap={6} mb={6} w="90%" maxW="1100px">
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold">Tên cuộc thi</Text>
            <Input value={examInfo.name} isReadOnly bg="#e6eaf7" />
            <Text fontWeight="bold">Môn học</Text>
            <Input value={examInfo.subject} isReadOnly bg="#e6eaf7" />
            <Text fontWeight="bold">Các chương</Text>
            <Input value={examInfo.chapters} isReadOnly bg="#e6eaf7" />
          </Flex>
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold">Số lượng câu hỏi</Text>
            <Input value={examInfo.totalQuestions} isReadOnly bg="#e6eaf7" />
            <Text fontWeight="bold">Thời gian làm bài</Text>
            <Input value={examInfo.duration} isReadOnly bg="#e6eaf7" />
            <Text fontWeight="bold">Lớp học phần</Text>
            <Input value={examInfo.class} isReadOnly bg="#e6eaf7" />
          </Flex>
        </Flex>
      </Flex>
      <Box w="95%" maxW="1100px" bg="white" borderRadius="md" p={4}>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Mã sinh viên</Th>
              <Th>Tên sinh viên</Th>
              <Th>Câu 1</Th>
              <Th>Câu hỏi phụ 1</Th>
              <Th>Câu 2</Th>
              <Th>Câu hỏi phụ 2</Th>
              <Th>Câu 3</Th>
              <Th>Câu hỏi phụ 3</Th>
              <Th>Tổng điểm</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {studentResults.map((row, idx) => (
              <Tr key={idx}>
                <Td>{row.stt}</Td>
                <Td>{row.mssv}</Td>
                <Td>{row.name}</Td>
                <Td>{row.cau1}</Td>
                <Td>{row.phu1}</Td>
                <Td>{row.cau2}</Td>
                <Td>{row.phu2}</Td>
                <Td>{row.cau3}</Td>
                <Td>{row.phu3}</Td>
                <Td>{row.total}</Td>
                <Td>
                  <Button
                    leftIcon={<FaEye />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    borderRadius="full"
                    onClick={() => navigate(`${location.pathname}/detail`)}
                  >
                    Chi tiết
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default ExamResult;
