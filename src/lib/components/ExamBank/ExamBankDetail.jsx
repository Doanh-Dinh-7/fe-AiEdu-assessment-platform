import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  IconButton,
  Center,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCourseDetail } from "../../controller/course";
import { deleteChapter, updateChapter } from "../../controller/chapter";

// const data = [
//   {
//     stt: 1,
//     chuong: "Kinh tế chính trị là gì?",
//     tongCauHoi: 10,
//     ngayTao: "12/04/2025",
//   },
//   {
//     stt: 2,
//     chuong: "Tư bản và công dân",
//     tongCauHoi: 10,
//     ngayTao: "13/04/2025",
//   },
//   { stt: 3, chuong: "Hàng hóa", tongCauHoi: 10, ngayTao: "14/04/2025" },
//   {
//     stt: 4,
//     chuong: "Trao đổi hàng hóa",
//     tongCauHoi: 10,
//     ngayTao: "15/04/2025",
//   },
// ];

// const sumChuong = data.length;
// const sumCauHoi = data.reduce((acc, cur) => acc + cur.tongCauHoi, 0);
// const moTa = `
// Sao lại gọi là bản thân mình, không chỉ là Cộng sự, vì rằng người suy nghĩ có thể vậy, tiếp xúc nhiều, từ thái độ sự rạn nứt cũng biến hóa theo.
// Mọi người tranh ngại các câu hỏi, sẽ thấy bộ đề thi đang rất thiếu hụt nếu không có sự bổ sung. Quản trị ngân hàng đề thi là bộ não của hệ thống học tập, bộ đề vẫn muốn giữ ở chất tối.
// Lần đầu tiên khi tạo đề thi, hãy cố gắng để tỷ lệ đề thi các chương, xem xét bộ đề đang phân chia mức độ hợp lý. Bộ thầy là một mắt điều cần giữ khi ra đề bài: Đủ các hệ thống cơ tay, không thể nuốt nổi, đề bài ngắn, tỷ lệ câu hỏi, suất độ đạt đúng như ruốc mắt.
// `;

