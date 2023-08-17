import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = `${import.meta.env.VITE_SUPABASE_URL}`;
const supabaseKey = `${import.meta.env.VITE_SUPABASE_ANON_KEY}`;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;

// 왜 파란색 뜨지 아아! 아!!!!!!! ..... 알려주세여 가서 찾으란 거져? ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ네
// 환경변수 이름은 VITE로 시작 / import.meta.env.VITE_SUPABASE_URL  https://ko.vitejs.dev/guide/env-and-mode.html
