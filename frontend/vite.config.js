import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        server: mode === "development" && {
            proxy: {
                "/api": "http://localhost:5000", // Proxy chỉ sử dụng khi chạy local
            },
        },
        build: {
            outDir: "../dist", // Đảm bảo thư mục build nằm bên ngoài thư mục frontend
        },
    };
});
