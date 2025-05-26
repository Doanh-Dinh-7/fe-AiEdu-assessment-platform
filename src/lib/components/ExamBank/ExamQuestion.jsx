import {
  // Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Center,
  Spinner,
  IconButton,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionLevelBox from "./QuestionLevelBox";
import { deleteQuestion, getQuestionList } from "../../service/question"; // Đường dẫn đúng tới hàm API

// const questionData = [
//   {
//     stt: 1,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Dễ",
//     createdAt: "12/04/2025",
//   },
//   {
//     stt: 2,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Trung bình",
//     createdAt: "12/04/2025",
//   },
//   {
//     stt: 3,
//     content:
//       "Nếu là cây là cây cao to là câu nói của ai, thể hiện lý tưởng gì và như thế nào",
//     level: "Khó",
//     createdAt: "12/04/2025",
//   },
// ];

const ExamQuestion = () => {
  const { maChuong } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tenChuong, setTenChuong] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!maChuong) return;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getQuestionList(maChuong);
        setTenChuong(data.TenChuong);
        setQuestionData(data.CauHoi);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [maChuong]);

  const countLevel = (MucDo) =>
    questionData.filter((q) => q.MucDo === MucDo).length;

  const handleNavigateQuestion = (q, mode) => {
    navigate(`${location.pathname}/${q.MaCauHoi}`, {
      state: {
        mode,
        questionDetailData: q,
        easy: countLevel("dễ"),
        medium: countLevel("trung bình"),
        hard: countLevel("khó"),
      },
    });
  };

  const handleDeleteQuestion = async (MaCauHoi) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?");
    if (confirm) {
      try {
        const res = await deleteQuestion(MaCauHoi);
        if (!res) {
          throw new Error("Lỗi khi xóa câu hỏi");
        }
        toast({
          title: "Thành công",
          description: "Câu hỏi đã được xóa thành công",
          status: "success",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
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
            Câu hỏi {tenChuong}
          </Heading>
        </Center>
        <Flex justify="flex-end">
          {/* <Button
            colorScheme="brand"
            borderRadius="md"
            px={8}
            py={2}
            fontWeight="semibold"
            fontSize="md"
            boxShadow="md"
          >
            Tạo câu hỏi
          </Button> */}
          <IconButton
            icon={<span style={{ fontSize: 18, marginRight: 4 }}>＋</span>}
            colorScheme="brand"
            borderRadius="full"
            px={8}
            py={2}
            fontWeight="bold"
            fontSize="md"
            boxShadow="md"
            onClick={() =>
              navigate(`${location.pathname}/create-question`, {
                state: {
                  easy: countLevel("dễ"),
                  medium: countLevel("trung bình"),
                  hard: countLevel("khó"),
                },
              })
            }
            _active={{
              transform: "scale(0.98)",
              bgColor: "brand.600",
            }}
            variant="ghost"
            aria-label="Thêm"
          />
        </Flex>
      </Flex>

      {/* Box cố định hiển thị số câu hỏi theo cấp độ */}
      <QuestionLevelBox
        easy={countLevel("dễ")}
        medium={countLevel("trung bình")}
        hard={countLevel("khó")}
      />
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
                Câu hỏi
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Mức độ
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ngày tạo
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionData.map((q, idx) => (
              <Tr key={q.MaCauHoi} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{idx + 1}</Td>
                <Td color="textPrimary" whiteSpace="pre-wrap" w="50%">
                  {q.NoiDung}
                </Td>
                <Td color="textPrimary">
                  <Badge
                    colorScheme={
                      q.MucDo === "dễ"
                        ? "green"
                        : q.MucDo === "trung bình"
                        ? "blue"
                        : "red"
                    }
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {q.MucDo}
                  </Badge>
                </Td>
                <Td color="textPrimary">{q.NgayTao}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEye />}
                    size="sm"
                    borderRadius="full"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() => handleNavigateQuestion(q, "view")}
                    aria-label="Xem chi tiết"
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    borderRadius="full"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
                    variant="ghost"
                    onClick={() => handleNavigateQuestion(q, "edit")}
                    aria-label="Sửa câu hỏi"
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="full"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteQuestion(q.MaCauHoi)}
                    aria-label="Xóa câu hỏi"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};

export default ExamQuestion;
