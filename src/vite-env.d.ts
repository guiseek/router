/// <reference types="vite/client" />

declare module '*.html' {
  const content: string
  export default content
}
declare module '*.css' {
  const content: string
  export default content
}

interface ImportMetaEnv {
  readonly APP_URL_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const root: HTMLDivElement
declare const loading: HTMLParagraphElement
