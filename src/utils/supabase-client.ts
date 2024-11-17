// src/utils/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ConnectionResult {
  success: boolean;
  data?: any;
  error?: Error;
}

export async function testConnection(): Promise<ConnectionResult> {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('claims').select('count');
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log('Connection successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Connection test failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error occurred')
    };
  }
}