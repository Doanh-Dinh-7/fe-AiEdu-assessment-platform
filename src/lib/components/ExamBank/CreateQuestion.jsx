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
  useToast,
  Center,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import QuestionLevelBox from "./QuestionLevelBox";
import { createQuestion, getQuestionSuggestion } from "../../service/question";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LEVELS = [
  { label: "Dễ", value: "Dễ" },
  { label: "Trung bình", value: "Trung bình" },
  { label: "Khó", value: "Khó" },
];

const CreateQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);

  const { maHocPhan, maChuong } = useParams();
  const { easy, medium, hard } = location.state || {};
  const toast = useToast();

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

  const handleSave = async () => {
    setLoading(true);
    const questionData = {
      NoiDung: question,
      DapAn: answer,
      MucDo: level.toLowerCase(),
      cau_hoi_phu: ideas
        .filter(
          (item) =>
            item.idea?.trim() !== "" &&
            item.subQuestion?.trim() !== "" &&
            item.subAnswer?.trim() !== ""
        )
        .map((item) => ({
          YChinh: item.idea,
          TyLeDiem: 1 / ideas.length,
          CauHoiBoSung: item.subQuestion,
          DapAnBoSung: item.subAnswer,
        })),
    };

    try {
      await createQuestion(maChuong, questionData);
      toast({
        title: "Lưu thành công!",
        description: "Câu hỏi đã được lưu vào ngân hàng đề.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate(-1);
    } catch (error) {
      toast({
        title: "Lưu thất bại!",
        description: "Có lỗi xảy ra khi lưu câu hỏi. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestion = async (body) => {
    try {
      const res = await getQuestionSuggestion(maHocPhan, maChuong, body);
      if (res && res.content) {
        return res;
      }
      return null;
    } catch (error) {
      toast({
        title: "Lỗi!",
        description: "Không thể lấy gợi ý. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log("error", error);
      return null;
    }
  };

  // Helpers: Kiểm tra điều kiện hiển thị các bước con
  const canShowSubQuestion = (item) => item.confirmed;
  const canShowSubAnswer = (item) =>
    item.confirmed && item.subQuestionConfirmed;
  const canShowAddIdeaButton = (item) =>
    item.subQuestionConfirmed && item.subAnswerConfirmed;

  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="background"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="xl"
            mb={2}
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Tạo câu hỏi chương {maChuong}
          </Heading>
        </Center>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={4}
        mb={4}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <QuestionLevelBox easy={easy} medium={medium} hard={hard} />
        <Flex justify="space-between" align="center" w="100%" mb={6}>
          {["Mức độ", "Câu hỏi", "Trả lời", "Tách ý và Câu hỏi phụ"].map(
            (label, index) => (
              <Box key={index} textAlign="center" flex="1">
                <Box
                  w="40px"
                  h="40px"
                  mx="auto"
                  borderRadius="full"
                  bg={step >= index ? "brand.500" : "gray.300"}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={1}
                  fontWeight="bold"
                >
                  {index + 1}
                </Box>
                <Text fontSize="sm" color="textSecondary">
                  {label}
                </Text>
              </Box>
            )
          )}
        </Flex>

        {/* BƯỚC 1: CHỌN MỨC ĐỘ */}
        <Box bg="background" p={6} borderRadius="md" w="100%" mb={4}>
          <Text fontWeight="semibold" mb={2} fontSize="md" color="textPrimary">
            Chọn mức độ:
          </Text>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            mb={4}
            maxW="200px"
            isDisabled={step > 0}
            borderRadius="md"
            bg="surface"
            fontWeight="medium"
            color="textPrimary"
            borderColor="border"
            _focus={{
              borderColor: "brand.500",
              boxShadow: "outline",
            }}
          >
            {LEVELS.map((lv) => (
              <option key={lv.value} value={lv.value}>
                {lv.label}
              </option>
            ))}
          </Select>
          {step === 0 && (
            <Button
              colorScheme="brand"
              borderRadius="md"
              px={8}
              fontWeight="semibold"
              fontSize="md"
              boxShadow="md"
              onClick={handleLevelConfirm}
            >
              Xác nhận
            </Button>
          )}
        </Box>

        {/* BƯỚC 2: CÂU HỎI */}
        {step >= 1 && (
          <Box bg="background" p={6} borderRadius="md" w="100%" mb={4}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="semibold" fontSize="md" color="textPrimary">
                Câu hỏi:
              </Text>
              {step === 1 && (
                <Button
                  size="sm"
                  colorScheme="brand"
                  variant="outline"
                  onClick={async () => {
                    const res = await fetchSuggestion({
                      noi_dung_cau_hoi: question,
                      muc_do: level.toLowerCase(),
                    });
                    if (res) {
                      setQuestion(res.content);
                    }
                  }}
                >
                  Tạo lại
                </Button>
              )}
            </Flex>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập nội dung câu hỏi..."
              rows={4}
              mb={4}
              isDisabled={step > 1}
              borderRadius="md"
              bg="surface"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
            {step === 1 && (
              <Button
                colorScheme="brand"
                borderRadius="md"
                px={8}
                fontWeight="semibold"
                fontSize="md"
                boxShadow="md"
                onClick={handleQuestionConfirm}
              >
                Xác nhận
              </Button>
            )}
          </Box>
        )}

        {/* BƯỚC 3: TRẢ LỜI */}
        {step >= 2 && (
          <Box bg="background" p={6} borderRadius="md" w="100%" mb={4}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="semibold" fontSize="md" color="textPrimary">
                Trả lời:
              </Text>
              {step === 2 && (
                <Button
                  size="sm"
                  colorScheme="brand"
                  variant="outline"
                  onClick={async () => {
                    const res = await fetchSuggestion({
                      noi_dung_cau_hoi: question,
                      dap_an: answer,
                      muc_do: level.toLowerCase(),
                    });
                    if (res) {
                      setAnswer(res.content);
                    }
                  }}
                >
                  Tạo lại
                </Button>
              )}
            </Flex>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Nhập nội dung câu trả lời..."
              rows={4}
              mb={4}
              isDisabled={step > 2}
              borderRadius="md"
              bg="surface"
              fontSize="sm"
              boxShadow="sm"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "outline",
              }}
            />
            {step === 2 && (
              <Button
                colorScheme="brand"
                borderRadius="md"
                px={8}
                fontWeight="semibold"
                fontSize="md"
                boxShadow="md"
                onClick={handleAnswerConfirm}
              >
                Xác nhận
              </Button>
            )}
          </Box>
        )}

        {/* BƯỚC 4: TÁCH Ý VÀ CÂU HỎI PHỤ */}
        {step >= 3 && (
          <Box bg="background" p={6} borderRadius="md" w="100%" mb={4}>
            <Text
              fontWeight="semibold"
              fontSize="md"
              color="textPrimary"
              mb={4}
            >
              Tách ý và tạo câu hỏi phụ:
            </Text>
            <VStack
              divider={<Divider borderColor="border" />}
              spacing={6}
              align="stretch"
            >
              {ideas.map((item, index) => (
                <Box key={index}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      color="textSecondary"
                    >
                      Ý chính {index + 1}:
                    </Text>
                    {step === 3 && !item.confirmed && (
                      <Button
                        size="sm"
                        colorScheme="brand"
                        variant="outline"
                        onClick={async () => {
                          const res = await fetchSuggestion({
                            noi_dung_cau_hoi: question,
                            dap_an: answer,
                            y_chinh: ideas.map((i) => i.idea),
                            muc_do: level.toLowerCase(),
                          });
                          if (res) {
                            setIdeas((prev) =>
                              prev.map((ideaItem, idx) =>
                                idx === index
                                  ? { ...ideaItem, idea: res.content }
                                  : ideaItem
                              )
                            );
                          }
                        }}
                        isLoading={loading}
                      >
                        Tạo lại
                      </Button>
                    )}
                  </Flex>
                  <Textarea
                    value={item.idea}
                    onChange={(e) =>
                      setIdeas((prev) =>
                        prev.map((ideaItem, idx) =>
                          idx === index
                            ? { ...ideaItem, idea: e.target.value }
                            : ideaItem
                        )
                      )
                    }
                    placeholder="Nhập ý chính..."
                    rows={2}
                    mb={2}
                    isDisabled={item.confirmed || loading}
                    borderRadius="md"
                    bg="surface"
                    fontSize="sm"
                    boxShadow="sm"
                    borderColor="border"
                    color="textPrimary"
                    _placeholder={{ color: "textSecondary" }}
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "outline",
                    }}
                  />
                  {step === 3 && !item.confirmed && (
                    <Button
                      size="sm"
                      colorScheme="brand"
                      borderRadius="md"
                      px={6}
                      fontWeight="semibold"
                      fontSize="sm"
                      boxShadow="sm"
                      onClick={() =>
                        setIdeas((prev) =>
                          prev.map((ideaItem, idx) =>
                            idx === index
                              ? { ...ideaItem, confirmed: true }
                              : ideaItem
                          )
                        )
                      }
                      isDisabled={!item.idea.trim()}
                    >
                      Xác nhận ý chính
                    </Button>
                  )}

                  {/* Câu hỏi phụ */}
                  {canShowSubQuestion(item) && (
                    <Box mt={4}>
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text
                          fontWeight="semibold"
                          fontSize="sm"
                          color="textSecondary"
                        >
                          Câu hỏi phụ {index + 1}:
                        </Text>
                        {step === 3 && !item.subQuestionConfirmed && (
                          <Button
                            size="sm"
                            colorScheme="brand"
                            variant="outline"
                            onClick={async () => {
                              const res = await fetchSuggestion({
                                noi_dung_cau_hoi: question,
                                dap_an: answer,
                                y_chinh: [item.idea],
                                cau_hoi_bo_sung: item.subQuestion,
                                muc_do: level.toLowerCase(),
                              });
                              if (res) {
                                setIdeas((prev) =>
                                  prev.map((ideaItem, idx) =>
                                    idx === index
                                      ? {
                                          ...ideaItem,
                                          subQuestion: res.content,
                                        }
                                      : ideaItem
                                  )
                                );
                              }
                            }}
                            isLoading={loading}
                          >
                            Tạo lại
                          </Button>
                        )}
                      </Flex>
                      <Textarea
                        value={item.subQuestion}
                        onChange={(e) => {
                          const updated = [...ideas];
                          updated[index].subQuestion = e.target.value;
                          setIdeas(updated);
                        }}
                        placeholder="Nhập câu hỏi phụ..."
                        rows={2}
                        mb={2}
                        isDisabled={item.subQuestionConfirmed || loading}
                        borderRadius="md"
                        bg="surface"
                        fontSize="sm"
                        boxShadow="sm"
                        borderColor="border"
                        color="textPrimary"
                        _placeholder={{ color: "textSecondary" }}
                        _focus={{
                          borderColor: "brand.500",
                          boxShadow: "outline",
                        }}
                      />
                      {step === 3 && !item.subQuestionConfirmed && (
                        <Button
                          size="sm"
                          colorScheme="brand"
                          borderRadius="md"
                          px={6}
                          fontWeight="semibold"
                          fontSize="sm"
                          boxShadow="sm"
                          onClick={() => {
                            const updated = [...ideas];
                            updated[index].subQuestionConfirmed = true;
                            setIdeas(updated);
                          }}
                          isDisabled={!item.subQuestion.trim()}
                        >
                          Xác nhận câu hỏi phụ
                        </Button>
                      )}
                    </Box>
                  )}

                  {/* Trả lời phụ */}
                  {canShowSubAnswer(item) && (
                    <Box mt={4}>
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text
                          fontWeight="semibold"
                          fontSize="sm"
                          color="textSecondary"
                        >
                          Trả lời phụ {index + 1}:
                        </Text>
                        {step === 3 && !item.subAnswerConfirmed && (
                          <Button
                            size="sm"
                            colorScheme="brand"
                            variant="outline"
                            onClick={async () => {
                              const res = await fetchSuggestion({
                                noi_dung_cau_hoi: question,
                                dap_an: answer,
                                y_chinh: [item.idea],
                                cau_hoi_bo_sung: item.subQuestion,
                                dap_an_bo_sung: item.subAnswer,
                                muc_do: level.toLowerCase(),
                              });
                              if (res) {
                                setIdeas((prev) =>
                                  prev.map((ideaItem, idx) =>
                                    idx === index
                                      ? { ...ideaItem, subAnswer: res.content }
                                      : ideaItem
                                  )
                                );
                              }
                            }}
                            isLoading={loading}
                          >
                            Tạo lại
                          </Button>
                        )}
                      </Flex>
                      <Textarea
                        value={item.subAnswer}
                        onChange={(e) => {
                          const updated = [...ideas];
                          updated[index].subAnswer = e.target.value;
                          setIdeas(updated);
                        }}
                        placeholder="Nhập trả lời phụ..."
                        rows={2}
                        mb={2}
                        isDisabled={item.subAnswerConfirmed || loading}
                        borderRadius="md"
                        bg="surface"
                        fontSize="sm"
                        boxShadow="sm"
                        borderColor="border"
                        color="textPrimary"
                        _placeholder={{ color: "textSecondary" }}
                        _focus={{
                          borderColor: "brand.500",
                          boxShadow: "outline",
                        }}
                      />
                      {step === 3 && !item.subAnswerConfirmed && (
                        <Button
                          size="sm"
                          colorScheme="brand"
                          borderRadius="md"
                          px={6}
                          fontWeight="semibold"
                          fontSize="sm"
                          boxShadow="sm"
                          onClick={() => {
                            const updated = [...ideas];
                            updated[index].subAnswerConfirmed = true;
                            setIdeas(updated);
                            setShowNextIdea(true);
                          }}
                          isDisabled={!item.subAnswer.trim()}
                        >
                          Xác nhận trả lời phụ
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
              {step === 3 && ideas.every(canShowAddIdeaButton) && (
                <Center mt={4}>
                  <Button
                    colorScheme="teal"
                    borderRadius="full"
                    px={8}
                    fontWeight="semibold"
                    fontSize="md"
                    boxShadow="md"
                    onClick={handleAddIdea}
                  >
                    ＋ Thêm ý chính
                  </Button>
                </Center>
              )}
            </VStack>
          </Box>
        )}

        <Flex justify="flex-end" w="100%" maxW="1200px" mb={8}>
          {step >= 3 &&
            ideas.every(
              (item) =>
                item.confirmed &&
                item.subQuestionConfirmed &&
                item.subAnswerConfirmed
            ) && (
              <Button
                colorScheme="green"
                borderRadius="md"
                px={8}
                fontWeight="semibold"
                fontSize="md"
                boxShadow="md"
                onClick={handleSave}
                isLoading={loading}
                isDisabled={
                  ideas.length === 0 ||
                  ideas.some(
                    (item) =>
                      !item.idea.trim() ||
                      !item.subQuestion.trim() ||
                      !item.subAnswer.trim()
                  )
                }
              >
                Lưu câu hỏi
              </Button>
            )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateQuestion;
