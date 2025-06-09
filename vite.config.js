// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     allowedHosts: ["2964-14-224-160-50.ngrok-free.app"],
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập từ bất kỳ host nào (LAN + Ngrok)
    port: 3000,
    strictPort: true,
    cors: true,
    allowedHosts: [
      "competitions-ky-syria-campbell.trycloudflare.com",
      '*'
    ] // Thêm địa chỉ ngrok cụ thể
  }
});
