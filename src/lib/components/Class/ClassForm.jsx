import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClass, updateClass } from "../../service/class";
import { getCoursesList } from "../../service/course";

const ClassForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { mode, defaultData = {} } = location.state || {};

  const [formData, setFormData] = useState({
    MaLopHocPhan: defaultData.MaLopHocPhan || "",
    TenLopHocPhan: defaultData.TenLopHocPhan || "",
    ThoiGianHoc: defaultData.ThoiGianHoc || "",
    MaHocPhan: defaultData.MaHocPhan || [],
  });

  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCoursesList();
        if (!data) throw new Error("Error fetching courses");
        if (data && Array.isArray(data)) {
          setCourseOptions(
            data.map((c) => ({ label: c.TenHocPhan, value: c.MaHocPhan }))
          );
        }
      } catch (error) {
        toast({
          title: "Lỗi khi lấy danh sách lớp học phần",
          description: "Không thể lấy dữ liệu lớp học phần. Vui lòng thử lại!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setCourseOptions([]);
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (mode === "edit") {
        // Call the API to update the course
        const data = await updateClass(formData, defaultData.MaLopHocPhan);
        if (!data) {
          throw new Error("Failed to fetch class detail");
        }
        toast({
          title: "Cập nhật lớp học phần thành công",
          description: "Lớp học phần đã được cập nhật thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Call the API to create a new class
        const data = await createClass(formData);
        if (!data) {
          throw new Error("Failed to fetch class detail");
        }
        toast({
          title: "Tạo lớp học phần thành công",
          description: "Lớp học phần đã được tạo thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/class");
    } catch (error) {
      console.error("Error saving course:", error);
      toast({
        title: "Lưu lớp học phần thất bại",
        description: "Có lỗi xảy ra khi lưu lớp học phần.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Center minH="200px">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="primary" />
    </Center>
  ) : (
    <Flex
      minH="auto"
      direction="column"
      bg="background"
      align="center"
      py={7}
      fontFamily="Inter, sans-serif"
    >
      <Box
        w="100%"
        maxW="700px"
        bg="surface"
        p={8}
        borderRadius="12px"
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
        mx={2}
      >
        <Heading
          fontSize="20px"
          textAlign="center"
          textTransform="uppercase"
          mb={6}
          color="primary"
          fontWeight="bold"
        >
          {mode === "edit" ? "Cập nhật" : "Tạo"} lớp học phần
        </Heading>

        <Flex direction="column" gap={4}>
          <Flex direction="column">
            <Text fontWeight="bold" mb={1} color="textSecondary">
              Tên lớp học phần
            </Text>
            <Input
              name="TenLopHocPhan"
              placeholder="VD: Quản trị học 48K21.2"
              value={formData.TenLopHocPhan}
              onChange={handleChange}
              borderRadius="12px"
              bg="#F2F4F8"
              fontSize="15px"
              boxShadow="0 2px 6px rgba(0,0,0,0.04)"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
              }}
            />
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" mb={1} color="textSecondary">
              Thời gian học
            </Text>
            <Input
              name="ThoiGianHoc"
              placeholder="VD: 123 T6"
              value={formData.ThoiGianHoc}
              onChange={handleChange}
              borderRadius="12px"
              bg="#F2F4F8"
              fontSize="15px"
              boxShadow="0 2px 6px rgba(0,0,0,0.04)"
              borderColor="border"
              color="textPrimary"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 2px 6px rgba(74,144,226,0.10)",
              }}
            />
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" mb={1} color="textSecondary">
              Học phần
            </Text>
            <Select
              placeholder="Chọn học phần"
              isMulti
              options={courseOptions}
              value={courseOptions.filter((c) =>
                formData.MaHocPhan.includes(c.value)
              )}
              onChange={(options) =>
                setFormData((prev) => ({
                  ...prev,
                  MaHocPhan: options ? options.map((opt) => opt.value) : [],
                }))
              }
              menuPlacement="top"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: 12,
                  background: "#F2F4F8",
                  fontSize: 15,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  borderColor: "#E0E0E0",
                  color: "#1C1C1C",
                  minHeight: 44,
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#5F6368",
                }),
                multiValue: (base) => ({
                  ...base,
                  borderRadius: 8,
                  background: "#e6eaf7",
                  color: "#1C1C1C",
                }),
              }}
            />
          </Flex>
        </Flex>

        <Flex justify="flex-end" mt={6}>
          <Button
            colorScheme="primary"
            borderRadius="12px"
            fontWeight="bold"
            fontSize="16px"
            boxShadow="0 2px 6px rgba(0,0,0,0.08)"
            onClick={handleSave}
          >
            {mode === "edit" ? "Cập nhật" : "Lưu"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ClassForm;
