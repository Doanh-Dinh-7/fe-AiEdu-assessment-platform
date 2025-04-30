import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Box,
  Text,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const AddDocumentModal = ({ isOpen, onClose, docs, setDocs }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const toast = useToast();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    // Loại bỏ file trùng tên
    const uniqueFiles = newFiles.filter(
      (file) => !selectedFiles.some((f) => f.name === file.name)
    );
    setSelectedFiles([...selectedFiles, ...uniqueFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
  };

  const handleAddDocuments = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Vui lòng chọn ít nhất một tài liệu.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newDocs = selectedFiles.map((file, index) => ({
      stt: docs.length + index + 1,
      name: file.name,
      date: new Date().toLocaleDateString("vi-VN"),
    }));

    setDocs([...docs, ...newDocs]);
    setSelectedFiles([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm tài liệu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input type="file" multiple onChange={handleFileChange} mb={4} />

          {selectedFiles.length > 0 ? (
            <Box borderWidth="1px" borderRadius="md" p={3}>
              {selectedFiles.map((file) => (
                <Flex key={file.name} justify="space-between" mb={2}>
                  <Box>
                    <Text fontWeight="medium">{file.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {(file.size / 1024).toFixed(2)} KB
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Xóa file"
                    icon={<FaTrash />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleRemoveFile(file.name)}
                  />
                </Flex>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color="gray.500">
              Chưa có tài liệu nào được chọn.
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddDocuments}
            isDisabled={selectedFiles.length === 0}
          >
            Xác nhận
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDocumentModal;
