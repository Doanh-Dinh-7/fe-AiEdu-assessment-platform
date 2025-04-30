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
  Input,
  Center,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import ClassStudentModal from "./ClassStudentModal";

const initialStudents = [
  {
    stt: 1,
    mssv: "22112152138",
    name: "Nguyễn Văn Quang",
    class: "48K21.2",
    username: "221121521238",
  },
];

const ClassDetail = () => {
  const { id } = useParams();
  const [students, setStudents] = useState(initialStudents);
  const [editIndex, setEditIndex] = useState(null);
  const [student, setStudent] = useState({
    mssv: "",
    name: "",
    class: "",
    username: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  const openAddModal = () => {
    setStudent({ mssv: "", name: "", class: "", username: "" });
    setIsEdit(false);
    onOpen();
  };

  const openEditModal = (student, index) => {
    setStudent(student);
    setEditIndex(index);
    setIsEdit(true);
    onOpen();
  };

  const handleSubmit = () => {
    if (isEdit) {
      const updated = [...students];
      updated[editIndex] = { ...student, stt: editIndex + 1 };
      setStudents(updated);
    } else {
      setStudents((prev) => [
        ...prev,
        {
          ...student,
          stt: prev.length + 1,
        },
      ]);
    }
    onClose();
  };

  const handleDeleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated.map((sv, i) => ({ ...sv, stt: i + 1 })));
  };

  const handleImport = () => {
    setStudents((prev) => [
      ...prev,
      {
        stt: prev.length + 1,
        mssv: "22112159999",
        name: "Nguyễn Văn B",
        class: "48K21.2",
        username: "22112159999",
      },
    ]);
  };

  return (
    <Box minH="100vh" bg="#F5F9FF" pt={5}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Flex w="100%" justify="space-between" align="center" mb={4} gap={4}>
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Lớp học phần {id}
            </Heading>
          </Center>
          <IconButton
            icon={<FaPlus />}
            onClick={openAddModal}
            colorScheme="blue"
          />
          <Button as="label" colorScheme="blue" leftIcon={<FaUpload />}>
            Tải danh sách
            <Input
              type="file"
              accept=".csv,.xlsx"
              display="none"
              onChange={handleImport}
            />
          </Button>
        </Flex>

        <Table variant="simple" size="md" w="100%" bg="white">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Mã sinh viên</Th>
              <Th>Tên sinh viên</Th>
              <Th>Lớp</Th>
              <Th>Tên đăng nhập</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((sv, index) => (
              <Tr key={index}>
                <Td>{sv.stt}</Td>
                <Td>{sv.mssv}</Td>
                <Td fontWeight="bold">{sv.name}</Td>
                <Td>{sv.class}</Td>
                <Td>{sv.username}</Td>
                <Td>
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    colorScheme="yellow"
                    variant="ghost"
                    onClick={() => openEditModal(sv, index)}
                  />
                </Td>
                <Td>
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteStudent(index)}
                  />
                </Td>
              </Tr>
            ))}
            {Array.from({ length: Math.max(0, 10 - students.length) }).map(
              (_, idx) => (
                <Tr key={"empty-" + idx}>
                  <Td>{students.length + idx + 1}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Flex>

      <ClassStudentModal
        isOpen={isOpen}
        onClose={onClose}
        isEdit={isEdit}
        student={student}
        setStudent={setStudent}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default ClassDetail;
