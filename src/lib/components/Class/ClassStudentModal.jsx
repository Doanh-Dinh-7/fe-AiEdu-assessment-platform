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
import PropTypes from "prop-types";

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
        borderRadius="md"
        boxShadow="md"
        fontFamily="Inter, sans-serif"
        maxW="400px"
        p={6}
      >
        <ModalHeader
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          color="brand.500"
          fontSize="xl"
          borderBottom="1px solid"
          borderColor="border"
          borderTopRadius="md"
          pb={3}
        >
          Thêm sinh viên
        </ModalHeader>
        <ModalCloseButton
          top={4}
          right={4}
          borderRadius="full"
          bg="background"
          _hover={{ bg: "gray.100" }}
        />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel
              color="text.secondary"
              fontWeight="semibold"
              fontSize="sm"
            >
              Mã sinh viên
            </FormLabel>
            <Input
              value={maSinhVien}
              onChange={(e) => setMaSinhVien(e.target.value)}
              placeholder="Nhập mã sinh viên"
              borderRadius="md"
              bg="background"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="text.primary"
              _placeholder={{ color: "text.secondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px #4A90E2",
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
            borderRadius="md"
            fontWeight="semibold"
            fontSize="md"
            boxShadow="md"
          >
            Thêm
          </Button>
          <Button variant="ghost" onClick={onClose} borderRadius="md">
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClassStudentModal;

ClassStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddStudent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
