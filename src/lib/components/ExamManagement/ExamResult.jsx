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
      bg="#F2F4F8"
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        direction="column"
        mb={8}
        gap={4}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
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
            Kết quả bài thi
          </Heading>
        </Center>

        <Flex wrap="wrap" gap={6} mb={6} w="90%" maxW="1100px">
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold" color="#5F6368">
              Tên cuộc thi
            </Text>
            <Input
              value={examInfo.TenCuocThi || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Môn học
            </Text>
            <Input
              value={examInfo.HocPhan?.TenHocPhan || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Hình thức thi
            </Text>
            <Input
              value={examInfo.HocPhan?.HinhThucThi || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Các chương
            </Text>
            <Input
              value={
                examInfo.DanhSachChuong?.map((c) => c.TenChuong).join(", ") ||
                ""
              }
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
          </Flex>
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold" color="#5F6368">
              Thời gian bắt đầu
            </Text>
            <Input
              value={examInfo.ThoiGianBatDau || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Thời gian kết thúc
            </Text>
            <Input
              value={examInfo.ThoiGianKetThuc || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Lớp học phần
            </Text>
            <Input
              value={
                examInfo.DanhSachLopHocPhan?.map((l) => l.TenLopHocPhan).join(
                  ", "
                ) || ""
              }
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
            <Text fontWeight="bold" color="#5F6368">
              Số lượng sinh viên
            </Text>
            <Input
              value={examInfo.SoLuongSinhVien || ""}
              isReadOnly
              bg="#F2F4F8"
              borderRadius="12px"
              fontWeight="medium"
              color="#1C1C1C"
            />
          </Flex>
        </Flex>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="#FFFFFF"
        borderRadius="12px"
        p={6}
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
      >
        <Table size="md" variant="simple" borderRadius="12px" overflow="hidden">
          <Thead bg="#F2F4F8">
            <Tr>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Mã sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Tên sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Tổng điểm
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Trạng thái
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {examInfo.DanhSachKetQua?.map((row, idx) => (
              <Tr
                key={row.MaSinhVien}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{idx + 1}</Td>
                <Td color="#1C1C1C">{row.MaSinhVien}</Td>
                <Td color="#1C1C1C">{row.TenSinhVien}</Td>
                <Td color="#1C1C1C">{row.TongDiem}</Td>
                <Td color="#1C1C1C">{row.TrangThai}</Td>
                <Td>
                  <Button
                    leftIcon={<FaEye />}
                    size="sm"
                    borderRadius="999px"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() =>
                      navigate(`${location.pathname}/${row.MaSinhVien}`)
                    }
                  >
                    Chi tiết
                  </Button>
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
