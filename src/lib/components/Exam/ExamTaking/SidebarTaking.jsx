// SidebarTaking.jsx
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

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
  onFinish,
  isConfirming,
}) => (
  <Box
    bg="surface"
    borderRadius="12px"
    p={4}
    minW="260px"
    maxW="260px"
    h="80vh"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    boxShadow="0 2px 6px rgba(0,0,0,0.08)"
    fontFamily="Inter, sans-serif"
  >
    <div>
      <Text
        mb={4}
        fontWeight="bold"
        fontSize="18px"
        textTransform="uppercase"
        color="primary"
      >
        Bài thi {examName}
      </Text>

      <Text fontWeight="bold" mb={2} color="textSecondary">
        Thời gian còn lại:{" "}
        <Box
          as="span"
          bg="#e6eaf7"
          px={2}
          borderRadius="md"
          color="primary"
          fontWeight="bold"
        >
          {formatTime(timeLeft)}
        </Box>
      </Text>
      <Text fontWeight="bold" mb={2} color="textSecondary">
        Các câu hỏi
      </Text>
      <Flex gap={2} flexWrap="wrap">
        {questions.map((q, idx) => (
          <Button
            key={q.id}
            size="sm"
            bg={
              answered[idx]
                ? "#7CF17C"
                : current === idx
                ? "primary"
                : "#e6eaf7"
            }
            color={answered[idx] ? "#222" : current === idx ? "white" : "#222"}
            fontWeight="bold"
            borderRadius="12px"
            onClick={() => onSelect(idx)}
            boxShadow="0 2px 6px rgba(0,0,0,0.04)"
            _hover={{ bg: current === idx ? "primary" : "#dbeafe" }}
          >
            câu {idx + 1}
          </Button>
        ))}
      </Flex>
    </div>
    {!isConfirming && (
      <Button
        mt={6}
        variant="ghost"
        onClick={onFinish}
        w="100%"
        bg="transparent"
        color="error"
        fontWeight="bold"
        border="none"
        boxShadow="none"
        textDecoration="underline"
        borderRadius="12px"
        _hover={{ color: "error", bg: "#ffeaea" }}
      >
        Nộp bài
      </Button>
    )}
  </Box>
);

SidebarTaking.propTypes = {
  questions: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  answered: PropTypes.array.isRequired,
  timeLeft: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  examName: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
  isConfirming: PropTypes.bool,
};

export default SidebarTaking;
