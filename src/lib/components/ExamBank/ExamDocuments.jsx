import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddDocumentModal from "./AddDocumentModal ";
import { getDocumentChapter, updateChapter } from "../../controller/chapter";

// const initialDocs = [
//   { stt: 1, name: "Nắng ấm xa dần", date: "16/02/2025" },
//   { stt: 2, name: "Con mưa ngang qua", date: "16/02/2025" },
//   { stt: 3, name: "Buông đôi tay nhau ra", date: "16/02/2025" },
// ];

const ExamDocuments = () => {
  const { maHocPhan, maChuong } = useParams();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const data = await getDocumentChapter(maHocPhan, maChuong);
        if (!data) {
          throw new Error("Failed to get chapter's document");
        }
        setDocs(data.documents);
      } catch (error) {
        toast({
          title: "Lỗi khi lấy danh sách tài liệu",
          description:
            "Không thể lấy dữ liệu tài liệu chương. Vui lòng thử lại!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    if (maHocPhan && maChuong) fetchDocs();
  }, [maHocPhan, maChuong, toast]);

  const handleDelete = async (maTaiLieu) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa học phần ${maTaiLieu} này không?`
    );
    if (confirmDelete) {
      const filesData = new FormData();
      filesData.append("xoa_tai_lieu_ids", maTaiLieu);
      try {
        const data = await updateChapter(maHocPhan, maChuong, filesData);
        if (!data) {
          throw new Error("Failed to update chapter");
        }
        setIsOpen(false);
        // if (setShowProgress) setShowProgress(true);
        toast({
          title: "Xoá tài liệu chương thành công",
          description: "Đã xoá tài liệu chương thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setDocs(docs.filter((doc) => doc.MaTaiLieu !== maTaiLieu));
      } catch (error) {
        toast({
          title: "Xoá tài liệu thất bại",
          description: "Có lỗi xảy ra khi xoá tài liệu chương.",
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
    </Center>
  ) : (
    <Box minH="100vh" direction="column" bg="#F5F9FF" pt={5}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Flex w="100%" justify="space-between" align="center" mb={4}>
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              Danh sách tài liệu chương
            </Heading>
          </Center>
          <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
            Thêm tài liệu
          </Button>
        </Flex>
        <Table variant="simple" size="md" w="50vw" bg="white">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Tài liệu</Th>
              <Th>Ngày tạo</Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {docs.map((doc, idx) => (
              <Tr key={doc.MaTaiLieu}>
                <Td>{idx + 1}</Td>
                <Td>{doc.TenTaiLieu}</Td>
                <Td>{doc.NgayTao}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    ml={2}
                    onClick={() => handleDelete(doc.MaTaiLieu)}
                  >
                    Xóa
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>

      {/* Modal thêm tài liệu */}
      <AddDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maHocPhan={maHocPhan}
        maChuong={maChuong}
        setIsOpen={setIsOpen}
        updateChapter={updateChapter}
      />
    </Box>
  );
};

export default ExamDocuments;
