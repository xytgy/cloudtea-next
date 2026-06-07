declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string
    PROXY_TARGET_URL: string
    PROXY_ALLOWED_PREFIXES: string
  }
}
