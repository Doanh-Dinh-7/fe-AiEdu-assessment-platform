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
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ProgressContext } from "../Layout/ProgressContext";

const AddDocumentModal = ({
  isOpen,
  onClose,
  maHocPhan,
  maChuong,
  updateChapter,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const toast = useToast();
  const { setShowProgress } = useContext(ProgressContext);

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

  const handleAddFilesChapter = async () => {
    const filesData = new FormData();
    console.log("file", selectedFiles);

    selectedFiles.forEach((file) => {
      filesData.append("files", file);
    });
    try {
      onClose();
      setShowProgress(true);
      localStorage.setItem("showProgress", "true");
      const data = await updateChapter(maHocPhan, maChuong, filesData);
      if (!data) {
        throw new Error("Failed to update chapter");
      }
      setSelectedFiles([]);
      setShowProgress(false);
      localStorage.setItem("showProgress", "false");
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm tài liệu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="file"
            accept=".doc, .docx, .pdf"
            multiple
            onChange={handleFileChange}
            mb={4}
          />

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
            onClick={handleAddFilesChapter}
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

AddDocumentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  maHocPhan: PropTypes.string.isRequired,
  maChuong: PropTypes.string.isRequired,
  updateChapter: PropTypes.func.isRequired,
};

export default AddDocumentModal;
