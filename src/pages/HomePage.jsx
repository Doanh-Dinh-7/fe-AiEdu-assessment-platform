import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const VaiTro = localStorage.getItem("VaiTro");

    if (!VaiTro) {
      window.location.href = "/login";
    }
  }, []);

  return <h1>Welcome to the Home Page</h1>;
};

export default HomePage;
