import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SidebarTaking from "../../lib/components/Exam/ExamTaking/SidebarTaking";
import ConfirmModal from "../../lib/components/Exam/ExamTaking/ConfirmModal";
import FinishModal from "../../lib/components/Exam/ExamTaking/FinishModal";
import ResultTable from "../../lib/components/Exam/ExamTaking/ResultTable";
import ChatArea from "../../lib/components/Exam/ExamTaking/ChatArea";

const mockQuestions = [
  {
    id: 1,
    text: "Tại sao người như tôi lại không có người yêu, tôi tệ như vậy sao =))))",
  },
  { id: 2, text: "Câu hỏi 2" },
  { id: 3, text: "Câu hỏi 3" },
];

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const ExamTaking = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([[]]);
  const [answered, setAnswered] = useState([false, false, false]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    setMessages(
      mockQuestions.map((q) => [
        {
          sender: "bot",
          text: q.text,
          time: formatTime(0),
        },
      ])
    );
    setAnswered(Array(mockQuestions.length).fill(false));
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

  const handleSend = () => {
    if (!input.trim()) return;
    setShowConfirm(true);
  };
  const handleConfirm = () => {
    const timeStr = formatTime(60 * 60 - timeLeft);
    const nextIndex = current + 1;

    setMessages((prev) => {
      const updated = [...prev];
      updated[current] = [
        ...updated[current],
        { sender: "user", text: input, time: timeStr },
      ];

      if (mockQuestions[nextIndex]) {
        updated[nextIndex] = [
          {
            sender: "bot",
            text: mockQuestions[nextIndex].text,
            time: timeStr,
          },
        ];
      }

      return updated;
    });

    setAnswered((prev) => {
      const arr = [...prev];
      arr[current] = true;
      return arr;
    });

    setInput("");
    setShowConfirm(false);
    if (mockQuestions[nextIndex]) setCurrent(nextIndex);
  };

  const handleFinish = () => setShowFinish(true);
  const handleFinishConfirm = () => setFinished(true);

  if (finished) {
    return (
      <Flex bg="#F5F9FF" align="center" justify="center" pt={8}>
        <SidebarTaking
          questions={mockQuestions}
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
          <ResultTable
            questions={mockQuestions.map((q, idx) => ({
              ...q,
              answer: messages[idx]?.[0]?.text || "",
              score: "",
            }))}
          />
        </Box>
        <Button
          colorScheme="blackAlpha"
          borderRadius="md"
          px={10}
          fontWeight="bold"
          position="absolute"
          bottom={8}
          right={8}
          onClick={() => navigate("/exams")}
        >
          Thoát
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="#F5F9FF" align="center">
      <SidebarTaking
        questions={mockQuestions}
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
              fontSize="2xl"
              p={8}
              onClick={() => setStarted(true)}
            >
              BẮT ĐẦU
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
            />
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
                  <Button colorScheme="green" size="lg" onClick={handleFinish}>
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
      />
      <FinishModal isOpen={showFinish} onConfirm={handleFinishConfirm} />
    </Flex>
  );
};

export default ExamTaking;
