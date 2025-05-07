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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="surface"
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        fontFamily="Inter, sans-serif"
        maxW="400px"
      >
        <ModalHeader
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          color="primary"
          fontSize="20px"
          borderBottom="1px solid"
          borderColor="border"
          borderTopRadius="12px"
          pb={3}
        >
          Thêm sinh viên
        </ModalHeader>
        <ModalCloseButton
          top={3}
          right={3}
          borderRadius="full"
          bg="gray.100"
          _hover={{ bg: "gray.200" }}
        />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel color="textSecondary" fontWeight="bold">
              Mã sinh viên
            </FormLabel>
            <Input
              value={maSinhVien}
              onChange={(e) => setMaSinhVien(e.target.value)}
              placeholder="Nhập mã sinh viên"
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
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="primary"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
            borderRadius="12px"
            fontWeight="bold"
            fontSize="16px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          >
            Thêm
          </Button>
          <Button variant="ghost" onClick={onClose} borderRadius="12px">
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClassStudentModal;
