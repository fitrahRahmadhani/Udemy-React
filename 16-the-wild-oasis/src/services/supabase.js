import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xqlfounfyydquvbrlpjm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbGZvdW5meXlkcXV2YnJscGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3OTczODUsImV4cCI6MjAzMDM3MzM4NX0.CXGUvEGF48Wf7fD7ay7KpsW6g335qGios9-kRt6M99Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
