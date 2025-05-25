// lib/components/Exam/ExamTaking/ChatArea.jsx
import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Textarea, IconButton } from "@chakra-ui/react";
import { speechToText } from "../../../service/speechToText";
import PropTypes from "prop-types";
import useAutoResizeTextarea from "../../../hooks/useAutoResizeTextarea";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const { textareaRef } = useAutoResizeTextarea(input);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
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
        w={3}
        h={3}
        borderRadius="full"
        bg="error.500"
        animation="blinker 1s linear infinite"
        mr={2}
      />
      <Text color="error.500" fontWeight="bold" fontSize="sm">
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
      ref={ref}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      flex="1"
      h={{ base: "60vh", md: "80vh" }}
      minH="320px"
      maxH="80vh"
      bg="surface"
      borderRadius="md"
      boxShadow="md"
      p={{ base: 2, md: 4 }}
    >
      <Box flex={1} overflowY="auto" mb={4} px={2}>
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Flex
              justify={msg.sender === "user" ? "flex-end" : "flex-start"}
              mb={3}
            >
              <Box
                bg={msg.sender === "user" ? "brand.100" : "gray.100"}
                px={4}
                py={2}
                borderRadius="xl"
                maxW="70%"
                boxShadow="sm"
              >
                <Text fontSize="md">{msg.text}</Text>
                <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                  {msg.time}
                </Text>
              </Box>
            </Flex>
          </motion.div>
        ))}
      </Box>

      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled) onSend();
        }}
        alignItems="flex-end"
        mt={4}
      >
        <Textarea
          ref={textareaRef}
          placeholder="Nhập câu trả lời..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          isDisabled={disabled}
          maxH="40vh"
        />
        {isRecording && <RecordingIndicator />}
        <IconButton
          ml={2}
          colorScheme={isRecording ? "red" : "teal"}
          isLoading={loading}
          onClick={handleSpeechToText}
          type="button"
          isDisabled={disabled}
          borderRadius="md"
          fontWeight="medium"
          icon={isRecording ? <FaStop /> : <FaMicrophone />}
          aria-label={isRecording ? "Kết thúc ghi âm" : "Bắt đầu ghi âm"}
          _active={{
            transform: "scale(0.95)",
            bgColor: isRecording ? "red.600" : "teal.600",
          }}
        />
        <IconButton
          type="submit"
          ml={2}
          bg="accent.500"
          _hover={{ bg: "accent.600" }}
          _active={{
            transform: "scale(0.95)",
            bgColor: "accent.600",
          }}
          isDisabled={disabled}
          borderRadius="md"
          fontWeight="medium"
        >
          <Box as="span" colorScheme="accent" fontSize="xl">
            &#8593;
          </Box>
        </IconButton>
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
