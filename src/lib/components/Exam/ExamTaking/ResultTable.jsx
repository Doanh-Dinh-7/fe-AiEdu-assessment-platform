// lib/components/Exam/ExamTaking/ResultTable.jsx
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ResultTable = ({ questions }) => (
  <Box bg="white" borderRadius="md" p={4}>
    <Table size="md" variant="simple" border="1px solid #b3b3b3">
      <Thead>
        <Tr>
          <Th>STT</Th>
          <Th>Câu hỏi</Th>
          <Th>Câu trả lời</Th>
          <Th>Điểm</Th>
        </Tr>
      </Thead>
      <Tbody>
        {questions.map((q, idx) => (
          <Tr key={q.id}>
            <Td>{idx + 1}</Td>
            <Td>{q.text}</Td>
            <Td>{q.answer || ""}</Td>
            <Td>{q.score || ""}</Td>
          </Tr>
        ))}
        <Tr fontWeight="bold">
          <Td colSpan={3} textAlign="right">
            Tổng
          </Td>
          <Td></Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
);

export default ResultTable;
