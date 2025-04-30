import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
} from "@chakra-ui/react";

const mockSubjects = [
  { id: "ktct", name: "Kinh tế chính trị" },
  { id: "qth", name: "Quản trị học" },
];
const mockClasses = [
  { id: "A", name: "Lớp 48K21.1" },
  { id: "B", name: "Lớp 48K21.2" },
  { id: "C", name: "Lớp 48K21.3" },
];

const mockExamData = {
  name: "Đề thi mẫu giữa kỳ",
  subject: "ktct",
  duration: 60,
  password: "123456",
  classes: ["A", "B"],
  practice: true,
  detail: [
    { chapter: 1, easy: 2, medium: 1, hard: 1 },
    { chapter: 2, easy: 1, medium: 2, hard: 1 },
    { chapter: 3, easy: 1, medium: 1, hard: 2 },
  ],
  scores: { easy: 2, medium: 3, hard: 5 },
};

const ExamViewModal = ({ isOpen, onClose, examData }) => {
  const data = mockExamData;
  //   examData && Object.keys(examData).length > 0 ? examData : mockExamData;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
        >
          Thông tin bài thi
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <Text fontWeight="bold" mb={2}>
              Thông tin chung
            </Text>
            <Text>Tên cuộc thi: {data.name}</Text>
            <Text>
              Học phần:{" "}
              {mockSubjects.find((s) => s.id === data.subject)?.name || ""}
            </Text>
            <Text>Tổng thời gian làm bài: {data.duration} phút</Text>
            <Text>Mật khẩu đề thi: {data.password}</Text>
            <Text>
              Lớp học phần:{" "}
              {mockClasses
                .filter((c) => (data.classes || []).includes(c.id))
                .map((c) => c.name)
                .join(", ")}
            </Text>
            <Text>Luyện thi: {data.practice ? "Có" : "Không"}</Text>
            <Box h={4} />
            <Text fontWeight="bold" mb={2}>
              Thông tin chi tiết
            </Text>
            <Table size="md" mb={4}>
              <Thead>
                <Tr>
                  <Th>Chương</Th>
                  <Th>Dễ</Th>
                  <Th>Trung bình</Th>
                  <Th>Khó</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(data.detail || []).map((row) => (
                  <Tr key={row.chapter}>
                    <Td>{row.chapter}</Td>
                    <Td>{row.easy}</Td>
                    <Td>{row.medium}</Td>
                    <Td>{row.hard}</Td>
                  </Tr>
                ))}
                <Tr fontWeight="bold">
                  <Td>Tổng</Td>
                  <Td>{(data.detail || []).reduce((a, b) => a + b.easy, 0)}</Td>
                  <Td>
                    {(data.detail || []).reduce((a, b) => a + b.medium, 0)}
                  </Td>
                  <Td>{(data.detail || []).reduce((a, b) => a + b.hard, 0)}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Loại câu</Th>
                  <Th>Điểm</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Dễ</Td>
                  <Td>{data.scores?.easy}</Td>
                </Tr>
                <Tr>
                  <Td>Trung bình</Td>
                  <Td>{data.scores?.medium}</Td>
                </Tr>
                <Tr>
                  <Td>Khó</Td>
                  <Td>{data.scores?.hard}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExamViewModal;
