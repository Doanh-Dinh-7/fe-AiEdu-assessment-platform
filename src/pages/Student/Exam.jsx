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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import ExamStartModal from "../../lib/components/Exam/ExamStartModal";

const initialExams = [
  { stt: 1, name: "CSLT GK", time: "07:00", date: "20/04/2024" },
  { stt: 2, name: "QTH CK", time: "07:00", date: "20/04/2024" },
  { stt: 3, name: "KTCT CK", time: "07:00", date: "20/04/2024" },
];

const Exam = () => {
  const [exams] = useState(initialExams);
  const [startModal, setStartModal] = useState({
    isOpen: false,
    data: null,
    mode: "exam",
  });

  return (
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
          {exams.map((row) => (
            <Tr key={row.stt}>
              <Td>{row.stt}</Td>
              <Td>{row.name}</Td>
              <Td>{row.time}</Td>
              <Td>{row.date}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() =>
                    setStartModal({ isOpen: true, data: row, mode: "practice" })
                  }
                >
                  Luyện thi
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<MdDocumentScanner />}
                  size="sm"
                  colorScheme="green"
                  variant="ghost"
                  onClick={() =>
                    setStartModal({ isOpen: true, data: row, mode: "exam" })
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
          setStartModal({ isOpen: false, data: null, mode: "exam" })
        }
        examData={startModal.data}
        mode={startModal.mode}
      />
    </Flex>
  );
};

export default Exam;
