import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamStartModal = ({ isOpen, onClose, examData, mode = "exam" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (mode === "practice") {
      onClose();
      navigate(`${location.pathname}/practice`);
      return;
    }
    if (!password) {
      setError("Yêu cầu nhập mật khẩu");
      return;
    }
    setError("");
    onStart(password);
  };

  const onStart = (password) => {
    // navigate sang giao diện thi
    onClose();
    navigate(`${location.pathname}/taking`);
  };

  if (!examData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
        >
          Thông tin cuộc thi
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <Flex gap={6} mb={4} wrap="wrap">
              <Flex direction="column" gap={2} flex={1} minW="200px">
                <Text fontWeight="bold">Tên cuộc thi</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.name}
                </Box>
                <Text fontWeight="bold">Môn học</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.subject}
                </Box>
                <Text fontWeight="bold">Các chương</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.chapters}
                </Box>
                {mode !== "practice" && (
                  <>
                    <Text fontWeight="bold">Mật khẩu</Text>
                    <FormControl isInvalid={!!error}>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                  </>
                )}
              </Flex>
              <Flex direction="column" gap={2} flex={1} minW="200px">
                <Text fontWeight="bold">Số lượng câu hỏi</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.totalQuestions}
                </Box>
                <Text fontWeight="bold">Thời gian làm bài</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.duration}
                </Box>
                <Text fontWeight="bold">Lớp học phần</Text>
                <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                  {examData.class}
                </Box>
              </Flex>
            </Flex>
            <Flex justify="center" mt={4}>
              <Button
                colorScheme="blue"
                onClick={handleStart}
                px={10}
                fontWeight="bold"
              >
                {mode === "practice" ? "Luyện thi" : "Thi"}
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExamStartModal;
