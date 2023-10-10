/// <reference types="vite/client" />

declare module '*.html' {
  const content: string
  export default content
}
declare module '*.css' {
  const content: string
  export default content
}

declare const root: HTMLDivElement
declare const loading: HTMLParagraphElement
