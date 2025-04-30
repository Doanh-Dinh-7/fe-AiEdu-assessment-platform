import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddDocumentModal from "./AddDocumentModal ";

const initialDocs = [
  { stt: 1, name: "Nắng ấm xa dần", date: "16/02/2025" },
  { stt: 2, name: "Con mưa ngang qua", date: "16/02/2025" },
  { stt: 3, name: "Buông đôi tay nhau ra", date: "16/02/2025" },
];

const ExamDocuments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docs, setDocs] = useState(initialDocs);

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (stt) => {
    setDocs(docs.filter((doc) => doc.stt !== stt));
  };

  return (
    <Box minH="100vh" direction="column" bg="#F5F9FF" pt={5}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Flex w="100%" justify="space-between" align="center" mb={4}>
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Danh sách tài liệu
            </Heading>
          </Center>
          <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
            Thêm tài liệu
          </Button>
        </Flex>
        <Table variant="simple" size="md" w="40vw" bg="white">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Tài liệu</Th>
              <Th>Ngày tạo</Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {docs.map((doc) => (
              <Tr key={doc.stt}>
                <Td>{doc.stt}</Td>
                <Td>{doc.name}</Td>
                <Td>{doc.date}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    ml={2}
                    onClick={() => handleDelete(doc.stt)}
                  >
                    Xóa
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      {/* Modal thêm tài liệu */}
      <AddDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        docs={docs}
        setDocs={setDocs}
      />
    </Box>
  );
};

export default ExamDocuments;
