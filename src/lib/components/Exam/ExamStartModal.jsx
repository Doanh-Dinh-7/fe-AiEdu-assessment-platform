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
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        fontFamily="Inter, sans-serif"
        px={{ base: 2, md: 6 }}
        py={2}
        maxW="480px"
      >
        <ModalHeader
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          color="textPrimary"
          fontSize="20px"
          borderBottom="1px solid"
          borderColor="border"
          borderTopRadius="12px"
          pb={3}
        >
          Thông tin cuộc thi
        </ModalHeader>
        <ModalCloseButton
          top={3}
          right={3}
          borderRadius="full"
          bg="gray.100"
          _hover={{ bg: "gray.200" }}
        />
        <ModalBody px={0} py={4}>
          {loading ? (
            <Box textAlign="center" py={8} color="textSecondary">
              Đang tải...
            </Box>
          ) : (
            <Box px={{ base: 0, md: 2 }}>
              <Flex gap={6} mb={4} wrap="wrap">
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Tên cuộc thi
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.ten_cuoc_thi}
                  </Box>
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Môn học
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.ten_hoc_phan}
                  </Box>
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Lớp học phần
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.ten_lop_hoc_phan}
                  </Box>
                </Flex>
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Thời gian bắt đầu
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.thoi_gian_bat_dau}
                  </Box>
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Thời gian kết thúc
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.thoi_gian_ket_thuc}
                  </Box>
                  <Text fontWeight="bold" color="textSecondary" fontSize="15px">
                    Trạng thái
                  </Text>
                  <Box
                    bg="#F2F4F8"
                    borderRadius="12px"
                    px={3}
                    py={2}
                    color="textPrimary"
                    fontWeight="medium"
                    boxShadow="0 2px 6px rgba(0,0,0,0.04)"
                  >
                    {examDetail.trang_thai}
                  </Box>
                  {mode !== "practice" && (
                    <>
                      <Text
                        fontWeight="bold"
                        color="textSecondary"
                        fontSize="15px"
                      >
                        Mật khẩu
                      </Text>
                      <FormControl isInvalid={!!error}>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        {error && (
                          <FormErrorMessage color="error">
                            {error}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex justify="center" mt={4}>
                <Button
                  colorScheme={mode === "practice" ? "primary" : "success"}
                  onClick={handleStart}
                  isLoading={loading}
                  px={10}
                  fontWeight="bold"
                  borderRadius="12px"
                  fontSize="16px"
                  boxShadow="0 2px 6px rgba(0,0,0,0.08)"
                  _hover={{ filter: "brightness(0.95)" }}
                >
                  {mode === "practice" ? "Luyện thi" : "Thi"}
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
