import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ResultTable = ({ examHistory }) => {
  if (!examHistory || !examHistory.CauHoi) return null;
  return (
    <Box
      bg="surface"
      borderRadius="md"
      p={4}
      boxShadow="md"
      fontFamily="Inter, sans-serif"
    >
      <Table size="md" variant="simple">
        <Thead bg="background">
          <Tr>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
              STT
            </Th>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
              Câu hỏi
            </Th>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
              Câu trả lời
            </Th>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
              Điểm
            </Th>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
              Điểm tối đa
            </Th>
            <Th color="brand.500" fontWeight="bold" fontSize="sm">
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
          <Tr fontWeight="bold" bg="background">
            <Td colSpan={3} textAlign="right" color="textSecondary">
              Tổng điểm
            </Td>
            <Td color="success.500">
              {examHistory.CauHoi.reduce(
                (sum, q) => sum + (q.TongDiem || 0),
                0
              )}
            </Td>
            <Td color="success.500">
              {examHistory.CauHoi.reduce(
                (sum, q) => sum + (q.MaCauBoSung ? 0 : q.TongDiemToiDa || 0),
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

// ResultTable.propTypes = {
//   examHistory: PropTypes.shape({
//     CauHoi: PropTypes.arrayOf(
//       PropTypes.shape({
//         MaCauHoi: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//         MaCauBoSung: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//         NoiDungCauHoi: PropTypes.string,
//         CauTraLoi: PropTypes.string,
//         TongDiem: PropTypes.number,
//         TongDiemToiDa: PropTypes.number,
//         TyLeDiem: PropTypes.number,
//       })
//     ),
//   }),
// };

export default ResultTable;
