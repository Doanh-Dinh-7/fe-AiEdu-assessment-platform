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
import { useState } from "react";

const ClassStudentModal = ({ isOpen, onClose, onAddStudent, loading }) => {
  const [maSinhVien, setMaSinhVien] = useState("");

  const handleSubmit = () => {
    if (!maSinhVien.trim()) return;
    onAddStudent(maSinhVien.trim());
    setMaSinhVien("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm sinh viên</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Mã sinh viên</FormLabel>
            <Input
              value={maSinhVien}
              onChange={(e) => setMaSinhVien(e.target.value)}
              placeholder="Nhập mã sinh viên"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Thêm
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
