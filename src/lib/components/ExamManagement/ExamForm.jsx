import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "chakra-react-select";

const mockChapters = [
  { id: 1, name: "Chương 1" },
  { id: 2, name: "Chương 2" },
  { id: 3, name: "Chương 3" },
];
const mockClasses = [
  { id: "A", name: "Lớp 48K21.1" },
  { id: "B", name: "Lớp 48K21.2" },
  { id: "C", name: "Lớp 48K21.3" },
];
const mockSubjects = [
  { id: "ktct", name: "Kinh tế chính trị" },
  { id: "qth", name: "Quản trị học" },
];

const getDefaultDetail = (defaultDetail) => {
  if (defaultDetail && Array.isArray(defaultDetail) && defaultDetail.length > 0)
    return defaultDetail;
  return mockChapters.map((c) => ({
    chapter: c.id,
    easy: 1,
    medium: 1,
    hard: 1,
  }));
};
const getDefaultScores = (defaultScores) => {
  if (defaultScores) return defaultScores;
  return { easy: 2, medium: 3, hard: 5 };
};

const ExamForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode = "create", defaultData = {} } = location.state || {};

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    name: defaultData.name || "",
    subject: defaultData.subject || "",
    duration: defaultData.duration || "",
    password: defaultData.password || "",
    classes: defaultData.classes || [],
    practice: defaultData.practice || false,
  });
  const [detail, setDetail] = useState(getDefaultDetail(defaultData.detail));
  const [scores, setScores] = useState(getDefaultScores(defaultData.scores));

  const handleInfoChange = (field, value) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (idx, level, value) => {
    setDetail((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, [level]: Number(value) } : item
      )
    );
  };

  const handleScoreChange = (level, value) => {
    setScores((prev) => ({ ...prev, [level]: Number(value) }));
  };

  const subjectOptions = mockSubjects.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const classOptions = mockClasses.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const handleSave = () => {
    navigate("/exam-management");
  };

  if (step === 3) {
    return (
      <Flex minH="100vh" direction="column" bg="#F5F9FF" align="center" pt={5}>
        <Flex direction="column" w="100%" maxW="1200px" align="center" pt={5}>
          <Center flex={1}>
            <Heading fontSize="lg" mb={2} textTransform="uppercase">
              {mode === "edit" ? "Cập nhật" : "Tạo"} bài thi
            </Heading>
          </Center>
          <Flex
            direction="column"
            bg="white"
            p={8}
            borderRadius="md"
            maxW="1000px"
            w="100%"
            mb={6}
          >
            <Text fontWeight="bold" mb={2}>
              Thông tin chung
            </Text>
            <Text>Tên cuộc thi: {info.name}</Text>
            <Text>
              Học phần:{" "}
              {mockSubjects.find((s) => s.id === info.subject)?.name || ""}
            </Text>
            <Text>Tổng thời gian làm bài: {info.duration} phút</Text>
            <Text>Mật khẩu đề thi: {info.password}</Text>
            <Text>
              Lớp học phần:{" "}
              {mockClasses
                .filter((c) => info.classes.includes(c.id))
                .map((c) => c.name)
                .join(", ")}
            </Text>
            <Text>Luyện thi: {info.practice ? "Có" : "Không"}</Text>
            <Box h={4} />
            <Text fontWeight="bold" mb={2}>
              Thông tin chi tiết
            </Text>
            <Table size="md" mb={4}>
              <Thead>
                <Tr>
                  <Th>Chương</Th>
                  <Th>Dễ</Th>
                  <Th>Trung bình</Th>
                  <Th>Khó</Th>
                </Tr>
              </Thead>
              <Tbody>
                {detail.map((row) => (
                  <Tr key={row.chapter}>
                    <Td>{row.chapter}</Td>
                    <Td>{row.easy}</Td>
                    <Td>{row.medium}</Td>
                    <Td>{row.hard}</Td>
                  </Tr>
                ))}
                <Tr fontWeight="bold">
                  <Td>Tổng</Td>
                  <Td>{detail.reduce((a, b) => a + b.easy, 0)}</Td>
                  <Td>{detail.reduce((a, b) => a + b.medium, 0)}</Td>
                  <Td>{detail.reduce((a, b) => a + b.hard, 0)}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Loại câu</Th>
                  <Th>Điểm</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Dễ</Td>
                  <Td>{scores.easy}</Td>
                </Tr>
                <Tr>
                  <Td>Trung bình</Td>
                  <Td>{scores.medium}</Td>
                </Tr>
                <Tr>
                  <Td>Khó</Td>
                  <Td>{scores.hard}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          <Flex gap={4} mt={4} mb={8}>
            <Button
              colorScheme="gray"
              size="lg"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Quay lại
            </Button>
            <Button colorScheme="blue" size="lg" onClick={handleSave}>
              {mode === "edit" ? "Cập nhật" : "Xác nhận"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" direction="column" bg="#F5F9FF" align="center" pt={5}>
      <Flex
        direction="column"
        w="100%"
        maxW="1200px"
        align="center"
        pt={5}
        gap={5}
      >
        {step >= 1 && step <= 2 && (
          <>
            <Center flex={1}>
              <Heading fontSize="lg" mb={2} textTransform="uppercase">
                {mode === "edit" ? "Cập nhật" : "Tạo"} bài thi - THÔNG TIN CHUNG
              </Heading>
            </Center>
            <Box
              bg="white"
              w="100%"
              p={8}
              borderRadius="md"
              maxW="1200px"
              mb={6}
            >
              <Input
                placeholder="Tên cuộc thi"
                mb={3}
                value={info.name}
                onChange={(e) => handleInfoChange("name", e.target.value)}
              />
              <Flex gap={3} mb={3} direction="column">
                <Select
                  placeholder="Học phần"
                  options={subjectOptions}
                  value={subjectOptions.find((s) => s.value === info.subject)}
                  onChange={(option) =>
                    handleInfoChange("subject", option?.value)
                  }
                />

                <Select
                  placeholder="Chọn lớp học phần"
                  isMulti
                  options={classOptions}
                  value={classOptions.filter((c) =>
                    info.classes.includes(c.value)
                  )}
                  onChange={(options) =>
                    handleInfoChange(
                      "classes",
                      options ? options.map((opt) => opt.value) : []
                    )
                  }
                />
              </Flex>
              <Flex gap={3} mb={3}>
                <Input
                  placeholder="Tổng thời gian làm bài (phút)"
                  value={info.duration}
                  onChange={(e) => handleInfoChange("duration", e.target.value)}
                />
                <Input
                  placeholder="Mật khẩu đề thi"
                  value={info.password}
                  onChange={(e) => handleInfoChange("password", e.target.value)}
                />
              </Flex>
              <Checkbox
                isChecked={info.practice}
                onChange={(e) => handleInfoChange("practice", e.target.checked)}
                mb={3}
              >
                Luyện thi
              </Checkbox>
            </Box>
          </>
        )}
        {step === 2 && (
          <>
            <Center flex={1}>
              <Heading fontSize="lg" mb={2} textTransform="uppercase">
                {mode === "edit" ? "Cập nhật" : "Tạo"} bài thi - THÔNG TIN CHI
                TIẾT
              </Heading>
            </Center>
            <Box
              bg="white"
              w="100%"
              p={8}
              borderRadius="md"
              maxW="1200px"
              mb={6}
            >
              <Table size="sm" mb={4}>
                <Thead>
                  <Tr>
                    <Th>Chương</Th>
                    <Th>Dễ</Th>
                    <Th>Trung bình</Th>
                    <Th>Khó</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {detail.map((row, idx) => (
                    <Tr key={row.chapter}>
                      <Td>{row.chapter}</Td>
                      <Td>
                        <Input
                          type="number"
                          min={0}
                          value={row.easy}
                          onChange={(e) =>
                            handleDetailChange(idx, "easy", e.target.value)
                          }
                          w="60px"
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          min={0}
                          value={row.medium}
                          onChange={(e) =>
                            handleDetailChange(idx, "medium", e.target.value)
                          }
                          w="60px"
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          min={0}
                          value={row.hard}
                          onChange={(e) =>
                            handleDetailChange(idx, "hard", e.target.value)
                          }
                          w="60px"
                        />
                      </Td>
                    </Tr>
                  ))}
                  <Tr fontWeight="bold">
                    <Td>Tổng</Td>
                    <Td>{detail.reduce((a, b) => a + b.easy, 0)}</Td>
                    <Td>{detail.reduce((a, b) => a + b.medium, 0)}</Td>
                    <Td>{detail.reduce((a, b) => a + b.hard, 0)}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Loại câu</Th>
                    <Th>Điểm</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {["easy", "medium", "hard"].map((level) => (
                    <Tr key={level}>
                      <Td>
                        {level === "easy"
                          ? "Dễ"
                          : level === "medium"
                          ? "Trung bình"
                          : "Khó"}
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          min={0}
                          value={scores[level]}
                          onChange={(e) =>
                            handleScoreChange(level, e.target.value)
                          }
                          w="60px"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </>
        )}
      </Flex>
      {/* Nút điều hướng / xác nhận */}
      <Flex gap={4} mt={4} mb={8}>
        {step > 1 && (
          <Button
            colorScheme="gray"
            size="lg"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Quay lại
          </Button>
        )}

        {step < 3 && (
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Tiếp tục
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ExamForm;
