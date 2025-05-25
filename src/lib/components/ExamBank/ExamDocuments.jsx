import {
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
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddDocumentModal from "./AddDocumentModal ";
import { getDocumentChapter, updateChapter } from "../../service/chapter";

// const initialDocs = [
//   { stt: 1, name: "Nắng ấm xa dần", date: "16/02/2025" },
//   { stt: 2, name: "Con mưa ngang qua", date: "16/02/2025" },
//   { stt: 3, name: "Buông đôi tay nhau ra", date: "16/02/2025" },
// ];

const ExamDocuments = () => {
  const { maHocPhan, maChuong } = useParams();
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

  const handleDeleteDocument = async (maTaiLieu) => {
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
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
    </Center>
  ) : (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="background"
      pt={8}
      fontFamily="Inter, sans-serif"
    >
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={8}
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={5}
      >
        <Center flex={1}>
          <Heading
            fontSize="xl"
            mb={2}
            textTransform="uppercase"
            color="brand.500"
            letterSpacing={1}
          >
            Danh sách tài liệu chương
          </Heading>
        </Center>
        <Button
          colorScheme="brand"
          borderRadius="md"
          px={8}
          fontWeight="semibold"
          fontSize="md"
          boxShadow="md"
          onClick={() => setIsOpen(true)}
          _active={{
            transform: "scale(0.98)",
            bgColor: "brand.600",
          }}
        >
          Thêm tài liệu
        </Button>
      </Flex>
      <Box
        w="100%"
        maxW="1200px"
        bg="surface"
        borderRadius="md"
        boxShadow="md"
        px={6}
        py={6}
      >
        <Table variant="simple" size="md">
          <Thead bg="background">
            <Tr>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                STT
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Tài liệu
              </Th>
              <Th fontWeight="bold" fontSize="sm" color="textSecondary">
                Ngày tạo
              </Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {docs.map((doc, idx) => (
              <Tr key={doc.MaTaiLieu} _hover={{ bg: "gray.50" }}>
                <Td color="textPrimary">{idx + 1}</Td>
                <Td color="textPrimary">{doc.TenTaiLieu}</Td>
                <Td color="textPrimary">{doc.NgayTao}</Td>
                <Td textAlign="center">
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    borderRadius="full"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    onClick={() => handleDeleteDocument(doc.MaTaiLieu)}
                    boxShadow="sm"
                    aria-label="Xóa tài liệu"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal thêm tài liệu */}
      <AddDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maHocPhan={maHocPhan}
        maChuong={maChuong}
        setIsOpen={setIsOpen}
        updateChapter={updateChapter}
      />
    </Flex>
  );
};

export default ExamDocuments;
