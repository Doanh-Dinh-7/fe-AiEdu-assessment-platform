import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
// import SidebarTaking from "../../lib/components/Exam/ExamTaking/SidebarTaking";
import FinishModal from "../../lib/components/Exam/ExamTaking/FinishModal";
// import ResultTable from "../../lib/components/Exam/ExamTaking/ResultTable";
import ChatArea from "../../lib/components/Exam/ExamTaking/ChatArea";
import {
  getExamPracticeDetail,
  checkAnswerExamPractice,
  finishedExamPractice,
} from "../../lib/service/examPratice";

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
  const [started, setStarted] = useState(
    () => !!localStorage.getItem("ma_phien_luyen_thi")
  );
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([[]]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [showHint, setShowHint] = useState(false);
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
    // Khôi phục messages từ localStorage nếu có
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {}
    }
    // Nếu không có thì khởi tạo như cũ
    setMessages(
      questions.map((q) => [
        {
          sender: "bot",
          text: q.text,
          time: formatTime(0),
        },
      ])
    );
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

  useEffect(() => {
    if (messages && messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

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
        setCurrent(0);
      }
    } catch {
      alert("Có lỗi khi bắt đầu luyện thi!");
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!maPhienLuyenThi) {
      alert("Chưa có mã phiên luyện thi!");
      return;
    }
    const timeStr = formatTime(60 * 60 - timeLeft);
    const userMsg = { sender: "user", text: input, time: timeStr };
    setInput("");
    setShowHint(false);
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
      localStorage.removeItem("ma_phien_luyen_thi");
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
    <Flex
      bg="background"
      align="stretch"
      direction="column"
      minH="100vh"
      fontFamily="Inter, sans-serif"
    >
      {started && !finished && (
        <Button
          colorScheme="red"
          borderRadius="md"
          fontWeight="semibold"
          position="fixed"
          top={8}
          left={8}
          zIndex={10}
          onClick={handleFinish}
          boxShadow="md"
        >
          Kết thúc
        </Button>
      )}

      {!started ? (
        <Flex flex="1" justify="center" align="center" p={{ base: 4, md: 8 }}>
          <Button
            colorScheme="brand"
            size="xl"
            fontWeight="semibold"
            fontSize="xl"
            p={8}
            onClick={handleStartPractice}
            isLoading={loading}
            borderRadius="md"
            boxShadow="md"
          >
            BẮT ĐẦU LUYỆN THI
          </Button>
        </Flex>
      ) : (
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
          maCuocThi={maCuocThi}
        />
      )}

      <FinishModal
        isOpen={showFinish}
        onConfirm={handleFinishConfirm}
        onCancel={() => setShowFinish(false)}
      />
    </Flex>
  );
};

export default ExamPractice;
