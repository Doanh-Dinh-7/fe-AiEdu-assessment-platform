import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  Center,
  Spinner,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  useToast,
  Thead,
  Th,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTaking from "../../lib/components/Exam/ExamTaking/SidebarTaking";
import FinishModal from "../../lib/components/Exam/ExamTaking/FinishModal";
import {
  getExamTakingDetail,
  finishedExamEssay,
} from "../../lib/service/examTaking"; // Cần tạo API finishedExamTakingEssay

// Hàm formatTime không được sử dụng trong giao diện hiện tại của ExamEssay
// function formatTime(sec) {
//   const m = String(Math.floor(sec / 60)).padStart(2, "0");
//   const s = String(sec % 60).padStart(2, "0");
//   return `${m}:${s}`;
// }

const ExamEssay = () => {
  const { maCuocThi } = useParams();
  const navigate = useNavigate();
  const storageKey = `exam-essay-${maCuocThi}`;
  const [examName, setExamName] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [loadingExam, setLoadingExam] = useState(false);
  const [resultData, setResultData] = useState(null);
  const toast = useToast();

  // Fetch dữ liệu bài thi ban đầu
  const handleStartExam = useCallback(async () => {
    setLoadingExam(true);
    try {
      const data = await getExamTakingDetail(maCuocThi);
      if (data && data.NoiDungBoDeThi) {
        setExamName(data.TenCuocThi);
        const qs = data.NoiDungBoDeThi.map((item) => ({
          id: item.cau_hoi.MaCauHoi,
          text: item.cau_hoi.NoiDung,
          mucDo: item.cau_hoi.MucDo,
          diem: item.cau_hoi.Diem,
        }));
        setQuestions(qs);
        const initialAnswers = {};
        qs.forEach((q) => {
          initialAnswers[q.id] = "";
        });
        setAnswers(initialAnswers);
        setStarted(true);
        setTimeLeft(60 * 60); // Mặc định thời gian làm bài là 60 phút (đổi sang giây)
        localStorage.removeItem(storageKey);
      } else {
        toast({
          title: "Lỗi",
          description: "Không tải được dữ liệu đề thi.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/exams");
      }
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu đề thi tự luận!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/exams");
    } finally {
      setLoadingExam(false);
    }
  }, [maCuocThi, navigate, storageKey, toast]);

  // Khôi phục state từ localStorage nếu có
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.questions && data.started && !data.finished) {
          setQuestions(data.questions);
          setAnswers(data.answers || {});
          setTimeLeft(data.timeLeft || 0);
          setStarted(data.started);
          setFinished(data.finished);
          setLoadingExam(false);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    } else {
      // Không có dữ liệu lưu
      // Không gọi handleStartExam ở đây
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maCuocThi]);

  // Lưu state vào localStorage mỗi khi answers hoặc timeLeft thay đổi
  useEffect(() => {
    if (started && !finished && questions.length > 0) {
      const dataToSave = {
        questions,
        answers,
        timeLeft,
        started,
        finished,
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
  }, [storageKey, answers, timeLeft, started, finished, questions]);

  // Xử lý thay đổi đáp án của câu hỏi tự luận
  const handleAnswerChange = useCallback(
    (questionId, value) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: value,
      }));
    },
    [setAnswers]
  );

  const handleFinishConfirm = useCallback(
    async (isTimeout = false) => {
      setLoadingExam(true);
      try {
        const answersData = questions.map((q) => ({
          MaCauHoi: q.id,
          CauTraLoi: answers[q.id] || "",
        }));

        const res = await finishedExamEssay(maCuocThi, answersData); // Sử dụng API chung hoặc API riêng cho tự luận
        console.log("Exam finished response:", res);

        setResultData(res);
        setFinished(true);
        setStarted(false);
        localStorage.removeItem(storageKey);
        toast({
          title: isTimeout ? "Hết giờ!" : "Nộp bài thành công",
          description: isTimeout
            ? "Bài thi đã được tự động nộp do hết giờ."
            : "Bạn đã nộp bài thành công.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error finishing essay exam:", error);
        toast({
          title: "Lỗi khi nộp bài",
          description: "Đã xảy ra lỗi khi nộp bài thi tự luận.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoadingExam(false);
        setShowFinish(false);
      }
    },
    [
      maCuocThi,
      questions,
      answers,
      setResultData,
      setFinished,
      setStarted,
      storageKey,
      toast,
      setShowFinish,
    ]
  );

  const handleFinish = useCallback(() => setShowFinish(true), [setShowFinish]);

  // Timer
  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      // Tự động nộp bài khi hết giờ
      handleFinishConfirm(true); // Truyền true để báo hiệu nộp bài do hết giờ
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, finished, handleFinishConfirm]); // Đã thêm handleFinishConfirm vào dependencies

  const handleOutExam = () => {
    localStorage.removeItem(storageKey);
    navigate("/exams");
  };

  // Kiểm tra nếu chưa bắt đầu và không loading, hiển thị nút BẮT ĐẦU
  if (!started && !loadingExam && !finished) {
    return (
      <Flex
        flex="1"
        p={{ base: 1, md: 3 }}
        justify="center"
        alignItems="center"
      >
        <Flex justify="center" align="center" h="100%" w="100%">
          <Button
            colorScheme="brand"
            size="xl"
            fontWeight="medium"
            fontSize="xl"
            p={8}
            onClick={handleStartExam}
            borderRadius="md"
          >
            BẮT ĐẦU
          </Button>
        </Flex>
      </Flex>
    );
  }

  // Hiển thị Spinner khi đang load dữ liệu bài thi
  if (loadingExam && !finished) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
      </Center>
    );
  }

  // Giao diện khi bài thi đã kết thúc và có kết quả
  if (finished) {
    return (
      <Flex
        bg="background"
        align="center"
        justify="center"
        pt={8}
        minH="100vh"
        fontFamily="Inter, sans-serif"
        direction="column"
      >
        <Heading mb={6}>Kết quả bài thi tự luận</Heading>
        {/* Hiển thị kết quả chi tiết nếu API trả về */}
        {resultData?.ExamHistory ? (
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg="surface"
            borderRadius="12px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
            mx={8}
            py={8}
            px={4}
            minH="500px"
            maxW="900px"
            w="100%"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4} color="brand.500">
              Điểm: {resultData.ExamHistory.TongDiemDatDuoc}
            </Text>
            <Text fontSize="md" mb={6} color="textPrimary">
              Trạng thái: {resultData.ExamHistory.TrangThai}
            </Text>

            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Câu hỏi</Th>
                  <Th>Đáp án đã nộp</Th>
                  <Th>Điểm đạt được</Th>
                  <Th>Điểm tối đa</Th>
                </Tr>
              </Thead>
              <Tbody>
                {resultData.ExamHistory.ChiTietKetQua?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.NoiDungCauHoi}</Td>
                    <Td>{item.CauTraLoiDaNop}</Td>
                    <Td>{item.DiemDatDuoc}</Td>
                    <Td>{item.DiemToiDa}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box>
            <Text>Không có dữ liệu kết quả chi tiết.</Text>
            {/* Tùy chọn: Hiển thị lại câu hỏi và đáp án đã nhập nếu không có kết quả từ API */}
          </Box>
        )}
        <Button
          colorScheme="blackAlpha"
          borderRadius="12px"
          px={10}
          fontWeight="bold"
          fontSize="16px"
          boxShadow="0 2px 6px rgba(0,0,0,0.08)"
          mt={8}
          w={{ base: "100%", md: "auto" }}
          alignSelf="center"
          onClick={handleOutExam}
        >
          Thoát
        </Button>
      </Flex>
    );
  }

  // Giao diện làm bài thi tự luận
  return (
    <Flex
      bg="background"
      direction={{ base: "column", md: "row" }}
      minH="100vh"
      gap={4}
      p="3"
      fontFamily="Inter, sans-serif"
    >
      {/* Sidebar cho bài tự luận */}
      <SidebarTaking
        questions={questions.map((q, idx) => ({
          id: q.id,
          answered: answers[q.id] !== "", // Đánh dấu đã trả lời nếu textarea không rỗng
          text: `${idx + 1}. ${q.text.substring(0, 30)}${
            q.text.length > 30 ? "..." : ""
          }`, // Hiển thị tóm tắt câu hỏi
        }))}
        current={-1} // Không có khái niệm câu hiện tại trong sidebar tự luận truyền thống
        answered={questions.map((q) => answers[q.id] !== "")} // Trạng thái trả lời dựa trên state answers
        timeLeft={timeLeft}
        onSelect={() => {}} // Không cho phép click chuyển câu từ sidebar
        examName={examName}
        onFinish={handleFinish}
        isConfirming={showFinish}
      />

      {/* Khu vực làm bài */}
      <Box
        flex="1"
        p={{ base: 1, md: 3 }}
        bg="surface"
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        overflowY="auto" // Cho phép scroll khi nội dung dài
      >
        <Heading fontSize="lg" mb={6} color="brand.500" textAlign="center">
          Làm bài thi tự luận
        </Heading>
        {questions.map((q, index) => (
          <Box
            key={q.id}
            mb={8}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor="border"
            bg="background"
          >
            <Text fontWeight="bold" mb={2} color="textPrimary" fontSize="md">
              Câu {index + 1}: {q.text}
            </Text>
            <Textarea
              placeholder="Nhập đáp án của bạn tại đây..."
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              size="sm"
              minH="100px" // Chiều cao tối thiểu cho textarea
              borderRadius="md"
              bg="surface"
              color="textPrimary"
              fontWeight="medium"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Modal xác nhận nộp bài */}
      <FinishModal
        isOpen={showFinish}
        onConfirm={handleFinishConfirm}
        onCancel={() => setShowFinish(false)}
        isLoading={loadingExam}
      />
    </Flex>
  );
};

export default ExamEssay;
