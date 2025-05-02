import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const ClassStudentModal = ({
  isOpen,
  onClose,
  isEdit,
  student,
  setStudent,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? "Chỉnh sửa sinh viên" : "Thêm sinh viên"}{" "}
          {student.MaSinhVien}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Tên sinh viên</FormLabel>
            <Input
              value={student.TenSinhVien}
              onChange={(e) =>
                setStudent({ ...student, TenSinhVien: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Lớp</FormLabel>
            <Input
              value={student.LopSinhHoat}
              onChange={(e) =>
                setStudent({ ...student, LopSinhHoat: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tên đăng nhập</FormLabel>
            <Input
              value={student.TenDangNhap}
              onChange={(e) =>
                setStudent({ ...student, TenDangNhap: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            {isEdit ? "Lưu" : "Thêm"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClassStudentModal;
