import {
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="#4A90E2" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      pt={8}
      bg="#F2F4F8"
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
            fontSize="20px"
            mb={2}
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Lớp học phần {nameClass}
          </Heading>
        </Center>
        <Flex gap={2} mr={3}>
          <IconButton
            icon={<FaPlus />}
            onClick={openAddModal}
            bg="#4A90E2"
            color="#fff"
            borderRadius="999px"
            boxShadow="0 2px 8px rgba(74,144,226,0.08)"
            _hover={{ bg: "#357ABD" }}
          />
          <Button
            as="label"
            bg="#4A90E2"
            color="#fff"
            leftIcon={<FaUpload />}
            borderRadius="999px"
            boxShadow="0 2px 8px rgba(74,144,226,0.08)"
            _hover={{ bg: "#357ABD" }}
          >
            Tải lên danh sách
            <Input
              type="file"
              accept=".csv,.xlsx"
              display="none"
              onChange={(e) => handleImport(e)}
            />
          </Button>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
        py={6}
      >
        <Table
          variant="simple"
          size="md"
          bg="transparent"
          borderRadius="12px"
          overflow="hidden"
        >
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
                Lớp
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Tên đăng nhập
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((sinhVien, index) => (
              <Tr
                key={sinhVien.MaSinhVien}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{index + 1}</Td>
                <Td color="#1C1C1C">{sinhVien.MaSinhVien}</Td>
                <Td fontWeight="bold" color="#1C1C1C">
                  {sinhVien.TenSinhVien}
                </Td>
                <Td color="#1C1C1C">{sinhVien.LopSinhHoat}</Td>
                <Td color="#1C1C1C">{sinhVien.TenDangNhap}</Td>
                <Td>
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteStudent(sinhVien.MaSinhVien)}
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
