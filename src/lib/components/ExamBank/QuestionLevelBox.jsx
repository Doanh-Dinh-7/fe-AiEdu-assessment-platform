import { Badge, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const QuestionLevelBox = ({ easy, medium, hard }) => (
  <Flex
    position="fixed"
    top={20}
    right={10}
    bg="surface"
    boxShadow="md"
    borderRadius="md"
    p={2}
    zIndex={1000}
    minW="220px"
    alignItems="center"
    justifyContent="center"
    gap={2}
  >
    <Text fontWeight="semibold" fontSize="sm" color="textPrimary">
      Hiện tại:
    </Text>
    <Badge colorScheme="green" px={2} py={1} borderRadius="md" fontSize="xs">
      Dễ: {easy}
    </Badge>
    <Badge colorScheme="blue" px={2} py={1} borderRadius="md" fontSize="xs">
      TB: {medium}
    </Badge>
    <Badge colorScheme="red" px={2} py={1} borderRadius="md" fontSize="xs">
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
