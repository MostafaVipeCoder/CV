/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_URL: string;
  readonly VITE_GA_ID: string;
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
