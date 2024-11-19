import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./router.tsx";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "./style/index.less";
import "./i18n/i18n.ts";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <PrimeReactProvider>
          <RouterProvider router={Routers()} />
        </PrimeReactProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
