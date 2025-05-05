// lib/components/Exam/ExamTaking/ChatArea.jsx
import { useEffect, useRef } from "react";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";

const ChatArea = ({
  messages,
  onSend,
  input,
  setInput,
  disabled,
  isPracticeMode,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      h="80vh"
    >
      <Box ref={ref} flex={1} overflowY="auto" mb={2} px={2}>
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
      >
        <Input
          placeholder="Nhập câu trả lời..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          isDisabled={disabled}
          bg="white"
        />
        <Button type="submit" ml={2} colorScheme="blue" isDisabled={disabled}>
          <Box as="span" fontSize="xl">
            &#8593;
          </Box>
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatArea;
