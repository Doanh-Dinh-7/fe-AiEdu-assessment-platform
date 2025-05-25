import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react";

const FinishModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal isOpen={isOpen} onClose={() => {}} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader color="textPrimary" fontWeight="bold">
        Xác nhận hoàn thành bài thi
      </ModalHeader>
      <ModalBody color="textSecondary">
        Vui lòng kiểm tra câu trả lời và xác nhận hoàn thành bài thi
      </ModalBody>
      <ModalFooter>
        <Flex justify="space-between" w="100%">
          <Button colorScheme="red" onClick={onCancel}>
            Huỷ
          </Button>
          <Button colorScheme="green" onClick={onConfirm}>
            Xác nhận
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default FinishModal;
