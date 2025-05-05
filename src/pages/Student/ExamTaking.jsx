import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTaking from "../../lib/components/Exam/ExamTaking/SidebarTaking";
import ConfirmModal from "../../lib/components/Exam/ExamTaking/ConfirmModal";
import FinishModal from "../../lib/components/Exam/ExamTaking/FinishModal";
import ResultTable from "../../lib/components/Exam/ExamTaking/ResultTable";
import ChatArea from "../../lib/components/Exam/ExamTaking/ChatArea";
import {
  getExamTakingDetail,
  checkAnswerExamTaking,
  finishedExamTaking,
} from "../../lib/controller/examTaking";

// const mockQuestions = [
//   {
//     id: 1,
//     text: "Tại sao người như tôi lại không có người yêu, tôi tệ như vậy sao =))))",
//   },
//   { id: 2, text: "Câu hỏi 2" },
//   { id: 3, text: "Câu hỏi 3" },
// ];

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const ExamTaking = () => {
  const { maCuocThi } = useParams();
  const navigate = useNavigate();
  const storageKey = `exam-taking-${maCuocThi}`;
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([[]]);
  const [answered, setAnswered] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loadingExam, setLoadingExam] = useState(false);
  // State cho câu hỏi bổ sung
  const [isSupplement, setIsSupplement] = useState(false);
  const [currentSupplement, setCurrentSupplement] = useState(null); // { MaCauBoSung, NoiDung, ... }
  const [lastCheckResult, setLastCheckResult] = useState(null); // Lưu kết quả chấm điểm gần nhất
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Khôi phục state từ localStorage nếu có
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setQuestions(data.questions || []);
        setMessages(data.messages || [[]]);
        setAnswered(data.answered || []);
        setCurrent(data.current || 0);
        setInput(data.input || "");
        setTimeLeft(data.timeLeft || 0);
        setStarted(data.started || false);
        setFinished(data.finished || false);
        setIsSupplement(data.isSupplement || false);
        setCurrentSupplement(data.currentSupplement || null);
        setLastCheckResult(data.lastCheckResult || null);
      } catch {
        // Nếu lỗi thì bỏ qua, không khôi phục
      }
    }
    // eslint-disable-next-line
  }, [maCuocThi]);

  // Lưu state vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (!started) return;
    const data = {
      questions,
      messages,
      answered,
      current,
      input,
      timeLeft,
      started,
      finished,
      isSupplement,
      currentSupplement,
      lastCheckResult,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [
    storageKey,
    questions,
    messages,
    answered,
    current,
    input,
    timeLeft,
    started,
    finished,
    isSupplement,
    currentSupplement,
    lastCheckResult,
  ]);

  // useEffect(() => {
  //   setMessages(
  //     mockQuestions.map((q) => [
  //       {
  //         sender: "bot",
  //         text: q.text,
  //         time: formatTime(0),
  //       },
  //     ])
  //   );
  //   setAnswered(Array(mockQuestions.length).fill(false));
  // }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, finished]);

  const handleStartExam = async () => {
    setLoadingExam(true);
    try {
      const data = await getExamTakingDetail(maCuocThi);
      if (data && data.NoiDungBoDeThi) {
        const qs = data.NoiDungBoDeThi.map((item) => ({
          id: item.cau_hoi.MaCauHoi,
          text: item.cau_hoi.NoiDung,
          mucDo: item.cau_hoi.MucDo,
          diem: item.cau_hoi.Diem,
          dapAn: item.dap_an,
          chiTietDapAn: item.chi_tiet_dap_an,
          cauHoiBoSung: item.cau_hoi_bo_sung,
        }));
        setQuestions(qs);
        setMessages(
          qs.map((q) => [
            {
              sender: "bot",
              text: q.text,
              time: formatTime(0),
            },
          ])
        );
        setAnswered(Array(qs.length).fill(false));
        setCurrent(0);
        setStarted(true);
        setTimeLeft(60 * 60); // hoặc lấy từ data nếu có
        setIsSupplement(false);
        setCurrentSupplement(null);
        setLastCheckResult(null);
      }
    } catch {
      alert("Không thể tải dữ liệu đề thi!");
    } finally {
      setLoadingExam(false);
    }
  };

  // Xử lý gửi câu trả lời (chính hoặc bổ sung)
  const handleConfirm = async () => {
    setLoadingCheck(true);
    try {
      const q = questions[current];
      let body;
      if (!isSupplement) {
        // Câu hỏi chính
        body = {
          MaCauHoi: q.id,
          MaCauBoSung: "",
          CauTraLoi: input,
        };
      } else {
        // Câu hỏi bổ sung
        body = {
          MaCauHoi: q.id,
          MaCauBoSung: currentSupplement?.MaCauBoSung,
          CauTraLoi: input,
        };
      }
      const res = await checkAnswerExamTaking(maCuocThi, body);
      setLastCheckResult(res);
      if (res.Condition === "true") {
        // Nếu là câu hỏi bổ sung, lưu lại tin nhắn user vào messages
        setMessages((prev) => {
          const updated = [...prev];
          if (isSupplement) {
            updated[current] = [
              ...updated[current],
              {
                sender: "user",
                text: input,
                time: formatTime(60 * 60 - timeLeft),
              },
            ];
          }
          return updated;
        });

        // Đúng hoặc đã đủ ý, chuyển sang câu tiếp theo
        setIsSupplement(false);
        setCurrentSupplement(null);
        setInput("");
        setShowConfirm(false);
        setAnswered((prev) => {
          const arr = [...prev];
          arr[current] = true;
          return arr;
        });
        setMessages((prev) => {
          const updated = [...prev];
          // Nếu là câu hỏi chính thì vẫn lưu như cũ
          if (!isSupplement) {
            updated[current] = [
              ...updated[current],
              {
                sender: "user",
                text: input,
                time: formatTime(60 * 60 - timeLeft),
              },
            ];
          }
          return updated;
        });
        // Nếu còn câu tiếp theo thì chuyển, nếu hết thì giữ nguyên
        if (questions[current + 1]) {
          setCurrent(current + 1);
        }
      } else {
        // Sai hoặc chưa đủ ý, hiển thị câu hỏi bổ sung tiếp theo
        if (res.CauHoiBoSungTiepTheo) {
          setIsSupplement(true);
          setCurrentSupplement(res.CauHoiBoSungTiepTheo);
          setInput("");
          setShowConfirm(false);
          // Lưu lại tin nhắn vừa gửi
          setMessages((prev) => {
            const updated = [...prev];
            updated[current] = [
              ...updated[current],
              {
                sender: "user",
                text: input,
                time: formatTime(60 * 60 - timeLeft),
              },
            ];
            // Thêm tin nhắn bot cho câu hỏi bổ sung
            updated[current].push({
              sender: "bot",
              text: res.CauHoiBoSungTiepTheo.NoiDung,
              time: formatTime(60 * 60 - timeLeft),
            });
            return updated;
          });
        } else {
          // Không còn câu hỏi bổ sung, cho phép chuyển tiếp
          setIsSupplement(false);
          setCurrentSupplement(null);
          setInput("");
          setShowConfirm(false);
          setAnswered((prev) => {
            const arr = [...prev];
            arr[current] = true;
            return arr;
          });
          if (questions[current + 1]) {
            setCurrent(current + 1);
          }
        }
      }
    } catch {
      alert("Có lỗi khi gửi câu trả lời!");
    } finally {
      setLoadingCheck(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setShowConfirm(true);
  };

  const handleFinish = () => setShowFinish(true);
  const handleFinishConfirm = async () => {
    try {
      const res = await finishedExamTaking(maCuocThi);
      setResultData(res); // res là object trả về từ API
      setFinished(true);
    } catch {
      alert("Có lỗi khi hoàn thành bài thi!");
    }
  };

  const handleOutExam = () => {
    localStorage.removeItem(storageKey);
    navigate("/exams");
  };

  if (finished) {
    return (
      <Flex bg="#F5F9FF" align="center" justify="center" pt={8}>
        <SidebarTaking
          questions={questions}
          current={current}
          answered={answered}
          timeLeft={timeLeft}
          onSelect={setCurrent}
        />
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {finished && resultData ? (
            <ResultTable examHistory={resultData.ExamHistory} />
          ) : (
            <ResultTable
              questions={questions.map((q, idx) => ({
                ...q,
                answer: messages[idx]?.[0]?.text || "",
                score: "",
              }))}
            />
          )}
        </Box>
        <Button
          colorScheme="blackAlpha"
          borderRadius="md"
          px={10}
          fontWeight="bold"
          position="absolute"
          bottom={8}
          right={8}
          onClick={handleOutExam}
        >
          Thoát
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="#F5F9FF" align="center">
      <SidebarTaking
        questions={questions}
        current={current}
        answered={answered}
        timeLeft={timeLeft}
        onSelect={setCurrent}
      />
      <Box flex={1} px={8}>
        {!started ? (
          <Flex justify="center" align="center" h="60vh">
            <Button
              colorScheme="blue"
              size="xl"
              fontWeight="bold"
              fontSize="xl"
              p={8}
              onClick={handleStartExam}
              isLoading={loadingExam}
            >
              BẮT ĐẦU
            </Button>
          </Flex>
        ) : questions.length === 0 ? (
          <Box textAlign="center" w="100%" mt={10} fontSize="xl">
            Đang tải dữ liệu đề thi...
          </Box>
        ) : (
          <>
            <ChatArea
              messages={messages[current] || []}
              onSend={handleSend}
              input={input}
              setInput={setInput}
              disabled={finished || loadingCheck}
              placeholder={
                isSupplement && currentSupplement
                  ? currentSupplement.NoiDung
                  : questions[current]?.text
              }
            />
            {/* Hiển thị kết quả chấm điểm từng ý chính nếu có */}
            {lastCheckResult && lastCheckResult.ChiTietKetQua && (
              <Box mt={4} bg="white" borderRadius="md" p={4} boxShadow="sm">
                <Text fontWeight="bold" mb={2} color="blue.600">
                  Kết quả chấm ý chính:
                </Text>
                <Table size="sm">
                  <Tbody>
                    <Tr>
                      <Th>Ý chính</Th>
                      <Th>Điểm số</Th>
                      <Th>Điểm tối đa</Th>
                      <Th>Độ chính xác</Th>
                      <Th>Đáp án</Th>
                    </Tr>
                    {lastCheckResult.ChiTietKetQua.map((item, idx) => (
                      <Tr key={idx}>
                        <Td>{item.YChinh}</Td>
                        <Td>{item.DiemSo}</Td>
                        <Td>{item.DiemToiDa}</Td>
                        <Td>{item.DoChinhXac}</Td>
                        <Td>{item.NoiDungDapAn}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Text mt={2} fontWeight="bold">
                  Tổng điểm: {lastCheckResult.TongDiem} /{" "}
                  {lastCheckResult.TongDiemToiDa} (Tỷ lệ:{" "}
                  {lastCheckResult.TyLeDiem})
                </Text>
              </Box>
            )}
            <Flex justify="center" mt={6}>
              {answered.every(Boolean) ? (
                <Box textAlign="center" w="100%">
                  <Text
                    bg="white"
                    px={6}
                    py={2}
                    borderRadius="md"
                    fontWeight="bold"
                    mb={4}
                  >
                    Vui lòng kiểm tra câu trả lời và xác nhận hoàn thành bài thi
                  </Text>
                  <Button bg="green.300" size="lg" onClick={handleFinish}>
                    Xác nhận hoàn thành bài thi
                  </Button>
                </Box>
              ) : (
                <Button colorScheme="blue" size="lg" onClick={handleFinish}>
                  Xác nhận hoàn thành bài thi
                </Button>
              )}
            </Flex>
          </>
        )}
      </Box>
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        isLoading={loadingCheck}
      />
      <FinishModal isOpen={showFinish} onConfirm={handleFinishConfirm} />
    </Flex>
  );
};

export default ExamTaking;
