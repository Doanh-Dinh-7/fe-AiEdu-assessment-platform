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
          {isEdit ? "Chỉnh sửa sinh viên" : "Thêm sinh viên"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Mã sinh viên</FormLabel>
            <Input
              value={student.mssv}
              onChange={(e) => setStudent({ ...student, mssv: e.target.value })}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Tên sinh viên</FormLabel>
            <Input
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Lớp</FormLabel>
            <Input
              value={student.class}
              onChange={(e) =>
                setStudent({ ...student, class: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tên đăng nhập</FormLabel>
            <Input
              value={student.username}
              onChange={(e) =>
                setStudent({ ...student, username: e.target.value })
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
