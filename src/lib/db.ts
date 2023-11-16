import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
    supabaseUrl: 'https://isfwntkqouccfopmbjux.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZndudGtxb3VjY2ZvcG1ianV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MjY3NzksImV4cCI6MjAxMTQwMjc3OX0.ai9QAcnxFGwI4bb4HTmO13V2t0K3qqgFNvRqzzwprAw',
    options: {
        realtime: {
            reconnectAfterMs: (e: number) => Math.min(10000, e + 1000),
        },
    }
});