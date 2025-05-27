import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getExamResult } from "../../service/examManagement";
import { useEffect, useState } from "react";

// const examInfo = {
//   name: "Đề thi mẫu giữa kỳ",
//   totalQuestions: 6,
//   subject: "Kinh tế chính trị",
//   duration: 60,
//   chapters: "1, 2, 3",
//   class: "Lớp 48K21.1",
// };

// const studentResults = [
//   {
//     stt: 1,
//     mssv: "2212152138",
//     name: "Nguyễn Văn Quang",
//     cau1: 2,
//     phu1: "-",
//     cau2: 2,
//     phu2: "-",
//     cau3: 6,
//     phu3: "-",
//     total: 10,
//   },
//   {
//     stt: 2,
//     mssv: "221121514206",
//     name: "Đinh Sỹ Quốc Doanh",
//     cau1: 2,
//     phu1: "-",
//     cau2: 2,
//     phu2: "-",
//     cau3: 6,
//     phu3: "-",
//     total: 10,
//   },
//   ...Array.from({ length: 8 }).map((_, idx) => ({
//     stt: idx + 3,
//     mssv: "",
//     name: "",
//     cau1: "",
//     phu1: "",
//     cau2: "",
//     phu2: "",
//     cau3: "",
//     phu3: "",
//     total: "",
//   })),
// ];

const ExamResult = () => {
  const { maCuocThi } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [examInfo, setExamInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getExamResult(maCuocThi);
      setExamInfo(data);
      setLoading(false);
    };
    fetchData();
  }, [maCuocThi]);

  return loading || !examInfo ? (
    <Center minH="100vh">
      <Text>Đang tải...</Text>
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      py={8}
      bg="background"
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        direction="column"
        mb={8}
        gap={4}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
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
            Kết quả bài thi
          </Heading>
        </Center>

        <Flex wrap="wrap" gap={6} mb={6} w="100%" maxW="1200px">
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold" color="text.secondary">
              Tên cuộc thi
            </Text>
            <Input
              value={examInfo.TenCuocThi || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Môn học
            </Text>
            <Input
              value={examInfo.HocPhan?.TenHocPhan || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Hình thức thi
            </Text>
            <Input
              value={examInfo.HocPhan?.HinhThucThi || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Các chương
            </Text>
            <Input
              value={
                examInfo.DanhSachChuong?.map((c) => c.TenChuong).join(", ") ||
                ""
              }
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
          </Flex>
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold" color="text.secondary">
              Thời gian bắt đầu
            </Text>
            <Input
              value={examInfo.ThoiGianBatDau || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Thời gian kết thúc
            </Text>
            <Input
              value={examInfo.ThoiGianKetThuc || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Lớp học phần
            </Text>
            <Input
              value={
                examInfo.DanhSachLopHocPhan?.map((l) => l.TenLopHocPhan).join(
                  ", "
                ) || ""
              }
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
            <Text fontWeight="bold" color="text.secondary">
              Số lượng sinh viên
            </Text>
            <Input
              value={examInfo.SoLuongSinhVien || ""}
              isReadOnly
              bg="background"
              borderRadius="md"
              fontWeight="medium"
              color="text.primary"
            />
          </Flex>
        </Flex>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="surface"
        borderRadius="md"
        p={6}
        boxShadow="md"
      >
        <Table variant="simple" size="md" borderRadius="md" overflow="hidden">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                Mã sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                Tên sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                Tổng điểm
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="text.secondary">
                Trạng thái
              </Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {examInfo.DanhSachKetQua?.map((student, idx) => (
              <Tr key={student.MaSinhVien} _hover={{ bg: "background" }}>
                <Td color="text.primary">{idx + 1}</Td>
                <Td color="text.primary">{student.MaSinhVien}</Td>
                <Td color="text.primary">{student.TenSinhVien}</Td>
                <Td color="text.primary">{student.TongDiem}</Td>
                <Td color="text.primary">{student.TrangThai}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEye />}
                    size="sm"
                    borderRadius="full"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() =>
                      navigate(`${location.pathname}/${student.MaSinhVien}`)
                    }
                    boxShadow="sm"
                    aria-label="Xem chi tiết kết quả"
                  />
                </Td>
              </Tr>
            ))}
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
  );
};

export default ExamResult;
