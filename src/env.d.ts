//환경 변수들에 대한 타입 정의
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SANDBIRD_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
