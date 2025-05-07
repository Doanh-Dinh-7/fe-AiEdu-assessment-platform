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
import { getExamDetail } from "../../controller/examManagement";
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="primary" />
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
        mb={6}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="primary"
          >
            Thông tin bài thi
          </Heading>
        </Center>
      </Flex>
      <Box
        w="100%"
        maxW="900px"
        bg="surface"
        p={8}
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      >
        <Box p={0}>
          <Text fontWeight="bold" mb={2} color="primary" fontSize="17px">
            Thông tin chung
          </Text>
          <Text color="textPrimary">Mã cuộc thi: {examDetail.MaCuocThi}</Text>
          <Text color="textPrimary">Tên cuộc thi: {examDetail.TenCuocThi}</Text>
          <Text color="textPrimary">Mã học phần: {examDetail.MaHocPhan}</Text>
          <Text color="textPrimary">
            Lớp học phần:{" "}
            {examDetail.LopHocPhan && examDetail.LopHocPhan.length > 0
              ? examDetail.LopHocPhan.map((lop) => lop.TenLopHocPhan).join(", ")
              : ""}
          </Text>
          <Text color="textPrimary">
            Thời gian bắt đầu:{" "}
            {examDetail.ThoiGianBatDau
              ? new Date(examDetail.ThoiGianBatDau).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="textPrimary">
            Thời gian kết thúc:{" "}
            {examDetail.ThoiGianKetThuc
              ? new Date(examDetail.ThoiGianKetThuc).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="textPrimary">Trạng thái: {examDetail.TrangThai}</Text>
          <Box h={4} />
          <Text fontWeight="bold" mb={2} color="primary" fontSize="17px">
            Thông tin chi tiết
          </Text>
          {/* Bảng cấu trúc đề thi */}
          <Table
            size="md"
            mb={4}
            bg="surface"
            borderRadius="12px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th color="primary">Chương</Th>
                <Th color="primary">Mức độ</Th>
                <Th color="primary">Số lượng câu</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(examDetail.CauTrucDeThi || []).map((row, idx) => (
                <Tr
                  key={row.MaChuong + row.MucDo + idx}
                  _hover={{ bg: "gray.50" }}
                >
                  <Td color="textPrimary">{row.TenChuong}</Td>
                  <Td color="textPrimary">{row.MucDo}</Td>
                  <Td color="textPrimary">{row.SoLuongCauHoi}</Td>
                </Tr>
              ))}
              {/* Dòng tổng */}
              <Tr fontWeight="bold" bg="#F2F4F8">
                <Td color="textSecondary">Tổng</Td>
                <Td color="textSecondary">–</Td>
                <Td color="textSecondary">
                  Dễ: {totalCounts["dễ"]} - Trung bình:{" "}
                  {totalCounts["trung bình"]} - Khó: {totalCounts["khó"]}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Bảng điểm */}
          <Table
            size="md"
            bg="surface"
            borderRadius="12px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th color="primary">Loại câu</Th>
                <Th color="primary">Điểm</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">Dễ</Td>
                <Td color="textPrimary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauDe}
                </Td>
              </Tr>
              <Tr _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">Trung bình</Td>
                <Td color="textPrimary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauTrungBinh}
                </Td>
              </Tr>
              <Tr _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">Khó</Td>
                <Td color="textPrimary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauKho}
                </Td>
              </Tr>
              <Tr _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">Bổ sung</Td>
                <Td color="textPrimary">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauBoSung}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
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
  );
};

export default ExamDetail;
