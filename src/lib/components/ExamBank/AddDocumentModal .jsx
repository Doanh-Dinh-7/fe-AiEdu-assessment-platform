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
  FormControl,
  FormLabel,
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
          Thêm tài liệu
        </ModalHeader>
        <ModalCloseButton
          top={4}
          right={4}
          borderRadius="full"
          bg="gray.100"
          _hover={{ bg: "gray.200" }}
        />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel
              color="textSecondary"
              fontWeight="semibold"
              fontSize="sm"
            >
              Chọn tài liệu (.doc, .docx, .pdf)
            </FormLabel>
            <Input
              type="file"
              accept=".doc, .docx, .pdf"
              multiple
              onChange={handleFileChange}
              mb={2}
              pt={1}
              _active={{ borderColor: "transparent" }}
              _focus={{ borderColor: "transparent" }}
              sx={{
                "::file-selector-button": {
                  height: "2.5rem",
                  mr: 4,
                  py: 2,
                  px: 4,
                  borderRadius: "md",
                  border: "1px solid",
                  borderColor: "border",
                  bg: "background",
                  fontWeight: "semibold",
                  color: "textPrimary",
                  boxShadow: "sm",
                  _hover: { bg: "gray.100" },
                },
              }}
            />
          </FormControl>

          {selectedFiles.length > 0 ? (
            <Box
              borderWidth="1px"
              borderRadius="md"
              p={3}
              borderColor="border"
              bg="background"
            >
              {selectedFiles.map((file) => (
                <Flex
                  key={file.name}
                  justify="space-between"
                  align="center"
                  mb={2}
                  p={2}
                  bg="surface"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <Box>
                    <Text fontWeight="medium" fontSize="sm" color="textPrimary">
                      {file.name}
                    </Text>
                    <Text fontSize="xs" color="textSecondary">
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
                    borderRadius="full"
                  />
                </Flex>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color="textSecondary">
              Chưa có tài liệu nào được chọn.
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={handleAddFilesChapter}
            isDisabled={selectedFiles.length === 0}
            borderRadius="md"
            fontWeight="semibold"
            fontSize="md"
            boxShadow="md"
          >
            Xác nhận
          </Button>
          <Button variant="ghost" onClick={onClose} borderRadius="md">
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
