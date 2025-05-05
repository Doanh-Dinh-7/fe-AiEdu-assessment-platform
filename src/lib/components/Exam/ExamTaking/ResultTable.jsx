import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const ResultTable = ({ examHistory }) => {
  if (!examHistory || !examHistory.CauHoi) return null;
  return (
    <Box bg="white" borderRadius="md" p={4}>
      <Table size="md" variant="simple" border="1px solid #b3b3b3">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Câu hỏi</Th>
            <Th>Câu trả lời</Th>
            <Th>Điểm</Th>
            <Th>Điểm tối đa</Th>
            <Th>Tỷ lệ điểm</Th>
          </Tr>
        </Thead>
        <Tbody>
          {examHistory.CauHoi.map((q, idx) => (
            <Tr key={q.MaCauHoi + q.MaCauBoSung}>
              <Td>{idx + 1}</Td>
              <Td>
                {q.MaCauHoi}
                {q.MaCauBoSung ? ` (${q.MaCauBoSung})` : ""}
              </Td>
              <Td>{q.CauTraLoi}</Td>
              <Td>{q.TongDiem}</Td>
              <Td>{q.TongDiemToiDa}</Td>
              <Td>{(q.TyLeDiem * 100).toFixed(2)}%</Td>
            </Tr>
          ))}
          <Tr fontWeight="bold">
            <Td colSpan={3} textAlign="right">
              Tổng điểm
            </Td>
            <Td>
              {examHistory.CauHoi.reduce(
                (sum, q) => sum + (q.TongDiem || 0),
                0
              )}
            </Td>
            <Td>
              {examHistory.CauHoi.reduce(
                (sum, q) => sum + (q.TongDiemToiDa || 0),
                0
              )}
            </Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ResultTable;