const ExamBankDetail = () => {
  const { maHocPhan } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [courseDetail, setCourseDetail] = useState({});
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [newChapterName, setNewChapterName] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getCourseDetail(maHocPhan);
        if (!data) {
          throw new Error("Failed to get chapter");
        }
        setCourseDetail(data);
      } catch (error) {
        toast({
          title: "Lấy chi tiết học phần thất bại",
          description: "Có lỗi xảy ra khi lấy chi tiết học phần này.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [maHocPhan, toast]);

  const { ThongTinHocPhan, ThongKeMucDo, DanhSachChuong } = courseDetail;
  const soCauHoiDaCo = DanhSachChuong?.reduce(
    (acc, cur) => acc + (cur.SoCauHoi || 0),
    0
  );

  const openEditModal = (chuong) => {
    setSelectedChapter(chuong);
    setNewChapterName(chuong.TenChuong);
    setIsOpen(true);
  };

  const handleUpdateNameChapter = async () => {
    if (!selectedChapter) return;
    const formData = new FormData();
    formData.append("ten_chuong_moi", newChapterName);

    try {
      const data = await updateChapter(
        maHocPhan,
        selectedChapter.MaChuong,
        formData
      );

      if (!data) {
        throw new Error("Failed to update chapter");
      }
      setIsOpen(false);
      toast({
        title: "Cập nhật chương thành công",
        description: `Đã cập nhật tên chương thành công.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setCourseDetail((prev) => ({
        ...prev,
        DanhSachChuong: prev.DanhSachChuong.map((chuong) =>
          chuong.MaChuong === selectedChapter.MaChuong
            ? { ...chuong, TenChuong: newChapterName }
            : chuong
        ),
      }));
    } catch (error) {
      toast({
        title: "Cập nhật chương thất bại",
        description: "Có lỗi xảy ra khi cập nhật tên chương.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleDeleteChapter = async (chuong) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa chương ${chuong.TenChuong} này không?`
    );
    if (confirmDelete) {
      try {
        const data = await deleteChapter(maHocPhan, chuong.MaChuong);

        if (!data) {
          throw new Error("Failed to delete chapter");
        }
        setIsOpen(false);
        toast({
          title: "Xoá chương thành công",
          description: `Đã Xoá chương thành công.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCourseDetail((prev) => ({
          ...prev,
          DanhSachChuong: prev.DanhSachChuong.filter(
            (chuongs) => chuongs.MaChuong !== chuong.MaChuong
          ),
        }));
      } catch (error) {
        toast({
          title: "Xoá chương thất bại",
          description: "Có lỗi xảy ra khi Xoá chương.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      }
    }
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="#4A90E2" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="#F2F4F8"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="20px"
            mb={2}
            textTransform="uppercase"
            color="#4A90E2"
            letterSpacing={1}
          >
            Chi tiết ngân hàng đề thi {ThongTinHocPhan.TenHocPhan}
          </Heading>
        </Center>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={4}
        mb={2}
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={8}
        py={5}
      >
        <Flex wrap="wrap" gap={4} align="center">
          <Text fontWeight="bold">Học phần:</Text>
          <Input
            value={ThongTinHocPhan.TenHocPhan}
            size="sm"
            w="180px"
            isReadOnly
            bg="#F2F4F8"
            borderRadius="12px"
            fontWeight="medium"
            color="#1C1C1C"
          />
          <Text fontWeight="bold">Số tín chỉ:</Text>
          <Input
            value={ThongTinHocPhan.SoTinChi}
            size="sm"
            w="60px"
            isReadOnly
            bg="#F2F4F8"
            borderRadius="12px"
            fontWeight="medium"
            color="#1C1C1C"
          />
          <Text fontWeight="bold">Số chương:</Text>
          <Input
            value={ThongTinHocPhan.SoChuong}
            size="sm"
            w="60px"
            isReadOnly
            bg="#F2F4F8"
            borderRadius="12px"
            fontWeight="medium"
            color="#1C1C1C"
          />
        </Flex>
        <Flex wrap="wrap" gap={4} align="center">
          <Text fontWeight="bold">Tổng số câu hỏi:</Text>
          <Input
            value={ThongTinHocPhan.TongSoCau}
            size="sm"
            w="80px"
            isReadOnly
            bg="#F2F4F8"
            borderRadius="12px"
            fontWeight="medium"
            color="#1C1C1C"
          />
          <Text fontWeight="bold">Số câu hỏi đã có:</Text>
          <Input
            value={soCauHoiDaCo}
            size="sm"
            w="80px"
            isReadOnly
            bg="#F2F4F8"
            borderRadius="12px"
            fontWeight="medium"
            color="#1C1C1C"
          />
          <Text fontWeight="bold">Mức độ:</Text>
          <Badge colorScheme="green">Dễ: {ThongKeMucDo.De}</Badge>
          <Badge colorScheme="blue">TB: {ThongKeMucDo.TrungBinh}</Badge>
          <Badge colorScheme="red">Khó: {ThongKeMucDo.Kho}</Badge>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Mô tả:</Text>
          <Text
            bg="#F2F4F8"
            p={3}
            borderRadius="12px"
            fontSize="sm"
            color="#1C1C1C"
            whiteSpace="pre-line"
          >
            {ThongTinHocPhan.MoTaHocPhan}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        bg="#FFFFFF"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.08)"
        px={6}
        py={6}
        mt={8}
      >
        <Table
          variant="simple"
          size="md"
          bg="transparent"
          borderRadius="12px"
          overflow="hidden"
        >
          <Thead bg="#F2F4F8">
            <Tr>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Chương
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Tổng số câu hỏi
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Ngày tạo
              </Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {DanhSachChuong.map((chuong, index) => (
              <Tr
                key={chuong.MaChuong}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{index + 1}</Td>
                <Td color="#1C1C1C">{chuong.TenChuong}</Td>
                <Td color="#1C1C1C">{chuong.SoCauHoi}</Td>
                <Td color="#1C1C1C">{chuong.NgayTao}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEye />}
                    size="sm"
                    borderRadius="999px"
                    bg="#E3F0FC"
                    color="#4A90E2"
                    fontWeight="bold"
                    _hover={{ bg: "#B3D6F7" }}
                    variant="ghost"
                    onClick={() =>
                      navigate(`${location.pathname}/${chuong.MaChuong}`)
                    }
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaUpload />}
                    size="sm"
                    borderRadius="999px"
                    bg="#E6E6FA"
                    color="#6C63FF"
                    fontWeight="bold"
                    _hover={{ bg: "#CFCFFF" }}
                    variant="ghost"
                    onClick={() =>
                      navigate(
                        `${location.pathname}/${chuong.MaChuong}/upload-document-exam`
                      )
                    }
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FFF7E0"
                    color="#FBBC05"
                    fontWeight="bold"
                    _hover={{ bg: "#FFE6A1" }}
                    variant="ghost"
                    onClick={() => openEditModal(chuong)}
                  />
                </Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteChapter(chuong)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent borderRadius="12px">
          <ModalHeader>
            Đổi tên chương: {selectedChapter?.TenChuong}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              placeholder="Nhập tên chương mới"
              borderRadius="12px"
              bg="#F2F4F8"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#4A90E2"
              color="#fff"
              borderRadius="999px"
              px={8}
              fontWeight="bold"
              fontSize="16px"
              boxShadow="0 2px 8px rgba(74,144,226,0.08)"
              _hover={{ bg: "#357ABD" }}
              mr={3}
              onClick={handleUpdateNameChapter}
            >
              Lưu
            </Button>
            <Button
              variant="ghost"
              borderRadius="999px"
              onClick={() => setIsOpen(false)}
            >
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ExamBankDetail;
