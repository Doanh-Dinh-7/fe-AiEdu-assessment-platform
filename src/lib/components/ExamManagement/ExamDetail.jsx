import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  useToast,
  Center,
  Spinner,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getExamDetail } from "../../service/examManagement";
import { useNavigate, useParams } from "react-router-dom";

const ExamDetail = () => {
  const navigate = useNavigate();
  const { maCuocThi } = useParams();
  const [examDetail, setExamDetail] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const data = await getExamDetail(maCuocThi);
        if (!data) throw new Error("Error fetching ExamDetail");
        setExamDetail(data);
      } catch (error) {
        toast({
          title: "Lấy thông tin cuộc thi thất bại",
          description: "Có lỗi xảy ra khi lấy thông tin cuộc thi.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching ExamDetail:", error);
        setExamDetail([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [maCuocThi, toast]);

  // Tính tổng câu hỏi theo từng mức độ
  const totalCounts = {
    dễ: 0,
    "trung bình": 0,
    khó: 0,
  };

  (examDetail?.CauTrucDeThi || []).forEach((item) => {
    const mucDo = item.MucDo?.toLowerCase();
    if (totalCounts[mucDo] !== undefined) {
      totalCounts[mucDo] += item.SoLuongCauHoi || 0;
    }
  });

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="#4A90E2" />
    </Center>
  ) : (
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      bg="background"
      py={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Thông tin bài thi
          </Heading>
        </Center>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="surface"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
        <Box p={0}>
          <Text fontWeight="bold" mb={2} color="brand.500" fontSize="md">
            Thông tin chung
          </Text>
          <Text color="text.primary">Mã cuộc thi: {examDetail.MaCuocThi}</Text>
          <Text color="text.primary">
            Tên cuộc thi: {examDetail.TenCuocThi}
          </Text>
          <Text color="text.primary">Mã học phần: {examDetail.MaHocPhan}</Text>
          <Text color="text.primary">
            Lớp học phần:{" "}
            {examDetail.LopHocPhan && examDetail.LopHocPhan.length > 0
              ? examDetail.LopHocPhan.map((lop) => lop.TenLopHocPhan).join(", ")
              : ""}
          </Text>
          <Text color="text.primary">
            Thời gian bắt đầu:{" "}
            {examDetail.ThoiGianBatDau
              ? new Date(examDetail.ThoiGianBatDau).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="text.primary">
            Thời gian kết thúc:{" "}
            {examDetail.ThoiGianKetThuc
              ? new Date(examDetail.ThoiGianKetThuc).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="text.primary">Trạng thái: {examDetail.TrangThai}</Text>
          <Box h={4} />
          <Text fontWeight="bold" mb={2} color="brand.500" fontSize="md">
            Thông tin chi tiết
          </Text>
          {/* Bảng cấu trúc đề thi */}
          <Table
            size="md"
            mb={4}
            bg="transparent"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
          >
            <Thead bg="background">
              <Tr>
                <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                  Chương
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                  Mức độ
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                  Số lượng câu
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {(examDetail.CauTrucDeThi || []).map((row, idx) => (
                <Tr
                  key={row.MaChuong + row.MucDo + idx}
                  _hover={{ bg: "background" }}
                  fontSize="sm"
                  borderRadius="md"
                  transition="background 0.2s"
                >
                  <Td color="text.primary">{row.TenChuong}</Td>
                  <Td color="text.primary">{row.MucDo}</Td>
                  <Td color="text.primary">{row.SoLuongCauHoi}</Td>
                </Tr>
              ))}
              {/* Dòng tổng */}
              <Tr fontWeight="bold" bg="background">
                <Td color="text.secondary">Tổng</Td>
                <Td color="text.secondary">–</Td>
                <Td color="text.secondary">
                  Dễ: {totalCounts["dễ"]} - Trung bình:{" "}
                  {totalCounts["trung bình"]} - Khó: {totalCounts["khó"]}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Bảng điểm */}
          <Table
            size="md"
            bg="transparent"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
          >
            <Thead bg="background">
              <Tr>
                <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                  Loại câu
                </Th>
                <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                  Điểm
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr
                _hover={{ bg: "background" }}
                fontSize="sm"
                borderRadius="md"
                transition="background 0.2s"
              >
                <Td color="text.primary">Dễ</Td>
                <Td color="text.primary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauDe}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "background" }}
                fontSize="sm"
                borderRadius="md"
                transition="background 0.2s"
              >
                <Td color="text.primary">Trung bình</Td>
                <Td color="text.primary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauTrungBinh}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "background" }}
                fontSize="sm"
                borderRadius="md"
                transition="background 0.2s"
              >
                <Td color="text.primary">Khó</Td>
                <Td color="text.primary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauKho}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "background" }}
                fontSize="sm"
                borderRadius="md"
                transition="background 0.2s"
              >
                <Td color="text.primary">Bổ sung</Td>
                <Td color="text.primary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauBoSung}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
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
  );
};

export default ExamDetail;
