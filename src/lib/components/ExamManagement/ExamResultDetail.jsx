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
import { getExamResultDetail } from "../../service/examManagement";
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
        <Center flex={1} mb={8}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Chi tiết kết quả bài thi
          </Heading>
        </Center>
        <Box
          w="100%"
          maxW="1200px"
          bg="surface"
          borderRadius="md"
          p={6}
          mb={4}
          boxShadow="md"
        >
          <Flex wrap="wrap" gap={6} mb={4}>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="text.secondary">
                Tên sinh viên
              </Text>
              <Input
                value={result.TenSinhVien || ""}
                isReadOnly
                bg="background"
                borderRadius="md"
                fontWeight="medium"
                color="text.primary"
              />
              <Text fontWeight="bold" color="text.secondary">
                Mã sinh viên
              </Text>
              <Input
                value={result.MaSinhVien || ""}
                isReadOnly
                bg="background"
                borderRadius="md"
                fontWeight="medium"
                color="text.primary"
              />
            </Flex>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="text.secondary">
                Tên cuộc thi
              </Text>
              <Input
                value={result.TenCuocThi || ""}
                isReadOnly
                bg="background"
                borderRadius="md"
                fontWeight="medium"
                color="text.primary"
              />
              <Text fontWeight="bold" color="text.secondary">
                Tổng điểm
              </Text>
              <Input
                value={result.TongDiem || ""}
                isReadOnly
                bg="background"
                borderRadius="md"
                fontWeight="medium"
                color="text.primary"
              />
              <Text fontWeight="bold" color="text.secondary">
                Trạng thái
              </Text>
              <Input
                value={result.TrangThai || ""}
                isReadOnly
                bg="background"
                borderRadius="md"
                fontWeight="medium"
                color="text.primary"
              />
            </Flex>
          </Flex>
          <Table
            size="md"
            variant="simple"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
          >
            <Thead bg="background">
              <Tr>
                <Th fontWeight="bold" fontSize="sm" color="text.primary">
                  STT
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.primary">
                  Câu hỏi
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.primary">
                  Câu trả lời
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.primary">
                  Điểm
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.primary">
                  Ý chính & điểm
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {chiTiet.map((row, idx) => (
                <Tr
                  key={row.MaCauHoi + row.MaCauBoSung}
                  _hover={{ bg: "background" }}
                  fontSize="sm"
                  borderRadius="md"
                  transition="background 0.2s"
                >
                  <Td color="text.primary">{idx + 1}</Td>
                  <Td color="text.primary">
                    {row.MaCauBoSung
                      ? ` (Bổ sung) ${row.NoiDungCauHoi}`
                      : row.NoiDungCauHoi
                      ? row.NoiDungCauHoi
                      : ""}
                  </Td>
                  <Td color="text.primary">{row.CauTraLoi}</Td>
                  <Td color="text.primary" style={{ whiteSpace: "nowrap" }}>
                    {row.TongDiem} / {row.TongDiemToiDa}
                  </Td>
                  <Td color="text.primary">
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
              <Tr fontWeight="bold" bg="background">
                <Td colSpan={3} textAlign="right" color="text.secondary">
                  Tổng
                </Td>
                <Td style={{ whiteSpace: "nowrap" }} color="success.500">
                  {result.TongDiem}
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex w="100%" maxW="1200px" justify="flex-end" mt={8}>
          <Button
            bg="text.primary"
            color="white"
            borderRadius="full"
            px={10}
            fontWeight="bold"
            fontSize="md"
            boxShadow="md"
            _hover={{ bg: "gray.700" }}
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
