import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function initializeDatabase() {
  try {
    // Create the messages table
    await supabase.rpc("create_messages_table", {
      sql_command: `
        CREATE TABLE IF NOT EXISTS messages (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
        );
      `,
    });

    // Enable RLS (Row Level Security)
    await supabase.rpc("enable_rls", {
      sql_command: `
        ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
      `,
    });

    // Create policy for reading messages
    await supabase.rpc("create_read_policy", {
      sql_command: `
        CREATE POLICY IF NOT EXISTS "Allow anyone to read messages"
        ON messages
        FOR SELECT
        TO anon
        USING (true);
      `,
    });

    // Create policy for inserting messages
    await supabase.rpc("create_insert_policy", {
      sql_command: `
        CREATE POLICY IF NOT EXISTS "Allow anyone to insert messages"
        ON messages
        FOR INSERT
        TO anon
        WITH CHECK (true);
      `,
    });

    // Enable realtime
    await supabase.rpc("enable_realtime", {
      sql_command: `
        ALTER PUBLICATION supabase_realtime ADD TABLE messages;
      `,
    });

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
