import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import QuestionLevelBox from "./QuestionLevelBox";

const LEVELS = [
  { label: "Dễ", value: "Dễ" },
  { label: "Trung bình", value: "Trung bình" },
  { label: "Khó", value: "Khó" },
];

const CreateQuestion = () => {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(LEVELS[0].value);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [ideas, setIdeas] = useState([
    {
      idea: "",
      subQuestion: "",
      subAnswer: "",
      confirmed: false,
      subQuestionConfirmed: false,
      subAnswerConfirmed: false,
    },
  ]);
  const [currentIdea, setCurrentIdea] = useState(0);
  const [showNextIdea, setShowNextIdea] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLevelConfirm = () => setStep(1);
  const handleQuestionConfirm = () => setStep(2);
  const handleAnswerConfirm = () => setStep(3);

  const handleAddIdea = () => {
    setIdeas([
      ...ideas,
      {
        idea: "",
        subQuestion: "",
        subAnswer: "",
        confirmed: false,
        subQuestionConfirmed: false,
        subAnswerConfirmed: false,
      },
    ]);
    setCurrentIdea(currentIdea + 1);
    setShowNextIdea(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // TODO: gửi dữ liệu lên server
  };

  // Helpers: Kiểm tra điều kiện hiển thị các bước con
  const canShowSubQuestion = (item) => item.confirmed;
  const canShowSubAnswer = (item) =>
    item.confirmed && item.subQuestionConfirmed;
  const canShowAddIdeaButton = (item) =>
    item.subQuestionConfirmed && item.subAnswerConfirmed;

  return (
    <Box minH="100vh" direction="column" bg="#F5F9FF" pt={5}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Heading fontSize="xl" mb={4} textTransform="uppercase">
          Tạo câu hỏi chương 1
        </Heading>
        <QuestionLevelBox easy={10} medium={5} hard={5} />

        <Flex justify="space-between" align="center" w="100%" mb={6}>
          {["Mức độ", "Câu hỏi", "Trả lời", "Tách ý và Câu hỏi phụ"].map(
            (label, index) => (
              <Box key={index} textAlign="center" flex="1">
                <Box
                  w="40px"
                  h="40px"
                  mx="auto"
                  borderRadius="full"
                  bg={step >= index ? "blue.500" : "gray.300"}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={1}
                  fontWeight="bold"
                >
                  {index + 1}
                </Box>
                <Text fontSize="sm">{label}</Text>
              </Box>
            )
          )}
        </Flex>

        {/* BƯỚC 1: CHỌN MỨC ĐỘ */}
        <Box bg="white" p={6} borderRadius="md" w="100%" mb={4}>
          <Text fontWeight="bold" mb={2}>
            Chọn mức độ:
          </Text>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            mb={4}
            maxW="200px"
            isDisabled={step > 0}
          >
            {LEVELS.map((lv) => (
              <option key={lv.value} value={lv.value}>
                {lv.label}
              </option>
            ))}
          </Select>
          {step === 0 && (
            <Button colorScheme="blue" onClick={handleLevelConfirm}>
              Tạo câu hỏi
            </Button>
          )}
        </Box>

        {/* BƯỚC 2: NHẬP CÂU HỎI */}
        <Box bg="white" p={6} borderRadius="md" w="100%" mb={4}>
          <Text fontWeight="bold" mb={2}>
            Câu hỏi
          </Text>
          <Input
            placeholder="Nhập nội dung câu hỏi"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            isDisabled={step > 1}
            mb={2}
          />
          {step === 1 && (
            <>
              <Button
                colorScheme="green"
                mt={2}
                onClick={handleQuestionConfirm}
                isDisabled={!question}
              >
                Xác nhận
              </Button>
              <Button colorScheme="yellow" mt={2} isDisabled={!question}>
                Tạo lại
              </Button>
            </>
          )}
        </Box>

        {/* BƯỚC 3: NHẬP TRẢ LỜI */}
        <Box bg="white" p={6} borderRadius="md" w="100%" mb={4}>
          <Text fontWeight="bold" mb={2}>
            Câu trả lời
          </Text>
          <Input
            placeholder="Nhập nội dung đáp án"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            isDisabled={step > 2}
            mb={2}
          />
          {step === 2 && (
            <>
              <Button
                colorScheme="green"
                mt={2}
                onClick={handleAnswerConfirm}
                isDisabled={!answer}
              >
                Xác nhận
              </Button>
              <Button colorScheme="yellow" mt={2} isDisabled={!answer}>
                Tạo lại
              </Button>
            </>
          )}
        </Box>

        {/* BƯỚC 4: TÁCH Ý VÀ CÂU HỎI PHỤ */}
        <VStack align="stretch" spacing={4} w="100%">
          {step >= 3 &&
            ideas.map((item, idx) => (
              <Box
                key={idx}
                bg="white"
                p={5}
                borderRadius="md"
                border="1px solid #B3B3B3"
              >
                <Text fontWeight="bold" mb={2}>
                  Tách ý {idx + 1}
                </Text>
                <Input
                  placeholder={`Tách ý ${idx + 1}`}
                  value={item.idea}
                  onChange={(e) => {
                    const updated = [...ideas];
                    updated[idx].idea = e.target.value;
                    setIdeas(updated);
                  }}
                  isDisabled={item.confirmed}
                  mb={2}
                />
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => {
                    const updated = [...ideas];
                    updated[idx].confirmed = true;
                    setIdeas(updated);
                  }}
                  isDisabled={!item.idea || item.confirmed}
                  mb={2}
                >
                  Xác nhận
                </Button>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  mb={2}
                  isDisabled={item.confirmed}
                >
                  Tạo lại
                </Button>

                {canShowSubQuestion(item) && (
                  <Box mt={2}>
                    <Text mb={1}>Câu hỏi phụ {idx + 1}</Text>
                    <Input
                      placeholder={`Câu hỏi phụ ${idx + 1}`}
                      value={item.subQuestion}
                      onChange={(e) => {
                        const updated = [...ideas];
                        updated[idx].subQuestion = e.target.value;
                        setIdeas(updated);
                      }}
                      isDisabled={item.subQuestionConfirmed}
                      mb={2}
                    />
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => {
                        const updated = [...ideas];
                        updated[idx].subQuestionConfirmed = true;
                        setIdeas(updated);
                      }}
                      isDisabled={
                        !item.subQuestion || item.subQuestionConfirmed
                      }
                      mb={2}
                    >
                      Xác nhận
                    </Button>

                    <Button
                      colorScheme="yellow"
                      size="sm"
                      isDisabled={
                        !item.subQuestion || item.subQuestionConfirmed
                      }
                      mb={2}
                    >
                      Tạo lại
                    </Button>
                  </Box>
                )}

                {canShowSubAnswer(item) && (
                  <Box mt={2}>
                    <Text mb={1}>Trả lời phụ {idx + 1}</Text>
                    <Input
                      placeholder={`Trả lời phụ ${idx + 1}`}
                      value={item.subAnswer}
                      onChange={(e) => {
                        const updated = [...ideas];
                        updated[idx].subAnswer = e.target.value;
                        setIdeas(updated);
                      }}
                      isDisabled={item.subAnswerConfirmed}
                      mb={2}
                    />
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => {
                        const updated = [...ideas];
                        updated[idx].subAnswerConfirmed = true;
                        setIdeas(updated);
                        setShowNextIdea(true);
                      }}
                      isDisabled={!item.subAnswer || item.subAnswerConfirmed}
                      mb={2}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      colorScheme="yellow"
                      size="sm"
                      isDisabled={!item.subAnswer || item.subAnswerConfirmed}
                      mb={2}
                    >
                      Tạo lại
                    </Button>
                  </Box>
                )}
              </Box>
            ))}

          {step >= 3 && showNextIdea && ideas.every(canShowAddIdeaButton) && (
            <Button
              colorScheme="blue"
              onClick={handleAddIdea}
              w="200px"
              alignSelf="center"
            >
              Thêm ý
            </Button>
          )}

          {step >= 3 && (
            <>
              <Divider />
              <Button
                colorScheme="teal"
                onClick={handleSave}
                w="200px"
                alignSelf="center"
              >
                Lưu
              </Button>
              {isSaved && (
                <Text color="green.500" align="center">
                  Đã lưu thành công!
                </Text>
              )}
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default CreateQuestion;
