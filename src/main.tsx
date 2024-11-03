import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style/app.less"
import {RouterProvider } from "react-router-dom";
import Routes from "./router/routes.tsx";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
      <RouterProvider router={Routes()}/>
  </PrimeReactProvider>,
)
