import { useState } from "react";

const useRole = () => {
  const [vaiTro, setVaiTro] = useState("student"); // Mặc định là student

  const toggleRole = (newRole) => {
    setVaiTro(newRole);
  };

  return { vaiTro, toggleRole };
};

export default useRole;
