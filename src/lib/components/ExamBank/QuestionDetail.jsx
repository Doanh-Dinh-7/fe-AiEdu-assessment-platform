import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Textarea,
  Center,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import QuestionLevelBox from "./QuestionLevelBox";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAutoResizeTextarea from "../../hooks/useAutoResizeTextarea";
import {
  updateAnswer,
  updateQuestion,
  updateIdeas,
  updateSubQnA,
} from "../../service/question";

// const questionDetailData = [
//   {
//     stt: 1,
//     content: "Nội dung câu hỏi 1",
//     answer: "Nội dung đáp án 1",
//     level: "Dễ",
//     mainIdea: "Ý thứ nhất",
//     score: 1,
//     extraQuestion: "Câu hỏi cho ý 1",
//     extraAnswer: "Đáp án cho ý 1",
//   },
//   // ... thêm các dòng khác nếu cần
// ];

const QuestionDetail = () => {
  const location = useLocation();
  const { maCauHoi } = useParams();
  const { mode, questionDetailData, easy, medium, hard } = location.state || {};
  const toast = useToast();
  console.log("QuestionDetail location state:", location.state);

  // State cho dữ liệu gốc và dữ liệu có thể chỉnh sửa
  const [originalQuestionData, setOriginalQuestionData] = useState(null);
  const [editableQuestionData, setEditableQuestionData] = useState(null);

  // Effect để lưu dữ liệu gốc và dữ liệu có thể chỉnh sửa khi component load
  useEffect(() => {
    if (questionDetailData) {
      setOriginalQuestionData(questionDetailData);
      // Tạo bản sao sâu của dữ liệu để chỉnh sửa
      setEditableQuestionData(JSON.parse(JSON.stringify(questionDetailData)));
    }
  }, [questionDetailData]); // Chạy khi questionDetailData thay đổi

  const isEdit = mode === "edit";

  // State và ref cho câu hỏi và đáp án chính
  const [question, setQuestion] = useState(questionDetailData?.NoiDung || "");
  const [answer, setAnswer] = useState(
    questionDetailData?.DapAn?.[0]?.NoiDung || ""
  );
  const questionRef = useAutoResizeTextarea(question);
  const answerRef = useAutoResizeTextarea(answer);

  const [loading, setLoading] = useState(false);

  // Cập nhật state khi người dùng thay đổi nội dung ý chính
  const handleIdeaChange = (ideaId, value) => {
    setEditableQuestionData((prevData) => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      const answerIndex = newData.DapAn.findIndex(
        (ans) => ans.MaDapAn === editableQuestionData.DapAn[0].MaDapAn
      );
      if (answerIndex === -1) return prevData;

      const ideaIndex = newData.DapAn[answerIndex].YChinh.findIndex(
        (idea) => idea.MaID === ideaId
      );
      if (ideaIndex === -1) return prevData;

      newData.DapAn[answerIndex].YChinh[ideaIndex].NoiDung = value;
      return newData;
    });
  };

  // Cập nhật state khi người dùng thay đổi tỷ lệ điểm ý chính
  const handleIdeaScoreChange = (ideaId, value) => {
    setEditableQuestionData((prevData) => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      const answerIndex = newData.DapAn.findIndex(
        (ans) => ans.MaDapAn === editableQuestionData.DapAn[0].MaDapAn
      );
      if (answerIndex === -1) return prevData;

      const ideaIndex = newData.DapAn[answerIndex].YChinh.findIndex(
        (idea) => idea.MaID === ideaId
      );
      if (ideaIndex === -1) return prevData;

      newData.DapAn[answerIndex].YChinh[ideaIndex].TyLeDiem = parseFloat(value);
      return newData;
    });
  };

  // Cập nhật state khi người dùng thay đổi nội dung câu hỏi bổ sung
  const handleSubQContentChange = (ideaId, subQId, value) => {
    setEditableQuestionData((prevData) => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      const answerIndex = newData.DapAn.findIndex(
        (ans) => ans.MaDapAn === editableQuestionData.DapAn[0].MaDapAn
      );
      if (answerIndex === -1) return prevData;

      const ideaIndex = newData.DapAn[answerIndex].YChinh.findIndex(
        (idea) => idea.MaID === ideaId
      );
      if (ideaIndex === -1) return prevData;

      const subQIndex = newData.DapAn[answerIndex].YChinh[
        ideaIndex
      ].CauHoiBoSung.findIndex((subq) => subq.MaCauBoSung === subQId);
      if (subQIndex === -1) return prevData;

      newData.DapAn[answerIndex].YChinh[ideaIndex].CauHoiBoSung[
        subQIndex
      ].NoiDung = value;
      return newData;
    });
  };

  // Cập nhật state khi người dùng thay đổi đáp án câu hỏi bổ sung
  const handleSubQAnswerChange = (ideaId, subQId, value) => {
    setEditableQuestionData((prevData) => {
      if (!prevData) return null;
      const newData = JSON.parse(JSON.stringify(prevData));
      const answerIndex = newData.DapAn.findIndex(
        (ans) => ans.MaDapAn === editableQuestionData.DapAn[0].MaDapAn
      );
      if (answerIndex === -1) return prevData;

      const ideaIndex = newData.DapAn[answerIndex].YChinh.findIndex(
        (idea) => idea.MaID === ideaId
      );
      if (ideaIndex === -1) return prevData;

      const subQIndex = newData.DapAn[answerIndex].YChinh[
        ideaIndex
      ].CauHoiBoSung.findIndex((subq) => subq.MaCauBoSung === subQId);
      if (subQIndex === -1) return prevData;

      newData.DapAn[answerIndex].YChinh[ideaIndex].CauHoiBoSung[
        subQIndex
      ].DapAnBoSung = value;
      return newData;
    });
  };

  const handleUpdateQuestion = async () => {
    setLoading(true);
    try {
      const cau_hoi = await updateQuestion(maCauHoi, {
        NoiDung: question,
        MucDo: questionDetailData.MucDo,
      });
      const dap_an = await updateAnswer(
        questionDetailData?.DapAn?.[0]?.MaDapAn,
        {
          NoiDung: answer,
        }
      );
      if (!cau_hoi || !dap_an) {
        throw new Error("Lỗi khi cập nhật câu hỏi hoặc đáp án");
      }
      toast({
        title: "Thành công",
        description: "Câu hỏi đã được cập nhật thành công",
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật câu hỏi:", error);
      setLoading(false);
    }
  };

  const handleSubQuestion = async () => {
    setLoading(true);
    try {
      const updates = []; // Mảng để lưu các promise gọi API

      // Đảm bảo có dữ liệu gốc và dữ liệu có thể chỉnh sửa trước khi xử lý
      if (!originalQuestionData || !editableQuestionData) {
        toast({
          title: "Lỗi",
          description: "Không có dữ liệu để cập nhật.",
          status: "error",
        });
        setLoading(false);
        return;
      }

      const originalAnswers = originalQuestionData.DapAn || [];
      const editableAnswers = editableQuestionData.DapAn || [];

      // Giả sử chỉ có một đáp án như trong cấu trúc dữ liệu bạn cung cấp
      const originalAnswer = originalAnswers[0];
      const editableAnswer = editableAnswers[0];

      if (originalAnswer && editableAnswer) {
        const originalIdeas = originalAnswer.YChinh || [];
        const editableIdeas = editableAnswer.YChinh || [];

        // Lặp qua từng ý chính trong dữ liệu có thể chỉnh sửa
        for (const editableIdea of editableIdeas) {
          const originalIdea = originalIdeas.find(
            (idea) => idea.MaID === editableIdea.MaID
          );

          // Kiểm tra xem NộiDung hoặc TyLeDiem của ý chính có thay đổi không
          if (
            !originalIdea || // Trường hợp ý chính mới thêm (cần logic xử lý thêm mới nếu có)
            editableIdea.NoiDung !== originalIdea.NoiDung ||
            editableIdea.TyLeDiem !== originalIdea.TyLeDiem
          ) {
            // Nếu có thay đổi, thêm promise gọi API updateIdeas vào mảng
            updates.push(
              updateIdeas(editableIdea.MaID, {
                NoiDung: editableIdea.NoiDung,
                TyLeDiem: editableIdea.TyLeDiem,
              })
            );
          }

          const originalSubQs = originalIdea?.CauHoiBoSung || [];
          const editableSubQs = editableIdea.CauHoiBoSung || [];

          // Lặp qua từng câu hỏi bổ sung trong ý chính hiện tại
          // Chỉ xử lý các câu hỏi bổ sung có sẵn trong dữ liệu gốc
          for (const editableSubQ of editableSubQs) {
            const originalSubQ = originalSubQs.find(
              (subq) => subq.MaCauBoSung === editableSubQ.MaCauBoSung
            );

            if (originalSubQ) {
              // Chỉ kiểm tra nếu câu hỏi bổ sung tồn tại trong dữ liệu gốc
              // Kiểm tra xem NộiDung hoặc DapAnBoSung của câu hỏi bổ sung có thay đổi không
              if (
                editableSubQ.NoiDung !== originalSubQ.NoiDung ||
                editableSubQ.DapAnBoSung !== originalSubQ.DapAnBoSung
              ) {
                // Nếu có thay đổi, thêm promise gọi API updateSubQnA vào mảng
                updates.push(
                  updateSubQnA(editableSubQ.MaCauBoSung, {
                    NoiDung: editableSubQ.NoiDung,
                    DapAnBoSung: editableSubQ.DapAnBoSung,
                  })
                );
              }
            } else {
              // Xử lý trường hợp câu hỏi bổ sung mới thêm (nếu có logic thêm mới)
              console.log(
                "Logic xử lý thêm mới câu hỏi bổ sung ở đây:",
                editableSubQ
              );
            }
          }
          // TODO: Bổ sung logic xử lý các câu hỏi bổ sung đã bị xóa nếu cần
        }
        // TODO: Bổ sung logic xử lý các ý chính đã bị xóa nếu cần
      }

      // Chỉ chờ tất cả các promise cập nhật hoàn thành nếu có bất kỳ thay đổi nào
      if (updates.length > 0) {
        await Promise.all(updates);
        toast({
          title: "Thành công",
          description: `${updates.length} mục đã được cập nhật thành công`, // Thông báo số mục được cập nhật
          status: "success",
        });
        // Cập nhật dữ liệu gốc sau khi lưu thành công để các lần chỉnh sửa tiếp theo so sánh đúng
        setOriginalQuestionData(
          JSON.parse(JSON.stringify(editableQuestionData))
        );
      } else {
        toast({
          title: "Không có thay đổi",
          description: "Không có mục nào cần cập nhật",
          status: "info", // Thông báo không có gì thay đổi
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật câu hỏi:", error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật câu hỏi.",
        status: "error",
      });
      setLoading(false);
    }
  };

  // Sử dụng dữ liệu có thể chỉnh sửa để render bảng
  const keyPointsToRender = editableQuestionData?.DapAn?.[0]?.YChinh || [];

  if (loading) {
    return (
      <Center minH="200px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
      </Center>
    );
  }

  // Nếu không có dữ liệu thì báo lỗi
  if (!questionDetailData) {
    return (
      <Box
        minH="100vh"
        bg="background"
        p={8}
        fontFamily="Inter, sans-serif"
        color="textPrimary"
      >
        <Text color="error.500">Không tìm thấy dữ liệu câu hỏi.</Text>
      </Box>
    );
  }

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
            Chi tiết câu hỏi {maCauHoi}
          </Heading>
        </Center>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={4}
        mb={2}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <QuestionLevelBox easy={easy} medium={medium} hard={hard} />
        <Box w="100%" mt={4}>
          <Text
            fontWeight="semibold"
            mb={1}
            color="textSecondary"
            fontSize="sm"
          >
            Câu hỏi:
          </Text>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={questionRef}
            borderRadius="md"
            bg="background"
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

          <Text
            fontWeight="semibold"
            mt={4}
            mb={1}
            color="textSecondary"
            fontSize="sm"
          >
            Đáp án:
          </Text>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            isReadOnly={!isEdit}
            resize="vertical"
            ref={answerRef}
            borderRadius="md"
            bg="background"
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
        {isEdit && (
          <Flex justify="flex-end" w="100%" mt={4}>
            <Button
              colorScheme="accent"
              borderRadius="md"
              px={8}
              onClick={handleUpdateQuestion}
            >
              Lưu
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
        py={6}
        mt={8}
      >
        <Table variant="simple" size="md">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ý chính
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Điểm số
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Câu hỏi bổ sung
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Đáp án câu bổ sung
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {keyPointsToRender.map((row, index) => (
              <Tr key={row?.MaID || index} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{index + 1}</Td>
                <Td>
                  <Textarea
                    value={row?.NoiDung || ""}
                    onChange={(e) => handleIdeaChange(row.MaID, e.target.value)}
                    isReadOnly={!isEdit}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    borderRadius="md"
                    bg="background"
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
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row?.TyLeDiem || 0}
                    onChange={(e) =>
                      handleIdeaScoreChange(row.MaID, e.target.value)
                    }
                    min={0}
                    isReadOnly={!isEdit}
                    borderRadius="md"
                    bg="background"
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
                </Td>
                <Td colSpan={2}>
                  {row?.CauHoiBoSung?.length > 0 ? (
                    row.CauHoiBoSung.map((cbs, i) => (
                      <Flex
                        key={cbs?.MaCauBoSung || i}
                        gap={2}
                        mb={2}
                        align="flex-start"
                      >
                        <Box flex={1}>
                          <Textarea
                            value={cbs?.NoiDung || ""}
                            onChange={(e) =>
                              handleSubQContentChange(
                                row.MaID,
                                cbs.MaCauBoSung,
                                e.target.value
                              )
                            }
                            mb={1}
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            borderRadius="md"
                            bg="background"
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
                        <Box flex={1}>
                          <Textarea
                            value={cbs?.DapAnBoSung || ""}
                            onChange={(e) =>
                              handleSubQAnswerChange(
                                row.MaID,
                                cbs.MaCauBoSung,
                                e.target.value
                              )
                            }
                            onInput={(e) => {
                              const target = e.currentTarget;
                              target.style.height = "auto";
                              target.style.height = `${target.scrollHeight}px`;
                            }}
                            borderRadius="md"
                            bg="background"
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
                      </Flex>
                    ))
                  ) : (
                    <Text color="gray.400" fontStyle="italic">
                      Không có
                    </Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {isEdit && (
          <Flex justify="flex-end" w="100%" mt={4}>
            <Button
              colorScheme="accent"
              borderRadius="md"
              px={8}
              onClick={handleSubQuestion}
            >
              Lưu
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default QuestionDetail;
