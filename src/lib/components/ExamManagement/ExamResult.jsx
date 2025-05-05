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
import { getExamResult } from "../../controller/examManagement";
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
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        direction="column"
        mb={6}
        gap={4}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Kết quả bài thi
          </Heading>
        </Center>

        <Flex wrap="wrap" gap={6} mb={6} w="90%" maxW="1100px">
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold">Tên cuộc thi</Text>
            <Input value={examInfo.TenCuocThi || ""} isReadOnly bg="#e6eaf7" />
            <Text fontWeight="bold">Môn học</Text>
            <Input
              value={examInfo.HocPhan?.TenHocPhan || ""}
              isReadOnly
              bg="#e6eaf7"
            />
            <Text fontWeight="bold">Hình thức thi</Text>
            <Input
              value={examInfo.HocPhan?.HinhThucThi || ""}
              isReadOnly
              bg="#e6eaf7"
            />
            <Text fontWeight="bold">Các chương</Text>
            <Input
              value={
                examInfo.DanhSachChuong?.map((c) => c.TenChuong).join(", ") ||
                ""
              }
              isReadOnly
              bg="#e6eaf7"
            />
          </Flex>
          <Flex direction="column" gap={2} flex={1} minW="250px">
            <Text fontWeight="bold">Thời gian bắt đầu</Text>
            <Input
              value={examInfo.ThoiGianBatDau || ""}
              isReadOnly
              bg="#e6eaf7"
            />
            <Text fontWeight="bold">Thời gian kết thúc</Text>
            <Input
              value={examInfo.ThoiGianKetThuc || ""}
              isReadOnly
              bg="#e6eaf7"
            />
            <Text fontWeight="bold">Lớp học phần</Text>
            <Input
              value={
                examInfo.DanhSachLopHocPhan?.map((l) => l.TenLopHocPhan).join(
                  ", "
                ) || ""
              }
              isReadOnly
              bg="#e6eaf7"
            />
            <Text fontWeight="bold">Số lượng sinh viên</Text>
            <Input
              value={examInfo.SoLuongSinhVien || ""}
              isReadOnly
              bg="#e6eaf7"
            />
          </Flex>
        </Flex>
      </Flex>
      <Box w="95%" maxW="1100px" bg="white" borderRadius="md" p={4}>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Mã sinh viên</Th>
              <Th>Tên sinh viên</Th>
              <Th>Tổng điểm</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {examInfo.DanhSachKetQua?.map((row, idx) => (
              <Tr key={row.MaSinhVien}>
                <Td>{idx + 1}</Td>
                <Td>{row.MaSinhVien}</Td>
                <Td>{row.TenSinhVien}</Td>
                <Td>{row.TongDiem}</Td>
                <Td>{row.TrangThai}</Td>
                <Td>
                  <Button
                    leftIcon={<FaEye />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    borderRadius="full"
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
    </Flex>
  );
};

export default ExamResult;
