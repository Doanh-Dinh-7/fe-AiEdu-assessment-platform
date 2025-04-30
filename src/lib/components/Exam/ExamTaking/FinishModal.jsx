import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const FinishModal = ({ isOpen, onConfirm }) => (
  <Modal isOpen={isOpen} onClose={() => {}} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Xác nhận hoàn thành bài thi</ModalHeader>
      <ModalBody>
        Vui lòng kiểm tra câu trả lời và xác nhận hoàn thành bài thi
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="green" onClick={onConfirm}>
          Xác nhận
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default FinishModal;
