import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const ResultTable = ({ examHistory }) => {
  if (!examHistory || !examHistory.CauHoi) return null;
  return (
    <Box
      bg="surface"
      borderRadius="12px"
      p={4}
      boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      fontFamily="Inter, sans-serif"
    >
      <Table size="md" variant="simple" border="1px solid #E0E0E0">
        <Thead bg="#F2F4F8">
          <Tr>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              STT
            </Th>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              Câu hỏi
            </Th>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              Câu trả lời
            </Th>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              Điểm
            </Th>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              Điểm tối đa
            </Th>
            <Th color="primary" fontWeight="bold" fontSize="15px">
              Tỷ lệ điểm
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {examHistory.CauHoi.map((q, idx) => (
            <Tr key={q.MaCauHoi + q.MaCauBoSung} _hover={{ bg: "gray.50" }}>
              <Td color="textPrimary">{idx + 1}</Td>
              <Td color="textPrimary">
                {q.MaCauBoSung
                  ? `(Bổ sung) ${q.NoiDungCauHoi}`
                  : q.NoiDungCauHoi
                  ? q.NoiDungCauHoi
                  : ""}
              </Td>
              <Td color="textPrimary">{q.CauTraLoi}</Td>
              <Td color="textPrimary">{q.TongDiem}</Td>
              <Td color="textPrimary">{q.TongDiemToiDa}</Td>
              <Td color="textPrimary">{(q.TyLeDiem * 100).toFixed(2)}%</Td>
            </Tr>
          ))}
          <Tr fontWeight="bold" bg="#F2F4F8">
            <Td colSpan={3} textAlign="right" color="textSecondary">
              Tổng điểm
            </Td>
            <Td color="success">
              {examHistory.CauHoi.reduce(
                (sum, q) => sum + (q.TongDiem || 0),
                0
              )}
            </Td>
            <Td color="success">
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
