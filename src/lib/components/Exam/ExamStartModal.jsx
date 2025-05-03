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
} from "../../controller/examStudent";

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
          {loading ? (
            <Box textAlign="center" py={8}>
              Đang tải...
            </Box>
          ) : (
            <Box p={4}>
              <Flex gap={6} mb={4} wrap="wrap">
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text fontWeight="bold">Tên cuộc thi</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.ten_cuoc_thi}
                  </Box>
                  <Text fontWeight="bold">Môn học</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.ten_hoc_phan}
                  </Box>
                  <Text fontWeight="bold">Lớp học phần</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.ten_lop_hoc_phan}
                  </Box>
                </Flex>
                <Flex direction="column" gap={2} flex={1} minW="200px">
                  <Text fontWeight="bold">Thời gian bắt đầu</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.thoi_gian_bat_dau}
                  </Box>
                  <Text fontWeight="bold">Thời gian kết thúc</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.thoi_gian_ket_thuc}
                  </Box>
                  <Text fontWeight="bold">Trạng thái</Text>
                  <Box bg="#e6eaf7" borderRadius="md" px={3} py={2}>
                    {examDetail.trang_thai}
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
                <Flex justify="center" mt={4}>
                  <Button
                    colorScheme="blue"
                    onClick={handleStart}
                    isLoading={loading}
                    px={10}
                    fontWeight="bold"
                  >
                    {mode === "practice" ? "Luyện thi" : "Thi"}
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExamStartModal;
