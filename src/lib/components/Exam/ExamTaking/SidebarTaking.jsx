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
    borderRadius="md"
    p={4}
    minW="260px"
    maxW="260px"
    h="80vh"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    boxShadow="md"
    fontFamily="Inter, sans-serif"
  >
    <div>
      <Text
        mb={4}
        fontWeight="bold"
        fontSize="lg"
        textTransform="uppercase"
        color="brand.500"
      >
        Bài thi {examName}
      </Text>

      <Text fontWeight="medium" mb={2} color="textSecondary">
        Thời gian còn lại:{" "}
        <Box
          as="span"
          bg="warning.100"
          px={2}
          borderRadius="md"
          color="warning.500"
          fontWeight="bold"
        >
          {formatTime(timeLeft)}
        </Box>
      </Text>
      <Text fontWeight="medium" mb={2} color="textSecondary">
        Các câu hỏi
      </Text>
      <Flex gap={2} flexWrap="wrap">
        {questions.map((q, idx) => (
          <Button
            key={q.id}
            size="sm"
            bg={
              answered[idx]
                ? "accent.100"
                : current === idx
                ? "brand.500"
                : "gray.100"
            }
            color={
              answered[idx]
                ? "text.primary"
                : current === idx
                ? "white"
                : "text.primary"
            }
            fontWeight="medium"
            borderRadius="md"
            onClick={() => onSelect(idx)}
            boxShadow="sm"
            _hover={{
              bg: current === idx ? "brand.600" : "gray.200",
            }}
          >
            câu {idx + 1}
          </Button>
        ))}
      </Flex>
    </div>
    {!isConfirming && (
      <Button
        mt={6}
        variant="link"
        colorScheme="error"
        onClick={onFinish}
        w="100%"
        fontWeight="medium"
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
