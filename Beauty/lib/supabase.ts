import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pbyfajvltehsuugpayej.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);