import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://veigdxwhzqcwoxgywwvh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlaWdkeHdoenFjd294Z3l3d3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjYzMjcsImV4cCI6MjA2OTIwMjMyN30.Z7XU8y7SVhsWFNORfIoJpa31sgqQ2VhC6EGIbSJqiDs';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };
export default supabase;
