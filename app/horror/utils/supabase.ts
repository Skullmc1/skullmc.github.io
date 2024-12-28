import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our responses
export interface TestResponse {
  id?: number;
  created_at?: string;
  session_id: string;
  test_number: number;
  question: string;
  answer: string;
}
