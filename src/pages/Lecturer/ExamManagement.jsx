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
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ExamViewModal from "../../lib/components/ExamManagement/ExamViewModal";

const initialExams = [
  { stt: 1, name: "CSLT GK", time: "07:00", date: "20/04/2024" },
  { stt: 2, name: "QTH CK", time: "07:00", date: "20/04/2024" },
  { stt: 3, name: "KTCT CK", time: "07:00", date: "20/04/2024" },
];

const ExamManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exams] = useState(initialExams);
  const [viewModal, setViewModal] = useState({ isOpen: false, data: null });

  const handleNavigateForm = (mode, defaultData = {}) => {
    navigate(`${location.pathname}/exam-form`, {
      state: { mode, defaultData },
    });
  };

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
            Quản lý bài thi
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
          {exams.map((row) => (
            <Tr key={row.stt}>
              <Td>{row.stt}</Td>
              <Td>{row.name}</Td>
              <Td>{row.time}</Td>
              <Td>{row.date}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => setViewModal({ isOpen: true, data: row })}
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
                  onClick={() => navigate(`${location.pathname}/exam-result`)}
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
                  onClick={() => handleNavigateForm("edit", row)}
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
                  // onClick={() => handleDelete(row.stt)}
                >
                  Xóa
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ExamViewModal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, data: null })}
        examData={viewModal.data}
      />
    </Flex>
  );
};

export default ExamManagement;
