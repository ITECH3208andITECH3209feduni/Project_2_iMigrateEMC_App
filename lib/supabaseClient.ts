import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmroajwsqhgkfpecpeon.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcm9handzcWhna2ZwZWNwZW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDAzMTYsImV4cCI6MjA3NDExNjMxNn0.lAj4acQN8zFCKZV6UG_xddluT3CzNdvWanlt7n9zFeM';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
