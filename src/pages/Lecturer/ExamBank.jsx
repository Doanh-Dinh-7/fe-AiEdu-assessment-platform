import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const initialData = [
  { stt: 1, hocPhan: "Quản trị học", tinChi: 3, ngayTao: "12/04/2025" },
  { stt: 2, hocPhan: "Kinh tế chính trị", tinChi: 3, ngayTao: "13/04/2025" },
  { stt: 3, hocPhan: "Kinh doanh quốc tế", tinChi: 3, ngayTao: "14/04/2025" },
  { stt: 4, hocPhan: "Cơ sở lập trình", tinChi: 3, ngayTao: "15/04/2025" },
];

const ExamBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);

  const handleNavigateForm = (mode, defaultData = {}) => {
    navigate(`${location.pathname}/exam-bank-form`, {
      state: { mode, defaultData },
    });
  };

  // Hàm xoá (theo stt)
  const handleDelete = (stt) => {
    setData((prev) =>
      prev
        .filter((item) => item.stt !== stt)
        .map((item, idx) => ({ ...item, stt: idx + 1 }))
    );
  };

  return (
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={5}>
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={6}
      >
        <Center flex={1}>
          <Heading
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            textTransform="uppercase"
          >
            Ngân hàng đề thi
          </Heading>
        </Center>
        <Button
          colorScheme="blue"
          ml={4}
          px={8}
          fontWeight="bold"
          onClick={() => handleNavigateForm("create")}
        >
          Thêm
        </Button>
      </Flex>
      <Table variant="simple" size="md" w="100%" maxW="1200px" bg="white">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Học phần</Th>
            <Th>Số tín chỉ</Th>
            <Th>Ngày tạo</Th>
            <Th textAlign="center"> </Th>
            <Th textAlign="center"> </Th>
            <Th textAlign="center"> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.stt}>
              <Td>{row.stt}</Td>
              <Td>{row.hocPhan}</Td>
              <Td>{row.tinChi}</Td>
              <Td>{row.ngayTao}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => navigate(`${location.pathname}/${row.stt}`)}
                >
                  Xem chi tiết
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() => handleNavigateForm("edit", row)}
                >
                  Sửa
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaTrash />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDelete(row.stt)}
                >
                  Xóa
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ExamBank;
