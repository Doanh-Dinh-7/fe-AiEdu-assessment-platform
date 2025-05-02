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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getExamDetail } from "../../controller/examManagement";
import { useParams } from "react-router-dom";

const ExamDetail = () => {
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Center>
  ) : (
    <Flex direction="column" align="center" minH="100vh" bg="#F5F9FF" pt={5}>
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
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Thông tin bài thi
          </Heading>
        </Center>
      </Flex>
      <Box
        w="100%"
        maxW="900px"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Box p={4}>
          <Text fontWeight="bold" mb={2}>
            Thông tin chung
          </Text>
          <Text>Mã cuộc thi: {examDetail.MaCuocThi}</Text>
          <Text>Tên cuộc thi: {examDetail.TenCuocThi}</Text>
          <Text>Mã học phần: {examDetail.MaHocPhan}</Text>
          <Text>
            Lớp học phần:{" "}
            {examDetail.LopHocPhan && examDetail.LopHocPhan.length > 0
              ? examDetail.LopHocPhan.map((lop) => lop.TenLopHocPhan).join(", ")
              : ""}
          </Text>
          <Text>
            Thời gian bắt đầu:{" "}
            {examDetail.ThoiGianBatDau
              ? new Date(examDetail.ThoiGianBatDau).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text>
            Thời gian kết thúc:{" "}
            {examDetail.ThoiGianKetThuc
              ? new Date(examDetail.ThoiGianKetThuc).toLocaleString("vi-VN")
              : ""}
          </Text>
          <Text>Trạng thái: {examDetail.TrangThai}</Text>
          <Box h={4} />
          <Text fontWeight="bold" mb={2}>
            Thông tin chi tiết
          </Text>
          {/* Bảng cấu trúc đề thi */}
          <Table size="md" mb={4}>
            <Thead>
              <Tr>
                <Th>Chương</Th>
                <Th>Mức độ</Th>
                <Th>Số lượng câu</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(examDetail.CauTrucDeThi || []).map((row, idx) => (
                <Tr key={row.MaChuong + row.MucDo + idx}>
                  <Td>{row.TenChuong}</Td>
                  <Td>{row.MucDo}</Td>
                  <Td>{row.SoLuongCauHoi}</Td>
                </Tr>
              ))}
              {/* Dòng tổng */}
              <Tr fontWeight="bold" bg="gray.100">
                <Td>Tổng</Td>
                <Td>–</Td>
                <Td>
                  Dễ: {totalCounts["dễ"]} - Trung bình:{" "}
                  {totalCounts["trung bình"]} - Khó: {totalCounts["khó"]}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Bảng điểm */}
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Loại câu</Th>
                <Th>Điểm</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Dễ</Td>
                <Td>{examDetail.NoiDungDiem?.[0]?.DiemCauDe}</Td>
              </Tr>
              <Tr>
                <Td>Trung bình</Td>
                <Td>{examDetail.NoiDungDiem?.[0]?.DiemCauTrungBinh}</Td>
              </Tr>
              <Tr>
                <Td>Khó</Td>
                <Td>{examDetail.NoiDungDiem?.[0]?.DiemCauKho}</Td>
              </Tr>
              <Tr>
                <Td>Bổ sung</Td>
                <Td>{examDetail.NoiDungDiem?.[0]?.DiemCauBoSung}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

export default ExamDetail;
