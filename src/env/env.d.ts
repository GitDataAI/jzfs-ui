/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_JIAOZIFS_API_URL: string
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
  