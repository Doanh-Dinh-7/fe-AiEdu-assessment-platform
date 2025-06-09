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
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select } from "chakra-react-select";
import {
  createExam,
  updateExam,
  getExamDetail,
} from "../../service/examManagement";
import { getCoursesList, getCourseDetail } from "../../service/course";
import { getClassList } from "../../service/class";

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
  const [HinhThucThi, setHinhThucThi] = useState("vấn đáp");

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
          setHinhThucThi(data.HinhThucThi || "vấn đáp");
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
      !HinhThucThi ||
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
        HinhThucThi,
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
    <Box minH="100vh" bg="background" py={8} px={4}>
      <Flex
        w="100%"
        maxW="1200px"
        mx="auto"
        direction="column"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        p={8}
        fontFamily="Inter, sans-serif"
      >
        <Heading
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
          mb={8}
          color="brand.500"
        >
          {mode === "create" ? "Tạo mới" : "Chỉnh sửa"} kỳ thi
        </Heading>
        {step === 1 && (
          <Flex direction="column" gap={6}>
            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Chọn học phần
              </Text>
              <Select
                options={courses.map((course) => ({
                  label: course.TenHocPhan,
                  value: course.MaHocPhan,
                }))}
                placeholder="Chọn học phần"
                value={selectedCourse}
                onChange={setSelectedCourse}
                isClearable
                isDisabled={mode === "edit"}
                focusBorderColor="brand.500"
                chakraStyles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "md",
                    borderColor: "border",
                    bg: "background",
                    _hover: { borderColor: "brand.500" },
                    _focus: {
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "text.secondary",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "text.primary",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    bg: "surface",
                    boxShadow: "md",
                    borderRadius: "md",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    bg: state.isSelected ? "brand.100" : "surface",
                    color: state.isSelected ? "brand.700" : "text.primary",
                    _hover: { bg: "brand.50", color: "brand.600" },
                  }),
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Chọn lớp học phần
              </Text>
              <Select
                options={filteredClasses.map((cls) => ({
                  label: cls.TenLopHocPhan,
                  value: cls.MaLopHocPhan,
                }))}
                placeholder="Chọn lớp học phần"
                value={selectedClasses}
                onChange={setSelectedClasses}
                isMulti
                closeMenuOnSelect={false}
                isDisabled={!selectedCourse || mode === "edit"}
                focusBorderColor="brand.500"
                chakraStyles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "md",
                    borderColor: "border",
                    bg: "background",
                    _hover: { borderColor: "brand.500" },
                    _focus: {
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "text.secondary",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    bg: "brand.100",
                    borderRadius: "md",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: "brand.700",
                    fontWeight: "medium",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: "brand.700",
                    _hover: { bg: "brand.200", color: "brand.800" },
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    bg: "surface",
                    boxShadow: "md",
                    borderRadius: "md",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    bg: state.isSelected ? "brand.100" : "surface",
                    color: state.isSelected ? "brand.700" : "text.primary",
                    _hover: { bg: "brand.50", color: "brand.600" },
                  }),
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Tên cuộc thi
              </Text>
              <Input
                placeholder="Nhập tên cuộc thi"
                value={TenCuocThi}
                onChange={(e) => setTenCuocThi(e.target.value)}
                borderRadius="md"
                borderColor="border"
                bg="background"
                color="text.primary"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px #4A90E2",
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Hình thức thi
              </Text>
              <Select
                options={[
                  { label: "Vấn đáp", value: "vấn đáp" },
                  { label: "Tự luận", value: "tự luận" },
                ]}
                placeholder="Chọn hình thức thi"
                value={
                  HinhThucThi
                    ? {
                        label: HinhThucThi === "vấn đáp" ? "Vấn đáp" : "Tự luận",
                        value: HinhThucThi,
                      }
                    : null
                }
                onChange={(option) => setHinhThucThi(option?.value || "vấn đáp")}
                isClearable={false}
                focusBorderColor="brand.500"
                chakraStyles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "md",
                    borderColor: "border",
                    bg: "background",
                    _hover: { borderColor: "brand.500" },
                    _focus: {
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "text.secondary",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "text.primary",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    bg: "surface",
                    boxShadow: "md",
                    borderRadius: "md",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    bg: state.isSelected ? "brand.100" : "surface",
                    color: state.isSelected ? "brand.700" : "text.primary",
                    _hover: { bg: "brand.50", color: "brand.600" },
                  }),
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Thời gian bắt đầu
              </Text>
              <Input
                type="datetime-local"
                value={ThoiGianBatDau}
                onChange={(e) => setThoiGianBatDau(e.target.value)}
                borderRadius="md"
                borderColor="border"
                bg="background"
                color="text.primary"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px #4A90E2",
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Thời gian kết thúc
              </Text>
              <Input
                type="datetime-local"
                value={ThoiGianKetThuc}
                onChange={(e) => setThoiGianKetThuc(e.target.value)}
                borderRadius="md"
                borderColor="border"
                bg="background"
                color="text.primary"
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px #4A90E2",
                }}
              />
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} color="text.secondary">
                Trạng thái luyện thi
              </Text>
              <Checkbox
                isChecked={trangThai === "có"}
                onChange={(e) =>
                  setTrangThai(e.target.checked ? "có" : "không")
                }
                colorScheme="brand"
              >
                Cho phép luyện thi
              </Checkbox>
            </Box>

            <Flex justify="flex-end">
              <Button colorScheme="brand" onClick={handleNextStep}>
                Tiếp tục
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 2 && (
          <Flex direction="column" gap={6}>
            <Box>
              <Heading size="md" mb={4} color="brand.500">
                Cấu trúc đề thi
              </Heading>
              <Table variant="simple" size="sm">
                <Thead bg="background">
                  <Tr>
                    <Th color="text.secondary">Chương</Th>
                    <Th color="text.secondary">Mức độ</Th>
                    <Th color="text.secondary">Số lượng câu hỏi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cauTrucDeThi.map((item, index) => (
                    <Tr key={index} _hover={{ bg: "background" }}>
                      <Td color="text.primary">{item.TenChuong}</Td>
                      <Td color="text.primary">{item.MucDo}</Td>
                      <Td>
                        <Input
                          type="number"
                          value={item.SoLuongCauHoi}
                          onChange={(e) =>
                            handleCauTrucChange(
                              index,
                              parseInt(e.target.value) || 0
                            )
                          }
                          min={0}
                          size="sm"
                          width="70px"
                          textAlign="center"
                          borderRadius="md"
                          borderColor="border"
                          bg="background"
                          color="text.primary"
                          _focus={{
                            borderColor: "brand.500",
                            boxShadow: "0 0 0 1px #4A90E2",
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Box>
              <Heading size="md" mb={4} color="brand.500">
                Điểm cho từng mức độ
              </Heading>
              <VStack align="stretch" spacing={4}>
                <Flex align="center" gap={4}>
                  <Text fontWeight="bold" color="text.secondary" w="150px">
                    Điểm câu Dễ:
                  </Text>
                  <Input
                    type="number"
                    value={DiemCauDe}
                    onChange={(e) =>
                      setDiemCauDe(parseFloat(e.target.value) || 0)
                    }
                    min={0}
                    size="md"
                    width="100px"
                    borderRadius="md"
                    borderColor="border"
                    bg="background"
                    color="text.primary"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    }}
                  />
                </Flex>
                <Flex align="center" gap={4}>
                  <Text fontWeight="bold" color="text.secondary" w="150px">
                    Điểm câu Trung bình:
                  </Text>
                  <Input
                    type="number"
                    value={DiemCauTrungBinh}
                    onChange={(e) =>
                      setDiemCauTrungBinh(parseFloat(e.target.value) || 0)
                    }
                    min={0}
                    size="md"
                    width="100px"
                    borderRadius="md"
                    borderColor="border"
                    bg="background"
                    color="text.primary"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    }}
                  />
                </Flex>
                <Flex align="center" gap={4}>
                  <Text fontWeight="bold" color="text.secondary" w="150px">
                    Điểm câu Khó:
                  </Text>
                  <Input
                    type="number"
                    value={DiemCauKho}
                    onChange={(e) =>
                      setDiemCauKho(parseFloat(e.target.value) || 0)
                    }
                    min={0}
                    size="md"
                    width="100px"
                    borderRadius="md"
                    borderColor="border"
                    bg="background"
                    color="text.primary"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    }}
                  />
                </Flex>
                <Flex align="center" gap={4}>
                  <Text fontWeight="bold" color="text.secondary" w="150px">
                    Điểm câu bổ sung:
                  </Text>
                  <Input
                    type="number"
                    value={DiemCauBoSung}
                    onChange={(e) =>
                      setDiemCauBoSung(parseFloat(e.target.value) || 0)
                    }
                    min={0}
                    size="md"
                    width="100px"
                    borderRadius="md"
                    borderColor="border"
                    bg="background"
                    color="text.primary"
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px #4A90E2",
                    }}
                  />
                </Flex>
              </VStack>
            </Box>

            <Flex justify="space-between">
              <Button colorScheme="gray" onClick={() => setStep(1)}>
                Quay lại
              </Button>
              <Button
                colorScheme="brand"
                onClick={handleCreateOrUpdateExam}
                isLoading={loading}
              >
                {mode === "create" ? "Tạo bài thi" : "Cập nhật"}
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ExamForm;
