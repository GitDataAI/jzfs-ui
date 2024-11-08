import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {RouterProvider} from "react-router-dom";
import {Routers} from "./router.tsx";


const root = document.getElementById('root');
if (root){
  createRoot(root)
      .render(
          <StrictMode>
              <RouterProvider router={Routers()}/>
          </StrictMode>
      )
}