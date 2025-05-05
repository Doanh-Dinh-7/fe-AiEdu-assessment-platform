import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
// import SidebarTaking from "../../lib/components/Exam/ExamTaking/SidebarTaking";
import ConfirmModal from "../../lib/components/Exam/ExamTaking/ConfirmModal";
import FinishModal from "../../lib/components/Exam/ExamTaking/FinishModal";
// import ResultTable from "../../lib/components/Exam/ExamTaking/ResultTable";
import ChatArea from "../../lib/components/Exam/ExamTaking/ChatArea";
import {
  getExamPracticeDetail,
  checkAnswerExamPractice,
  finishedExamPractice,
} from "../../lib/controller/examPratice";

// const mockQuestions = [
//   {
//     id: 1,
//     text: "Tại sao người như tôi lại không có người yêu, tôi tệ như vậy sao =))))",
//     hint: "Hãy tự tin vào bản thân, đôi khi chỉ cần chủ động hơn một chút!",
//   },
//   { id: 2, text: "Câu hỏi 2", hint: "Đọc kỹ đề, xác định từ khóa quan trọng." },
//   {
//     id: 3,
//     text: "Câu hỏi 3",
//     hint: "Áp dụng công thức đã học vào bài toán này.",
//   },
// ];

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const ExamPractice = () => {
  const { maCuocThi } = useParams();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([[]]);
  const [answered, setAnswered] = useState([false, false, false]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [showHint, setShowHint] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const storageKey = `exam-practice-${maCuocThi}`;
  const [maPhienLuyenThi, setMaPhienLuyenThi] = useState(
    localStorage.getItem("ma_phien_luyen_thi") || ""
  );
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState(
    JSON.parse(localStorage.getItem(storageKey) || "[]")
  );
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      const restoredMessages = questions.map((q, idx) => {
        const his = chatHistory[idx];
        if (!his) return [{ sender: "bot", text: q.text, time: formatTime(0) }];
        return [
          { sender: "bot", text: q.text, time: formatTime(0) },
          his.userMsg,
          his.botMsg,
        ];
      });
      setMessages(restoredMessages);
      setAnswered(chatHistory.map(() => true));
    } else {
      setMessages(
        questions.map((q) => [
          {
            sender: "bot",
            text: q.text,
            time: formatTime(0),
          },
        ])
      );
      setAnswered(Array(questions.length).fill(false));
    }
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, finished]);

  const handleStartPractice = async () => {
    setLoading(true);
    try {
      const res = await getExamPracticeDetail(maCuocThi);
      if (res?.ma_phien_luyen_thi) {
        setMaPhienLuyenThi(res.ma_phien_luyen_thi);
        localStorage.setItem("ma_phien_luyen_thi", res.ma_phien_luyen_thi);
        setStarted(true);
        setChatHistory([]);
        localStorage.setItem(storageKey, JSON.stringify([]));
        setQuestions([]);
        setMessages([]);
        setAnswered([]);
        setCurrent(0);
      }
    } catch {
      alert("Có lỗi khi bắt đầu luyện thi!");
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setShowConfirm(true);
  };
  const handleConfirm = async () => {
    if (!maPhienLuyenThi) {
      alert("Chưa có mã phiên luyện thi!");
      return;
    }
    const timeStr = formatTime(60 * 60 - timeLeft);
    const userMsg = { sender: "user", text: input, time: timeStr };
    setInput("");
    setShowHint(false);
    setShowConfirm(false);
    try {
      const res = await checkAnswerExamPractice(maPhienLuyenThi, {
        CauTraLoi: input,
      });
      const botMsg = {
        sender: "bot",
        text: res?.BotTraLoi || "Không có phản hồi",
        time: formatTime(60 * 60 - timeLeft),
      };
      setMessages((prev) => {
        const updated = [...prev];
        updated[current] = [...(updated[current] || []), userMsg, botMsg];
        return updated;
      });

      const newHistory = [...chatHistory];

      newHistory[current] = {
        question: questions[current]?.text,
        userMsg,
        botMsg,
      };

      setChatHistory(newHistory);
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
      setAnswered((prev) => {
        const arr = [...prev];
        arr[current] = true;
        return arr;
      });

      const nextIndex = current + 1;
      if (questions[nextIndex]) setCurrent(nextIndex);
    } catch (error) {
      console.log(error);

      alert("Có lỗi khi gửi câu trả lời!");
    }
  };

  const handleFinish = () => setShowFinish(true);
  const handleFinishConfirm = async () => {
    setFinished(true);
    try {
      const message = await finishedExamPractice(maPhienLuyenThi);
      if (!message) {
        throw new Error("Có lỗi khi kết thúc luyện thi!");
      }
      localStorage.removeItem(storageKey);
      navigate("/exams");
    } catch {
      alert("Có lỗi khi kết thúc luyện thi!");
    }
  };

  // if (finished) {
  //   return (
  //     <Flex bg="#F5F9FF" align="center" justify="center" pt={8}>
  //       <SidebarTaking
  //         questions={questions}
  //         current={current}
  //         answered={answered}
  //         timeLeft={timeLeft}
  //         onSelect={setCurrent}
  //       />
  //       <Box
  //         flex={1}
  //         display="flex"
  //         justifyContent="center"
  //         alignItems="center"
  //       >
  //         <ResultTable
  //           questions={questions.map((q, idx) => ({
  //             ...q,
  //             answer: messages[idx]?.[0]?.text || "",
  //             score: "",
  //           }))}
  //         />
  //       </Box>
  //       <Button
  //         colorScheme="blackAlpha"
  //         borderRadius="md"
  //         px={10}
  //         fontWeight="bold"
  //         position="absolute"
  //         bottom={8}
  //         right={8}
  //         onClick={() => navigate("/exams")}
  //       >
  //         Thoát
  //       </Button>
  //     </Flex>
  //   );
  // }

  return (
    <Flex bg="#F5F9FF" align="center">
      {/* <SidebarTaking
        questions={questions}
        current={current}
        answered={answered}
        timeLeft={timeLeft}
        onSelect={setCurrent}
      /> */}
      <Box flex={1} px={8}>
        {!started ? (
          <Flex justify="center" align="center" h="60vh">
            <Button
              colorScheme="blue"
              size="xl"
              fontWeight="bold"
              fontSize="xl"
              p={8}
              onClick={handleStartPractice}
              isLoading={loading}
            >
              BẮT ĐẦU LUYỆN THI
            </Button>
          </Flex>
        ) : (
          <>
            <ChatArea
              messages={messages[current] || []}
              onSend={handleSend}
              input={input}
              setInput={setInput}
              disabled={finished}
              onShowHint={() => setShowHint(true)}
              isHintDisabled={showHint}
              showHint={showHint}
              hintText={questions[current]?.hint || ""}
              isPracticeMode={true}
            />

            <Flex justify="center" mt={6}>
              {/* {answered.every(Boolean) ? (
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
                <Button bg="blue.300" size="lg" onClick={handleFinish}>
                  Xác nhận hoàn thành bài thi
                </Button>
              )} */}
              <Button bg="blue.300" size="lg" onClick={handleFinish}>
                Xác nhận kết thúc luyện thi
              </Button>
            </Flex>
          </>
        )}
      </Box>
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
      <FinishModal isOpen={showFinish} onConfirm={handleFinishConfirm} />
    </Flex>
  );
};

export default ExamPractice;
