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
    <Box minH="100vh" bg="background" p={0} fontFamily="Inter, sans-serif">
      <Flex direction="column" align="center" py={8}>
        <Center flex={1} mb={6}>
          <Heading
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="primary"
          >
            Chi tiết kết quả bài thi
          </Heading>
        </Center>
        <Box
          w="90%"
          maxW="1200px"
          bg="surface"
          borderRadius="12px"
          p={6}
          mb={4}
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        >
          <Flex wrap="wrap" gap={6} mb={4}>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="textSecondary">
                Tên sinh viên
              </Text>
              <Input
                value={result.TenSinhVien || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="textPrimary"
              />
              <Text fontWeight="bold" color="textSecondary">
                Mã sinh viên
              </Text>
              <Input
                value={result.MaSinhVien || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="textPrimary"
              />
            </Flex>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="textSecondary">
                Tên cuộc thi
              </Text>
              <Input
                value={result.TenCuocThi || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="textPrimary"
              />
              <Text fontWeight="bold" color="textSecondary">
                Tổng điểm
              </Text>
              <Input
                value={result.TongDiem || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="textPrimary"
              />
              <Text fontWeight="bold" color="textSecondary">
                Trạng thái
              </Text>
              <Input
                value={result.TrangThai || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="textPrimary"
              />
            </Flex>
          </Flex>
          <Table
            size="md"
            variant="simple"
            borderRadius="12px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th color="primary">STT</Th>
                <Th color="primary">Câu hỏi</Th>
                <Th color="primary">Câu trả lời</Th>
                <Th color="primary">Điểm</Th>
                <Th color="primary">Ý chính & điểm</Th>
              </Tr>
            </Thead>
            <Tbody>
              {chiTiet.map((row, idx) => (
                <Tr
                  key={row.MaCauHoi + row.MaCauBoSung}
                  _hover={{ bg: "gray.50" }}
                  fontSize="15px"
                >
                  <Td color="textPrimary">{idx + 1}</Td>
                  <Td color="textPrimary">
                    {row.MaCauBoSung
                      ? ` (Bổ sung) ${row.NoiDungCauHoi}`
                      : row.NoiDungCauHoi
                      ? row.NoiDungCauHoi
                      : ""}
                  </Td>
                  <Td color="textPrimary">{row.CauTraLoi}</Td>
                  <Td color="textPrimary" style={{ whiteSpace: "nowrap" }}>
                    {row.TongDiem} / {row.TongDiemToiDa}
                  </Td>
                  <Td color="textPrimary">
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
              <Tr fontWeight="bold" bg="#F2F4F8">
                <Td colSpan={3} textAlign="right" color="textSecondary">
                  Tổng
                </Td>
                <Td style={{ whiteSpace: "nowrap" }} color="success">
                  {result.TongDiem}
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex w="90%" maxW="900px" justify="flex-end" mt={8}>
          <Button
            colorScheme="blackAlpha"
            borderRadius="12px"
            px={10}
            fontWeight="bold"
            fontSize="16px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
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
