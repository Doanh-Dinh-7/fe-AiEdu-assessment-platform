import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { FaEye, FaPlus, FaUpload, FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const data = [
  {
    stt: 1,
    chuong: "Kinh tế chính trị là gì?",
    tongCauHoi: 10,
    ngayTao: "12/04/2025",
  },
  {
    stt: 2,
    chuong: "Tư bản và công dân",
    tongCauHoi: 10,
    ngayTao: "13/04/2025",
  },
  { stt: 3, chuong: "Hàng hóa", tongCauHoi: 10, ngayTao: "14/04/2025" },
  {
    stt: 4,
    chuong: "Trao đổi hàng hóa",
    tongCauHoi: 10,
    ngayTao: "15/04/2025",
  },
];

const sumChuong = data.length;
const sumCauHoi = data.reduce((acc, cur) => acc + cur.tongCauHoi, 0);
const moTa = `
Sao lại gọi là bản thân mình, không chỉ là Cộng sự, vì rằng người suy nghĩ có thể vậy, tiếp xúc nhiều, từ thái độ sự rạn nứt cũng biến hóa theo.
Mọi người tranh ngại các câu hỏi, sẽ thấy bộ đề thi đang rất thiếu hụt nếu không có sự bổ sung. Quản trị ngân hàng đề thi là bộ não của hệ thống học tập, bộ đề vẫn muốn giữ ở chất tối.
Lần đầu tiên khi tạo đề thi, hãy cố gắng để tỷ lệ đề thi các chương, xem xét bộ đề đang phân chia mức độ hợp lý. Bộ thầy là một mắt điều cần giữ khi ra đề bài: Đủ các hệ thống cơ tay, không thể nuốt nổi, đề bài ngắn, tỷ lệ câu hỏi, suất độ đạt đúng như ruốc mắt.
`;

const ExamBankDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={8}>
      <Flex w="100%" maxW="1200px" direction="column" gap={4}>
        <Center flex={1}>
          <Heading fontSize="lg" mb={2} textTransform="uppercase">
            Chi tiết ngân hàng đề thi Quản trị học
          </Heading>
        </Center>
        <Flex wrap="wrap" gap={4} align="center">
          <Text fontWeight="bold">Học phần:</Text>
          <Input
            value="Quản trị học"
            size="sm"
            w="180px"
            isReadOnly
            bg="white"
          />
          <Text fontWeight="bold">Số tín chỉ:</Text>
          <Input value={3} size="sm" w="60px" isReadOnly bg="white" />
          <Text fontWeight="bold">Số chương:</Text>
          <Input value={sumChuong} size="sm" w="60px" isReadOnly bg="white" />
        </Flex>
        <Flex wrap="wrap" gap={4} align="center">
          <Text fontWeight="bold">Tổng số câu hỏi:</Text>
          <Input value={100} size="sm" w="80px" isReadOnly bg="white" />
          <Text fontWeight="bold">Số câu hỏi đã có:</Text>
          <Input value={sumCauHoi} size="sm" w="80px" isReadOnly bg="white" />
          <Text fontWeight="bold">Mức độ:</Text>
          <Badge colorScheme="green" px={2} py={1}>
            Dễ: 30
          </Badge>
          <Badge colorScheme="blue" px={2} py={1}>
            TB: 30
          </Badge>
          <Badge colorScheme="red" px={2} py={1}>
            Khó: 30
          </Badge>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Mô tả:</Text>
          <Text
            bg="white"
            p={3}
            borderRadius="md"
            fontSize="sm"
            whiteSpace="pre-line"
          >
            {moTa}
          </Text>
        </Flex>
      </Flex>
      <Table
        variant="simple"
        size="md"
        w="100%"
        maxW="1200px"
        mt={8}
        bg="white"
      >
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Chương</Th>
            <Th>Tổng số câu hỏi</Th>
            <Th>Ngày tạo</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            {/* <Th textAlign="center"></Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.stt}>
              <Td>{row.stt}</Td>
              <Td>{row.chuong}</Td>
              <Td>{row.tongCauHoi}</Td>
              <Td>{row.ngayTao}</Td>
              <Td textAlign="center">
                <IconButton
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() => navigate(`/exam-bank/${id}/questions`)}
                />
              </Td>
              <Td textAlign="center">
                <IconButton
                  leftIcon={<FaUpload />}
                  size="sm"
                  colorScheme="purple"
                  variant="ghost"
                />
              </Td>
              <Td textAlign="center">
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit"
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ExamBankDetail;
