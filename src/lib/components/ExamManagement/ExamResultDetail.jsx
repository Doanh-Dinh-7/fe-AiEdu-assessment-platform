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
    <Box minH="100vh" bg="#F2F4F8" p={0} fontFamily="Inter, sans-serif">
      <Flex direction="column" align="center" py={8}>
        <Center flex={1} mb={8}>
          <Heading
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Chi tiết kết quả bài thi
          </Heading>
        </Center>
        <Box
          w="100%"
          maxW="1200px"
          bg="#FFFFFF"
          borderRadius="12px"
          p={6}
          mb={4}
          boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        >
          <Flex wrap="wrap" gap={6} mb={4}>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="#5F6368">
                Tên sinh viên
              </Text>
              <Input
                value={result.TenSinhVien || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="#1C1C1C"
              />
              <Text fontWeight="bold" color="#5F6368">
                Mã sinh viên
              </Text>
              <Input
                value={result.MaSinhVien || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="#1C1C1C"
              />
            </Flex>
            <Flex direction="column" gap={2} flex={1} minW="250px">
              <Text fontWeight="bold" color="#5F6368">
                Tên cuộc thi
              </Text>
              <Input
                value={result.TenCuocThi || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="#1C1C1C"
              />
              <Text fontWeight="bold" color="#5F6368">
                Tổng điểm
              </Text>
              <Input
                value={result.TongDiem || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="#1C1C1C"
              />
              <Text fontWeight="bold" color="#5F6368">
                Trạng thái
              </Text>
              <Input
                value={result.TrangThai || ""}
                isReadOnly
                bg="#F2F4F8"
                borderRadius="12px"
                fontWeight="medium"
                color="#1C1C1C"
              />
            </Flex>
          </Flex>
          <Table
            size="md"
            variant="simple"
            borderRadius="12px"
            boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  STT
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Câu hỏi
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Câu trả lời
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Điểm
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Ý chính & điểm
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {chiTiet.map((row, idx) => (
                <Tr
                  key={row.MaCauHoi + row.MaCauBoSung}
                  _hover={{ bg: "#F2F4F8" }}
                  fontSize="15px"
                  borderRadius="12px"
                  transition="background 0.2s"
                >
                  <Td color="#1C1C1C">{idx + 1}</Td>
                  <Td color="#1C1C1C">
                    {row.MaCauBoSung
                      ? ` (Bổ sung) ${row.NoiDungCauHoi}`
                      : row.NoiDungCauHoi
                      ? row.NoiDungCauHoi
                      : ""}
                  </Td>
                  <Td color="#1C1C1C">{row.CauTraLoi}</Td>
                  <Td color="#1C1C1C" style={{ whiteSpace: "nowrap" }}>
                    {row.TongDiem} / {row.TongDiemToiDa}
                  </Td>
                  <Td color="#1C1C1C">
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
                <Td colSpan={3} textAlign="right" color="#5F6368">
                  Tổng
                </Td>
                <Td style={{ whiteSpace: "nowrap" }} color="#34A853">
                  {result.TongDiem}
                </Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex w="90%" maxW="900px" justify="flex-end" mt={8}>
          <Button
            bg="#1C1C1C"
            color="#fff"
            borderRadius="999px"
            px={10}
            fontWeight="bold"
            fontSize="16px"
            boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            _hover={{ bg: "#333" }}
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
