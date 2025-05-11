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
      bg="#F2F4F8"
      py={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Thông tin bài thi
          </Heading>
        </Center>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="#FFFFFF"
        p={8}
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
      >
        <Box p={0}>
          <Text fontWeight="bold" mb={2} color="#4A90E2" fontSize="17px">
            Thông tin chung
          </Text>
          <Text color="#1C1C1C">Mã cuộc thi: {examDetail.MaCuocThi}</Text>
          <Text color="#1C1C1C">Tên cuộc thi: {examDetail.TenCuocThi}</Text>
          <Text color="#1C1C1C">Mã học phần: {examDetail.MaHocPhan}</Text>
          <Text color="#1C1C1C">
            Lớp học phần:{" "}
            {examDetail.LopHocPhan && examDetail.LopHocPhan.length > 0
              ? examDetail.LopHocPhan.map((lop) => lop.TenLopHocPhan).join(", ")
              : ""}
          </Text>
          <Text color="#1C1C1C">
            Thời gian bắt đầu:{" "}
            {examDetail.ThoiGianBatDau
              ? new Date(examDetail.ThoiGianBatDau).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="#1C1C1C">
            Thời gian kết thúc:{" "}
            {examDetail.ThoiGianKetThuc
              ? new Date(examDetail.ThoiGianKetThuc).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text color="#1C1C1C">Trạng thái: {examDetail.TrangThai}</Text>
          <Box h={4} />
          <Text fontWeight="bold" mb={2} color="#4A90E2" fontSize="17px">
            Thông tin chi tiết
          </Text>
          {/* Bảng cấu trúc đề thi */}
          <Table
            size="md"
            mb={4}
            bg="transparent"
            borderRadius="12px"
            boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Chương
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Mức độ
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Số lượng câu
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {(examDetail.CauTrucDeThi || []).map((row, idx) => (
                <Tr
                  key={row.MaChuong + row.MucDo + idx}
                  _hover={{ bg: "#F2F4F8" }}
                  fontSize="15px"
                  borderRadius="12px"
                  transition="background 0.2s"
                >
                  <Td color="#1C1C1C">{row.TenChuong}</Td>
                  <Td color="#1C1C1C">{row.MucDo}</Td>
                  <Td color="#1C1C1C">{row.SoLuongCauHoi}</Td>
                </Tr>
              ))}
              {/* Dòng tổng */}
              <Tr fontWeight="bold" bg="#F2F4F8">
                <Td color="#5F6368">Tổng</Td>
                <Td color="#5F6368">–</Td>
                <Td color="#5F6368">
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
            borderRadius="12px"
            boxShadow="0 2px 8px rgba(0,0,0,0.08)"
            overflow="hidden"
          >
            <Thead bg="#F2F4F8">
              <Tr>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Loại câu
                </Th>
                <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                  Điểm
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">Dễ</Td>
                <Td color="#1C1C1C">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauDe}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">Trung bình</Td>
                <Td color="#1C1C1C">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauTrungBinh}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">Khó</Td>
                <Td color="#1C1C1C">
                  {examDetail.NoiDungDiem?.[0]?.DiemCauKho}
                </Td>
              </Tr>
              <Tr
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">Bổ sung</Td>
                <Td color="#1C1C1C">
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
