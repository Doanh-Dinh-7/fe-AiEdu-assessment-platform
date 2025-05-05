// SidebarTaking.jsx
import { Box, Button, Flex, Text } from "@chakra-ui/react";

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const SidebarTaking = ({
  questions,
  current,
  answered,
  timeLeft,
  onSelect,
  examName,
}) => (
  <Box bg="white" borderRadius="md" p={4} minW="260px" maxW="260px" h="80vh">
    <Text mb={4} fontWeight="bold" fontSize="lg" textTransform="uppercase">
      Bài thi {examName}
    </Text>

    <Text fontWeight="bold" mb={2}>
      Thời gian còn lại:{" "}
      <Box as="span" bg="#e6eaf7" px={2} borderRadius="md">
        {formatTime(timeLeft)}
      </Box>
    </Text>
    <Text fontWeight="bold" mb={2}>
      Các câu hỏi
    </Text>
    <Flex gap={2} flexWrap="wrap">
      {questions.map((q, idx) => (
        <Button
          key={q.id}
          size="sm"
          bg={
            answered[idx] ? "#7CF17C" : current === idx ? "#e6eaf7" : "#e6eaf7"
          }
          color="#222"
          fontWeight="bold"
          borderRadius="md"
          onClick={() => onSelect(idx)}
        >
          câu {idx + 1}
        </Button>
      ))}
    </Flex>
  </Box>
);

export default SidebarTaking;
