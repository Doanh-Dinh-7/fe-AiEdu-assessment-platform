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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
            Danh sách tài liệu chương
          </Heading>
        </Center>
        <Button
          bg="#4A90E2"
          color="#fff"
          borderRadius="999px"
          px={8}
          fontWeight="bold"
          fontSize="16px"
          boxShadow="0 2px 8px rgba(74,144,226,0.08)"
          _hover={{ bg: "#357ABD" }}
          onClick={() => setIsOpen(true)}
        >
          Thêm tài liệu
        </Button>
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
                Tài liệu
              </Th>
              <Th fontWeight="bold" fontSize="15px" color="#1C1C1C">
                Ngày tạo
              </Th>
              <Th textAlign="center"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {docs.map((doc, idx) => (
              <Tr
                key={doc.MaTaiLieu}
                _hover={{ bg: "#F2F4F8" }}
                fontSize="15px"
                borderRadius="12px"
                transition="background 0.2s"
              >
                <Td color="#1C1C1C">{idx + 1}</Td>
                <Td color="#1C1C1C">{doc.TenTaiLieu}</Td>
                <Td color="#1C1C1C">{doc.NgayTao}</Td>
                <Td textAlign="center">
                  <Button
                    leftIcon={<FaTrash />}
                    size="sm"
                    borderRadius="999px"
                    bg="#FDE8E6"
                    color="#EA4335"
                    fontWeight="bold"
                    _hover={{ bg: "#F9BDB6" }}
                    variant="ghost"
                    ml={2}
                    onClick={() => handleDeleteDocument(doc.MaTaiLieu)}
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
    </Flex>
  );
};

export default ExamDocuments;
