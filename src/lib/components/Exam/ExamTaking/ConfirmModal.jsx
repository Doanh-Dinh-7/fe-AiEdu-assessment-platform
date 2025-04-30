import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal isOpen={isOpen} onClose={onCancel} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Xác nhận trả lời</ModalHeader>
      <ModalBody>Bạn có chắc chắn muốn gửi câu trả lời này?</ModalBody>
      <ModalFooter>
        <Button colorScheme="green" mr={3} onClick={onConfirm}>
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
