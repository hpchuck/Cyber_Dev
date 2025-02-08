import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for data persistence
export const saveToSupabase = async (table: string, data: any) => {
  const { error } = await supabase.from(table).upsert(data);
  if (error) throw error;
};

export const loadFromSupabase = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data;
};