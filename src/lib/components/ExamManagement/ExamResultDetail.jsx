import {
  Box,
  Button,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamResultDetail } from "../../controller/examManagement";
import { useEffect, useState } from "react";

// const questionDetails = [
//   { stt: 1, question: "Nội dung câu hỏi 1", answer: "", score: "" },
//   { stt: 2, question: "Nội dung câu hỏi phụ 1", answer: "", score: "" },
//   { stt: 3, question: "Nội dung câu hỏi 2", answer: "", score: "" },
//   { stt: 4, question: "Nội dung câu hỏi phụ 2", answer: "", score: "" },
//   { stt: 5, question: "Nội dung câu hỏi 3", answer: "", score: "" },
//   { stt: 6, question: "Nội dung câu hỏi phụ 3", answer: "", score: "" },
// ];

const ExamResultDetail = () => {
  const navigate = useNavigate();
  const { maCuocThi, maSinhVien } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getExamResultDetail(maCuocThi, maSinhVien);
      setResult(data);
      setLoading(false);
    };
    fetchData();
  }, [maCuocThi, maSinhVien]);

  if (loading || !result)
    return (
      <Center minH="100vh">
        <Text>Đang tải...</Text>
      </Center>
    );

  const chiTiet = result.ChiTietKetQua?.CauHoi || [];

  return (
    <Box minH="100vh" bg="#F5F9FF" p={0}>
      <Flex direction="column" align="center" pt={8}>
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Chi tiết kết quả bài thi
          </Heading>
        </Center>
        <Box w="90%" maxW="1200px" bg="white" borderRadius="md" p={4} mb={4}>
          <Flex wrap="wrap" gap={6} mb={4}>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold">Tên sinh viên</Text>
              <Input value={result.TenSinhVien || ""} isReadOnly bg="#e6eaf7" />
              <Text fontWeight="bold">Mã sinh viên</Text>
              <Input value={result.MaSinhVien || ""} isReadOnly bg="#e6eaf7" />
            </Flex>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold">Tên cuộc thi</Text>
              <Input value={result.TenCuocThi || ""} isReadOnly bg="#e6eaf7" />
              <Text fontWeight="bold">Tổng điểm</Text>
              <Input value={result.TongDiem || ""} isReadOnly bg="#e6eaf7" />
              <Text fontWeight="bold">Trạng thái</Text>
              <Input value={result.TrangThai || ""} isReadOnly bg="#e6eaf7" />
            </Flex>
          </Flex>
          <Table size="md" variant="simple" border="1px solid #b3b3b3">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Câu hỏi</Th>
                <Th>Câu trả lời</Th>
                <Th>Điểm</Th>
                <Th>Ý chính & điểm</Th>
              </Tr>
            </Thead>
            <Tbody>
              {chiTiet.map((row, idx) => (
                <Tr key={row.MaCauHoi + row.MaCauBoSung}>
                  <Td>{idx + 1}</Td>
                  <Td>
                    {row.MaCauBoSung
                      ? ` (Bổ sung) ${row.NoiDungCauHoi}`
                      : row.NoiDungCauHoi
                      ? row.NoiDungCauHoi
                      : ""}
                  </Td>
                  <Td>{row.CauTraLoi}</Td>
                  <Td style={{ whiteSpace: "nowrap" }}>
                    {row.TongDiem} / {row.TongDiemToiDa}
                  </Td>
                  <Td>
                    {row.ChiTietKetQua?.map((y, i) => (
                      <Box key={i} mb={1}>
                        <Text fontSize="sm">
                          - {y.YChinh || y.NoiDungDapAn}:{" "}
                          <b>
                            {y.DiemSo} / {y.DiemToiDa}
                          </b>
                        </Text>
                      </Box>
                    ))}
                  </Td>
                </Tr>
              ))}
              <Tr fontWeight="bold">
                <Td colSpan={3} textAlign="right">
                  Tổng
                </Td>
                <Td style={{ whiteSpace: "nowrap" }}>{result.TongDiem}</Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex w="90%" maxW="900px" justify="flex-end" mt={8}>
          <Button
            colorScheme="blackAlpha"
            borderRadius="md"
            px={10}
            fontWeight="bold"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ExamResultDetail;
