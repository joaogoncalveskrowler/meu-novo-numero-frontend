import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzzlwzgoaazrxktgraqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6emx3emdvYWF6cnhrdGdyYXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Njk1MjMsImV4cCI6MjA2MzI0NTUyM30.okpb4oGxi-vKlfMwe_32ud1IVViagyDjE93ma7_FS3U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);