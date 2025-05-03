import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import ClassStudentModal from "./ClassStudentModal";
import { ProgressContext } from "../Layout/ProgressContext";
import {
  getClassStudenList,
  importFileStudentList,
  updateClass,
} from "../../controller/class";

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

  const [editIndex, setEditIndex] = useState(null);
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

  const openEditModal = (student, index) => {
    setStudent(student);
    setEditIndex(index);
    setIsEdit(true);
    onOpen();
  };

  const handleSubmit = () => {
    if (isEdit) {
      const updated = [...students];
      updated[editIndex] = { ...student, stt: editIndex + 1 };
      setStudents(updated);
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Center>
  ) : (
    <Box minH="100vh" bg="#F5F9FF" pt={5}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Flex w="100%" justify="space-between" align="center" mb={4} gap={4}>
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Lớp học phần {nameClass}
            </Heading>
          </Center>
          <IconButton
            icon={<FaPlus />}
            onClick={openAddModal}
            colorScheme="blue"
          />
          <Button as="label" colorScheme="blue" leftIcon={<FaUpload />}>
            Tải danh sách
            <Input
              type="file"
              accept=".csv,.xlsx"
              display="none"
              onChange={(e) => handleImport(e)}
            />
          </Button>
        </Flex>

        <Table variant="simple" size="md" w="100%" bg="white">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Mã sinh viên</Th>
              <Th>Tên sinh viên</Th>
              <Th>Lớp</Th>
              <Th>Tên đăng nhập</Th>
              {/* <Th></Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((sinhVien, index) => (
              <Tr key={sinhVien.MaSinhVien}>
                <Td>{index + 1}</Td>
                <Td>{sinhVien.MaSinhVien}</Td>
                <Td fontWeight="bold">{sinhVien.TenSinhVien}</Td>
                <Td>{sinhVien.LopSinhHoat}</Td>
                <Td>{sinhVien.TenDangNhap}</Td>
                {/* <Td>
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    colorScheme="yellow"
                    variant="ghost"
                    onClick={() => openEditModal(sinhVien, sinhVien.MaSinhVien)}
                  />
                </Td> */}
                <Td>
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteStudent(sinhVien.MaSinhVien)}
                  />
                </Td>
              </Tr>
            ))}
            {Array.from({ length: Math.max(0, 10 - students.length) }).map(
              (_, idx) => (
                <Tr key={"empty-" + idx}>
                  <Td>{students.length + idx + 1}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              )
            )}
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
    </Box>
  );
};

export default ClassDetail;
