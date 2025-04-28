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
import { useState } from "react";

const initialClassData = [
  { stt: 1, name: "CSLT", time: "123 T6", quantity: 30 },
  { stt: 2, name: "QTH", time: "123 T7", quantity: 30 },
  { stt: 3, name: "KTCT", time: "123 T2", quantity: 30 },
];

const Class = () => {
  const [data, setData] = useState(initialClassData);

  // Xử lý xoá lớp học phần (dựa vào stt)
  const handleDelete = (stt) => {
    setData((prev) =>
      prev
        .filter((item) => item.stt !== stt)
        .map((item, idx) => ({ ...item, stt: idx + 1 }))
    );
  };

  return (
    <Flex minH="100vh" direction="column" align="center" bg="#F5F9FF" pt={8}>
      <Flex
        w="100%"
        maxW="1200px"
        justify="space-between"
        align="center"
        mb={6}
      >
        <Center flex={1}>
          <Heading fontWeight="bold" fontSize="xl" textAlign="center">
            LỚP HỌC PHẦN
          </Heading>
        </Center>
        <Button colorScheme="blue" ml={4} px={8} fontWeight="bold">
          Thêm
        </Button>
      </Flex>

      <Table variant="simple" size="md" w="100%" maxW="1200px" bg="white">
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Tên lớp học phần</Th>
            <Th>Thời gian</Th>
            <Th>Số lượng</Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
            <Th textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.stt}>
              <Td>{row.stt}</Td>
              <Td>{row.name}</Td>
              <Td>{row.time}</Td>
              <Td>{row.quantity}</Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEye />}
                  size="sm"
                  colorScheme="yellow"
                  variant="ghost"
                  onClick={() => console.log("Xem lớp", row)}
                >
                  Xem
                </Button>
              </Td>
              <Td textAlign="center">
                <Button
                  leftIcon={<FaEdit />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => console.log("Sửa lớp", row)}
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

export default Class;
