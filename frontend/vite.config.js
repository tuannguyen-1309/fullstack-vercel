import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: mode === "development" && {
      proxy: {
        // Proxy các API request trong quá trình phát triển
        "/api": "http://localhost:5000", // Chuyển tiếp các yêu cầu API đến backend
      },
    },
    build: {
      // Cấu hình thư mục output build
      outDir: "../dist", // Đảm bảo thư mục build nằm bên ngoài thư mục frontend
      rollupOptions: {
        // Nếu bạn muốn loại trừ Bootstrap khỏi quá trình bundle (dùng CDN)
        // external: ["bootstrap"],
      },
    },
  };
});
