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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getExamsStudentDetail,
  joinExam,
  joinPracticeExam,
} from "../../service/examStudent";

const ExamStartModal = ({ isOpen, onClose, maCuocThi, mode = "exam" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [examDetail, setExamDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (mode === "practice") {
      setLoading(true);
      try {
        const res = await joinPracticeExam(maCuocThi);
        if (res) {
          onClose();
          navigate(`${location.pathname}/practice/${maCuocThi}`);
        } else {
          setError("Không thể vào chế độ luyện thi");
        }
      } catch (error) {
        setError("Không thể vào chế độ luyện thi");
        console.log("Lỗi :", error);
      } finally {
        setLoading(false);
      }
      return;
    }
    if (!password) {
      setError("Yêu cầu nhập mật khẩu");
      return;
    }
    setError("");
    await onStartExam(password);
  };

  const onStartExam = async (password) => {
    try {
      setLoading(true);
      const res = await joinExam(maCuocThi, { mat_khau: password });
      if (res) {
        onClose();
        navigate(`${location.pathname}/taking/${maCuocThi}`);
      } else {
        setError("Mật khẩu không hợp lệ");
      }
    } catch (error) {
      setError("Mật khẩu không hợp lệ");
      console.log("Lỗi :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && maCuocThi) {
      setLoading(true);
      getExamsStudentDetail(maCuocThi)
        .then((data) => setExamDetail(data))
        .catch(() => setExamDetail(null))
        .finally(() => setLoading(false));
    }
  }, [isOpen, maCuocThi]);

  if (!examDetail) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        fontFamily="Inter, sans-serif"
        p={6}
        maxW="480px"
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
          pb={4}
        >
          Thông tin cuộc thi
        </ModalHeader>
        <ModalCloseButton
          top={3}
          right={3}
          borderRadius="full"
          bg="background"
          _hover={{ bg: "gray.100" }}
        />
        <ModalBody px={0} py={4}>
          {loading ? (
            <Box textAlign="center" py={8} color="textSecondary">
              Đang tải...
            </Box>
          ) : (
            <Box px={{ base: 0, md: 2 }}>
              <Flex gap={4} mb={4} wrap="wrap">
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Tên cuộc thi
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.ten_cuoc_thi}
                  </Box>
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Môn học
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.ten_hoc_phan}
                  </Box>
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Lớp học phần
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.ten_lop_hoc_phan}
                  </Box>
                </Flex>
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Thời gian bắt đầu
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.thoi_gian_bat_dau}
                  </Box>
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Thời gian kết thúc
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.thoi_gian_ket_thuc}
                  </Box>
                  <Text
                    fontWeight="semibold"
                    color="text.secondary"
                    fontSize="sm"
                  >
                    Trạng thái
                  </Text>
                  <Box
                    bg="background"
                    borderRadius="md"
                    px={3}
                    py={2}
                    color="text.primary"
                    fontWeight="medium"
                    boxShadow="sm"
                  >
                    {examDetail.trang_thai}
                  </Box>
                  {mode !== "practice" && (
                    <>
                      <Text
                        fontWeight="semibold"
                        color="text.secondary"
                        fontSize="sm"
                      >
                        Mật khẩu
                      </Text>
                      <FormControl isInvalid={!!error}>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          borderRadius="md"
                          borderColor="border"
                          bg="background"
                          color="text.primary"
                          _focus={{
                            borderColor: "brand.500",
                            boxShadow: "0 0 0 1px #4A90E2",
                          }}
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                      </FormControl>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex justify="flex-end" mt={6}>
                <Button
                  colorScheme="brand"
                  onClick={handleStart}
                  isLoading={loading}
                  borderRadius="md"
                  px={8}
                  py={2}
                  fontWeight="semibold"
                  fontSize="md"
                  boxShadow="md"
                >
                  {mode === "practice" ? "Bắt đầu luyện thi" : "Vào thi"}
                </Button>
              </Flex>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExamStartModal;
