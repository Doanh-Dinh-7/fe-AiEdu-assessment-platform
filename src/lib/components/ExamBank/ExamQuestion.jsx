import {
  Box,
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
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionLevelBox from "./QuestionLevelBox";
import { getQuestionList } from "../../service/question"; // Đường dẫn đúng tới hàm API

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

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="primary" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="#F2F4F8"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="20px"
            mb={2}
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Câu hỏi {tenChuong}
          </Heading>
        </Center>
        <Flex justify="flex-end">
          <Button
            bg="#4A90E2"
            color="#fff"
            borderRadius="999px"
            px={8}
            py={2}
            fontWeight="bold"
            fontSize="16px"
            boxShadow="0 2px 8px rgba(74,144,226,0.08)"
            _hover={{ bg: "#357ABD" }}
            onClick={() =>
              navigate(`${location.pathname}/create-question`, {
                state: {
                  easy: countLevel("dễ"),
                  medium: countLevel("trung bình"),
                  hard: countLevel("khó"),
                },
              })
            }
          >
            Tạo câu hỏi
          </Button>
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
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
        py={6}
        mt={8}
      >
        <Table
          variant="simple"
          bg="transparent"
          borderRadius="12px"
          overflow="hidden"
        >
          <Thead bg="#F2F4F8">
            <Tr>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Câu hỏi
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Mức độ
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Ngày tạo
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionData.map((q, idx) => (
              <Tr
                key={q.MaCauHoi}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{idx + 1}</Td>
                <Td color="#1C1C1C" whiteSpace="pre-wrap" w="50%">
                  {q.NoiDung}
                </Td>
                <Td color="#1C1C1C">{q.MucDo}</Td>
                <Td color="#1C1C1C">{q.NgayTao}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEye />}
                    size="sm"
                    borderRadius="999px"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() => handleNavigateQuestion(q, "view")}
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
                    variant="ghost"
                    onClick={() => handleNavigateQuestion(q, "edit")}
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    ml={2}
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
