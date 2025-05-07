import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select } from "chakra-react-select";
import {
  createExam,
  updateExam,
  getExamDetail,
} from "../../controller/examManagement";
import { getCoursesList, getCourseDetail } from "../../controller/course";
import { getClassList } from "../../controller/class";

// // Giả lập dữ liệu chương và lớp học phần (cần thay bằng API thực tế)
// const mockChapters = [
//   { MaChuong: "C714768", TenChuong: "Chương 1" },
//   { MaChuong: "C022853", TenChuong: "Chương 2" },
//   { MaChuong: "C999999", TenChuong: "Chương 3" },
// ];
// const mockClasses = [
//   { MaLopHocPhan: "LHP770804", TenLopHocPhan: "Lớp 47K29.1" },
//   { MaLopHocPhan: "LHP671978", TenLopHocPhan: "Lớp 47K29.2" },
// ];
const mucDoOptions = [
  { label: "Dễ", value: "dễ" },
  { label: "Trung bình", value: "trung bình" },
  { label: "Khó", value: "khó" },
];

// Chuyển đổi datetime-local thành 'YYYY-MM-DD HH:MM:SS'
function formatDateTimeLocal(str) {
  if (!str) return "";
  const [date, time] = str.split("T");
  let timeWithSec = "";

  if (date && time) {
    timeWithSec = time.length === 5 ? time + ":00" : time;
    return `${date} ${timeWithSec}`;
  } else if (date && !time) {
    return `${date}:00`;
  }
  return `${date} ${timeWithSec}`;
}

const ExamForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode = "create" } = location.state || {};
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [editExamId, setEditExamId] = useState(null);

  // Bước 1: Chọn học phần, lớp học phần, nhập thông tin cơ bản
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [TenCuocThi, setTenCuocThi] = useState("");
  const [ThoiGianBatDau, setThoiGianBatDau] = useState("");
  const [ThoiGianKetThuc, setThoiGianKetThuc] = useState("");
  const [trangThai, setTrangThai] = useState("có");

  // Bước 2: Cấu trúc đề thi và điểm
  const [cauTrucDeThi, setCauTrucDeThi] = useState([]);
  const [DiemCauDe, setDiemCauDe] = useState(0);
  const [DiemCauTrungBinh, setDiemCauTrungBinh] = useState(0);
  const [DiemCauKho, setDiemCauKho] = useState(0);
  const [DiemCauBoSung, setDiemCauBoSung] = useState(0);

  // Load courses và classes khi mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, classRes] = await Promise.all([
          getCoursesList(),
          getClassList(),
        ]);
        setCourses(courseRes || []);
        setClasses(classRes || []);
      } catch (error) {
        toast({
          title: "Lỗi khi tải dữ liệu",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(
          "Lỗi khi bắt 2 API getCoursesList và getClassList: ",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  // Khi chọn học phần, lọc lại danh sách lớp học phần
  useEffect(() => {
    if (!selectedCourse) {
      setFilteredClasses([]);
      setSelectedClasses([]);
      return;
    }
    const filtered = classes.filter((c) =>
      (c.MaHocPhan || []).includes(selectedCourse.value)
    );
    setFilteredClasses(filtered);

    // Giữ lại các lớp học phần đã chọn nếu chúng vẫn thuộc học phần đang chọn
    setSelectedClasses((prev) =>
      (prev || []).filter((c) =>
        filtered.some((f) => f.MaLopHocPhan === c.value)
      )
    );
  }, [selectedCourse, classes]);

  // Nếu là edit, load dữ liệu bài thi
  useEffect(() => {
    if (mode === "edit" && location.state?.maCuocThi) {
      setLoading(true);
      getExamDetail(location.state.maCuocThi) // Call API
        .then((data) => {
          if (!data) throw new Error("Không lấy được dữ liệu bài thi");
          setEditExamId(data.MaCuocThi);
          setTenCuocThi(data.TenCuocThi || "");
          setThoiGianBatDau(
            data.ThoiGianBatDau
              ? data.ThoiGianBatDau.replace("T", " ").slice(0, 16)
              : ""
          );
          setThoiGianKetThuc(
            data.ThoiGianKetThuc
              ? data.ThoiGianKetThuc.replace("T", " ").slice(0, 16)
              : ""
          );
          setTrangThai(data.TrangThai || "có");
          setSelectedCourse(
            data.MaHocPhan
              ? {
                  label:
                    courses.find((c) => c.MaHocPhan === data.MaHocPhan)
                      ?.TenHocPhan || "",
                  value: data.MaHocPhan,
                }
              : null
          );
          setSelectedClasses(
            (data.LopHocPhan || []).map((lop) => ({
              label: lop.TenLopHocPhan,
              value: lop.MaLopHocPhan,
            }))
          );

          // Cấu trúc đề thi
          setCauTrucDeThi(
            (data.CauTrucDeThi || []).map((item) => ({
              MaChuong: item.MaChuong,
              TenChuong: item.TenChuong,
              MucDo: item.MucDo,
              SoLuongCauHoi: item.SoLuongCauHoi,
            }))
          );
          setDiemCauDe(data.NoiDungDiem[0].DiemCauDe || 0);
          setDiemCauTrungBinh(data.NoiDungDiem[0].DiemCauTrungBinh || 0);
          setDiemCauKho(data.NoiDungDiem[0].DiemCauKho || 0);
          setDiemCauBoSung(data.NoiDungDiem[0].DiemCauBoSung || 0);
          setStep(2);
        })
        .catch((error) => {
          toast({
            title: "Lỗi khi lấy dữ liệu bài thi",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log("Lỗi khi lấy dữ liệu bài thi", error);
        })
        .finally(() => setLoading(false));
    }
  }, [mode, location.state, courses, toast]);

  // Khi xác nhận bước 1, lấy chi tiết học phần (danh sách chương)
  const handleNextStep = async () => {
    if (
      !selectedCourse ||
      !TenCuocThi ||
      !ThoiGianBatDau ||
      !ThoiGianKetThuc ||
      selectedClasses.length === 0
    ) {
      toast({
        title: "Vui lòng nhập đầy đủ thông tin",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Nếu mã học phần không đổi, chỉ chuyển bước, không gọi API
    if (cauTrucDeThi.length > 0) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const detail = await getCourseDetail(selectedCourse.value);
      if (!detail || !detail.DanhSachChuong)
        throw new Error("Không lấy được danh sách chương");
      // Tạo cấu trúc đề thi mặc định: mỗi chương có 3 mức độ
      const defaultCauTruc = [];
      detail.DanhSachChuong.forEach((chuong) => {
        mucDoOptions.forEach((mucdo) => {
          defaultCauTruc.push({
            MaChuong: chuong.MaChuong,
            TenChuong: chuong.TenChuong,
            MucDo: mucdo.value,
            SoLuongCauHoi: 0,
          });
        });
      });
      setCauTrucDeThi(defaultCauTruc);
      setStep(2);
    } catch (error) {
      toast({
        title: "Lỗi khi lấy chi tiết học phần",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Lỗi khi bắt API getCourseDetail: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý nhập số câu hỏi cho từng chương/mức độ
  const handleCauTrucChange = (idx, value) => {
    setCauTrucDeThi((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, SoLuongCauHoi: value } : item
      )
    );
  };

  // Tạo/Sửa bài thi
  const handleCreateOrUpdateExam = async () => {
    setLoading(true);
    try {
      const examData = {
        TenCuocThi,
        ThoiGianBatDau: formatDateTimeLocal(ThoiGianBatDau),
        ThoiGianKetThuc: formatDateTimeLocal(ThoiGianKetThuc),
        MaLopHocPhan: selectedClasses.map((c) => c.value),
        CauTrucDeThi: cauTrucDeThi
          .filter((c) => Number(c.SoLuongCauHoi) > 0)
          .map((c) => ({
            MaChuong: c.MaChuong,
            MucDo: c.MucDo,
            SoLuongCauHoi: Number(c.SoLuongCauHoi),
          })),
        trang_thai: trangThai,
        DiemCauDe: Number(DiemCauDe),
        DiemCauTrungBinh: Number(DiemCauTrungBinh),
        DiemCauKho: Number(DiemCauKho),
        DiemCauBoSung: Number(DiemCauBoSung),
      };
      let data;

      if (mode === "edit" && editExamId) {
        data = await updateExam(editExamId, examData);
      } else {
        data = await createExam(examData);
      }
      if (!data)
        throw new Error(
          mode === "edit" ? "Cập nhật bài thi thất bại" : "Tạo bài thi thất bại"
        );
      toast({
        title:
          mode === "edit"
            ? "Cập nhật bài thi thành công!"
            : "Tạo bài thi thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/exam-management");
    } catch (error) {
      toast({
        title:
          mode === "edit"
            ? "Cập nhật bài thi thất bại!"
            : "Tạo bài thi thất bại!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      direction="column"
      bg="background"
      align="center"
      py={8}
      fontFamily="Inter, sans-serif"
    >
      <Box
        bg="surface"
        w="100%"
        maxW="900px"
        p={8}
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      >
        <Heading
          fontSize="20px"
          mb={4}
          textAlign="center"
          textTransform="uppercase"
          color="primary"
          fontWeight="bold"
        >
          {mode === "edit" ? "Sửa " : "Tạo "}bài thi
        </Heading>
        {step === 1 && (
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Tên cuộc thi"
              value={TenCuocThi}
              onChange={(e) => setTenCuocThi(e.target.value)}
              borderRadius="12px"
              bg="#F2F4F8"
              fontSize="15px"
              boxShadow="0 2px 6px rgba(0,0,0,0.04)"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
              }}
            />
            <Flex gap={3}>
              <Box flex={1}>
                <Text mb={1}>Thời gian bắt đầu</Text>
                <Input
                  type="datetime-local"
                  value={ThoiGianBatDau}
                  onChange={(e) => setThoiGianBatDau(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text mb={1}>Thời gian kết thúc</Text>
                <Input
                  type="datetime-local"
                  value={ThoiGianKetThuc}
                  onChange={(e) => setThoiGianKetThuc(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
            </Flex>
            <Box>
              <Text mb={1}>Chọn học phần</Text>
              <Select
                options={courses.map((c) => ({
                  label: c.TenHocPhan,
                  value: c.MaHocPhan,
                }))}
                value={selectedCourse}
                onChange={(option) => setSelectedCourse(option)}
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 12,
                    background: "#F2F4F8",
                    fontSize: 15,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    borderColor: "#E0E0E0",
                    color: "#1C1C1C",
                    minHeight: 44,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#5F6368",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    borderRadius: 8,
                    background: "#e6eaf7",
                    color: "#1C1C1C",
                  }),
                }}
              />
            </Box>
            <Box>
              <Text mb={1}>Chọn lớp học phần</Text>
              <Select
                isMulti
                options={filteredClasses.map((c) => ({
                  label: c.TenLopHocPhan,
                  value: c.MaLopHocPhan,
                }))}
                value={selectedClasses}
                onChange={(options) => setSelectedClasses(options || [])}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 12,
                    background: "#F2F4F8",
                    fontSize: 15,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    borderColor: "#E0E0E0",
                    color: "#1C1C1C",
                    minHeight: 44,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#5F6368",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    borderRadius: 8,
                    background: "#e6eaf7",
                    color: "#1C1C1C",
                  }),
                }}
              />
            </Box>
            <Checkbox
              isChecked={trangThai === "có"}
              onChange={(e) => setTrangThai(e.target.checked ? "có" : "không")}
            >
              Trạng thái hoạt động
            </Checkbox>
            <Flex justify="flex-end" mt={6} gap={4}>
              <Button
                colorScheme="primary"
                borderRadius="12px"
                fontWeight="bold"
                fontSize="16px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                onClick={handleNextStep}
                isLoading={loading}
              >
                Xác nhận
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 2 && (
          <Flex direction="column" gap={4}>
            <Text
              fontWeight="bold"
              mb={2}
              mt={4}
              color="primary"
              fontSize="17px"
            >
              Cấu trúc đề thi
            </Text>
            <Table
              size="sm"
              mb={2}
              bg="surface"
              borderRadius="12px"
              boxShadow="0 2px 6px rgba(0,0,0,0.08)"
              overflow="hidden"
            >
              <Thead bg="#F2F4F8">
                <Tr>
                  <Th color="primary">Chương</Th>
                  <Th color="primary">Mức độ</Th>
                  <Th color="primary">Số lượng câu hỏi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cauTrucDeThi.map((row, idx) => (
                  <Tr key={row.MaChuong + row.MucDo} _hover={{ bg: "gray.50" }}>
                    <Td color="textPrimary">{row.TenChuong}</Td>
                    <Td color="textPrimary">{row.MucDo}</Td>
                    <Td>
                      <Input
                        type="number"
                        min={0}
                        value={row.SoLuongCauHoi}
                        onChange={(e) =>
                          handleCauTrucChange(idx, e.target.value)
                        }
                        w="80px"
                        borderRadius="12px"
                        bg="#F2F4F8"
                        fontSize="15px"
                        boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                        borderColor="border"
                        color="textPrimary"
                        _placeholder={{ color: "textSecondary" }}
                        _focus={{
                          borderColor: "primary",
                          boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Text
              fontWeight="bold"
              mb={2}
              mt={4}
              color="primary"
              fontSize="17px"
            >
              Thiết lập điểm cho từng loại câu hỏi <i>(Bắt buộc)</i>
            </Text>
            <Flex gap={3}>
              <Box flex={1}>
                <Text mb={1}>Điểm câu dễ</Text>
                <Input
                  type="number"
                  value={DiemCauDe}
                  onChange={(e) => setDiemCauDe(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text mb={1}>Điểm câu trung bình</Text>
                <Input
                  type="number"
                  value={DiemCauTrungBinh}
                  onChange={(e) => setDiemCauTrungBinh(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text mb={1}>Điểm câu khó</Text>
                <Input
                  type="number"
                  value={DiemCauKho}
                  onChange={(e) => setDiemCauKho(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text mb={1}>Điểm câu bổ sung</Text>
                <Input
                  type="number"
                  value={DiemCauBoSung}
                  onChange={(e) => setDiemCauBoSung(e.target.value)}
                  borderRadius="12px"
                  bg="#F2F4F8"
                  fontSize="15px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  borderColor="border"
                  color="textPrimary"
                  _placeholder={{ color: "textSecondary" }}
                  _focus={{
                    borderColor: "primary",
                    boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
                  }}
                />
              </Box>
            </Flex>
            <Flex justify="flex-end" mt={6} gap={4}>
              <Button
                colorScheme="gray"
                borderRadius="12px"
                fontWeight="bold"
                fontSize="16px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                onClick={() => setStep(1)}
              >
                Quay lại
              </Button>
              <Button
                colorScheme="primary"
                borderRadius="12px"
                fontWeight="bold"
                fontSize="16px"
                boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                onClick={handleCreateOrUpdateExam}
                isLoading={loading}
              >
                {mode === "edit" ? "Cập nhật" : "Tạo"}
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default ExamForm;
