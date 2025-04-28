import { Badge, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const QuestionLevelBox = ({ easy, medium, hard }) => (
  <Flex
    position="fixed"
    top="32px"
    right="32px"
    bg="white"
    boxShadow="md"
    borderRadius="md"
    p={2}
    zIndex={1000}
    minW="220px"
    alignItems="center"
    justifyContent="center"
    gap={2}
  >
    <Text fontWeight="bold">Hiện tại:</Text>
    <Badge colorScheme="green" px={2} py={1}>
      Dễ: {easy}
    </Badge>
    <Badge colorScheme="blue" px={2} py={1}>
      TB: {medium}
    </Badge>
    <Badge colorScheme="red" px={2} py={1}>
      Khó: {hard}
    </Badge>
  </Flex>
);

QuestionLevelBox.propTypes = {
  easy: PropTypes.number.isRequired,
  medium: PropTypes.number.isRequired,
  hard: PropTypes.number.isRequired,
};

export default QuestionLevelBox;
