// lib/components/Exam/ExamTaking/ChatArea.jsx
import { useEffect, useRef, useState } from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { speechToText } from "../../../controller/speechToText";
import PropTypes from "prop-types";

const ChatArea = ({
  messages,
  onSend,
  input,
  setInput,
  disabled,
  maCuocThi,
}) => {
  const ref = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  // Hàm xử lý ghi âm
  const handleSpeechToText = async () => {
    setLoading(true);
    try {
      const res = await speechToText(maCuocThi); // truyền mã cuộc thi thực tế nếu có
      if (res.is_recording) {
        setIsRecording(true);
      } else {
        setIsRecording(false);
        if (res.result) setInput(res.result.text);
      }
    } catch {
      setIsRecording(false);
    }
    setLoading(false);
  };

  // Hiệu ứng chấm đỏ nhấp nháy khi ghi âm
  const RecordingIndicator = () => (
    <Box display="flex" alignItems="center" ml={2}>
      <Box
        as="span"
        w="12px"
        h="12px"
        borderRadius="full"
        bg="red.500"
        animation="blinker 1s linear infinite"
        mr={2}
      />
      <Text color="red.500" fontWeight="bold" fontSize="sm">
        Đang ghi âm...
      </Text>
      <style>{`
        @keyframes blinker {
          50% { opacity: 0; }
        }
      `}</style>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      h={{ base: "60vh", md: "70vh" }}
      minH="320px"
      maxH="70vh"
      bg="surface"
      borderRadius="12px"
      boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      p={{ base: 2, md: 4 }}
    >
      <Box
        ref={ref}
        flex={1}
        overflowY="auto"
        mb={2}
        px={2}
        maxH={{ base: "40vh", md: "50vh" }}
        minH="180px"
        transition="max-height 0.2s"
      >
        {messages.map((msg, idx) => (
          <Flex
            key={idx}
            justify={msg.sender === "user" ? "flex-end" : "flex-start"}
            mb={3}
          >
            <Box
              bg={msg.sender === "user" ? "blue.100" : "gray.200"}
              px={4}
              py={2}
              borderRadius="xl"
              maxW="70%"
              boxShadow="md"
            >
              <Text fontSize="md">{msg.text}</Text>
              <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                {msg.time}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>

      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled) onSend();
        }}
        alignItems="center"
        mt={2}
      >
        <Input
          placeholder="Nhập câu trả lời..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          isDisabled={disabled}
          bg="white"
          borderRadius="12px"
          fontSize="15px"
        />
        {isRecording && <RecordingIndicator />}
        <Button
          ml={2}
          colorScheme={isRecording ? "red" : "teal"}
          isLoading={loading}
          onClick={handleSpeechToText}
          type="button"
          isDisabled={disabled}
          borderRadius="12px"
        >
          {isRecording ? "Kết thúc" : "Ghi âm"}
        </Button>
        <Button
          type="submit"
          ml={2}
          colorScheme="blue"
          isDisabled={disabled}
          borderRadius="12px"
        >
          <Box as="span" fontSize="xl">
            &#8593;
          </Box>
        </Button>
      </Flex>
    </Box>
  );
};

ChatArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string,
      text: PropTypes.string,
      time: PropTypes.string,
    })
  ).isRequired,
  onSend: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  maCuocThi: PropTypes.string,
};

export default ChatArea;
