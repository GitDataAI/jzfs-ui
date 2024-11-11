import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./router.tsx";
import "./style/index.less";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import "./i18n/i18n.ts";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={Routers()} />
      </ThemeProvider>
    </StrictMode>
  );
}
