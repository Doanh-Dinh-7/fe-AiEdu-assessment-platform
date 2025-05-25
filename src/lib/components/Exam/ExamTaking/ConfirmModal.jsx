import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, isLoading }) => (
  <Modal isOpen={isOpen} onClose={onCancel} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader color="textPrimary" fontWeight="bold">
        Xác nhận trả lời
      </ModalHeader>
      <ModalBody color="textSecondary">
        Bạn có chắc chắn muốn gửi câu trả lời này?
      </ModalBody>
      <ModalFooter>
        <Button
          isLoading={isLoading}
          colorScheme="green"
          mr={3}
          onClick={onConfirm}
        >
          Xác nhận
        </Button>
        <Button colorScheme="red" onClick={onCancel}>
          Hủy
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmModal;
