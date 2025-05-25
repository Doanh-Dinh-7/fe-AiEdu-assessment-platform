import {
  // Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Center,
  IconButton,
  useDisclosure,
  useToast,
  Spinner,
  // Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import ClassStudentModal from "./ClassStudentModal";
import { ProgressContext } from "../Layout/ProgressContext";
import {
  getClassStudenList,
  importFileStudentList,
  updateClass,
} from "../../service/class";

// const initialStudents = [
//   {
//     MaSinhVien: "22112152138",
//     TenSinhVien: "Nguyễn Văn Quang",
//     LopSinhHoat : "48K21.2",
//     TenDangNhap: "221121521238",
//   },
// ];

const ClassDetail = () => {
  const { maLopHocPhan } = useParams();
  const [nameClass, setNameClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { setShowProgress } = useContext(ProgressContext);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getClassStudenList(maLopHocPhan);
        if (!data) throw new Error("Error fetching classes");
        setNameClass(data.ten_lop_hoc_phan);
        setStudents(data.sinh_vien);
      } catch (error) {
        toast({
          title: "Lỗi khi lấy danh sách sinh viên lớp học phần",
          description:
            "Không thể lấy dữ liệu sinh viên lớp học phần. Vui lòng thử lại!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setStudents([]);
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [maLopHocPhan, toast]);

  const [student, setStudent] = useState({
    TenSinhVien: "",
    LopSinhHoat: "",
    TenDangNhap: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  const openAddModal = () => {
    setStudent({ TenSinhVien: "", LopSinhHoat: "", TenDangNhap: "" });
    setIsEdit(false);
    onOpen();
  };

  const handleSubmit = () => {
    if (isEdit) {
      // Đã xoá editIndex, nếu cần sửa student hãy cập nhật lại logic phù hợp
    } else {
      setStudents((prev) => [
        ...prev,
        {
          ...student,
          stt: prev.length + 1,
        },
      ]);
    }
    onClose();
  };

  const [loadingAddStudent, setLoadingAddStudent] = useState(false);

  const handleAddStudent = async (maSinhVien) => {
    setLoadingAddStudent(true);
    try {
      const body = {
        ma_sinh_vien_them: [maSinhVien],
      };
      const res = await updateClass(body, maLopHocPhan);
      if (!res) throw new Error("Không thêm được sinh viên");
      // Sau khi thêm thành công, reload lại danh sách sinh viên
      const data = await getClassStudenList(maLopHocPhan);
      setStudents(data.sinh_vien);
      onClose();
      toast({
        title: "Thêm sinh viên thành công",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Thêm sinh viên thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log("Lỗi khi thêm sinh viên: ", error);
    } finally {
      setLoadingAddStudent(false);
    }
  };

  const handleDeleteStudent = async (maSinhVien) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa sinh viên ${maSinhVien} này không?`
    );
    if (confirmDelete) {
      try {
        const body = {
          ma_sinh_vien_xoa: [maSinhVien],
        };
        const res = await updateClass(body, maLopHocPhan);
        if (!res) throw new Error("Không xóa được sinh viên");
        // Sau khi xóa thành công, reload lại danh sách sinh viên
        const data = await getClassStudenList(maLopHocPhan);
        setStudents(data.sinh_vien);
        toast({
          title: "Xóa sinh viên thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Xóa sinh viên thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log("Lỗi khi xoá sinh viên: ", error);
      }
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      onClose();
      setShowProgress(true);
      localStorage.setItem("showProgress", "true");
      const res = await importFileStudentList(maLopHocPhan, fileData);
      if (!res) {
        throw new Error("Failed to import studentsList");
      }
      setShowProgress(false);
      localStorage.setItem("showProgress", "false");
      if (!res) throw new Error("Không xóa được sinh viên");
      // Sau khi thêm thành công, reload lại danh sách sinh viên
      const data = await getClassStudenList(maLopHocPhan);
      setStudents(data.sinh_vien);
      toast({
        title: "Cập nhật tài liệu chương thành công",
        description: "Đã cập nhật tài liệu chương thành công.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setShowProgress(false);
      localStorage.setItem("showProgress", "false");
      toast({
        title: "Cập nhật tài liệu thất bại",
        description: "Có lỗi xảy ra khi cập nhật tài liệu chương.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      pt={8}
      bg="background"
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
            fontSize="xl"
            mb={2}
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Lớp học phần {nameClass}
          </Heading>
        </Center>
        <Flex gap={2}>
          <IconButton
            icon={<FaPlus />}
            onClick={openAddModal}
            colorScheme="brand"
            borderRadius="full"
            aria-label="Thêm sinh viên"
            boxShadow="md"
            size="md"
            fontWeight="bold"
            variant="ghost"
            _active={{
              transform: "scale(0.95)",
              bgColor: "brand.100",
            }}
          />
          <Input
            type="file"
            id="import-students"
            display="none"
            onChange={handleImport}
            accept=".xlsx, .xls"
            size="md"
            fontWeight="bold"
            cursor="pointer"
            variant="ghost"
            _active={{
              transform: "scale(0.95)",
              bgColor: "green.100",
            }}
          />
          <label htmlFor="import-students">
            <IconButton
              as="span"
              icon={<FaUpload />}
              colorScheme="green"
              borderRadius="full"
              aria-label="Nhập từ file"
              boxShadow="md"
              size="md"
              fontWeight="bold"
              cursor="pointer"
              variant="ghost"
            />
          </label>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
        py={6}
      >
        <Table variant="simple" size="md" borderRadius="md">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Mã sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Tên sinh viên
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Lớp sinh hoạt
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Tên đăng nhập
              </Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student, index) => (
              <Tr key={student.MaSinhVien} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{index + 1}</Td>
                <Td color="textPrimary">{student.MaSinhVien}</Td>
                <Td color="textPrimary">{student.TenSinhVien}</Td>
                <Td color="textPrimary">{student.LopSinhHoat}</Td>
                <Td color="textPrimary">{student.TenDangNhap}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="full"
                    colorScheme="red"
                    bg="#FDE8E6"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteStudent(student.MaSinhVien)}
                    boxShadow="sm"
                    aria-label="Xóa sinh viên"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <ClassStudentModal
        isOpen={isOpen}
        onClose={onClose}
        isEdit={isEdit}
        student={student}
        setStudent={setStudent}
        onSubmit={handleSubmit}
        onAddStudent={handleAddStudent}
        loading={loadingAddStudent}
      />
    </Flex>
  );
};

export default ClassDetail;
