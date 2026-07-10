import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bsflohtgpbmqzzjazlak.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZmxvaHRncGJtcXp6amF6bGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDkxMTAsImV4cCI6MjA5ODkyNTExMH0.SIK9XbnLGZ21cwtPEc_VLyvFIsxOmjTbzOGQV2Jywwo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
