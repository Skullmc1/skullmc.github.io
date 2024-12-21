import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function setupDatabase() {
  try {
    // Check if the messages table exists
    const { data: existingTable } = await supabase
      .from("messages")
      .select("*")
      .limit(1);

    if (existingTable !== null) {
      console.log("Messages table already exists");
      return;
    }

    // Create the messages table
    const { error: createTableError } = await supabase.rpc(
      "create_messages_table",
      {},
    );

    if (createTableError) {
      throw createTableError;
    }

    console.log("Messages table created successfully");

    // Create policies
    const { error: policiesError } = await supabase.rpc(
      "setup_messages_policies",
      {},
    );

    if (policiesError) {
      throw policiesError;
    }

    console.log("Policies created successfully");

    // Enable realtime
    const { error: realtimeError } = await supabase.rpc(
      "enable_realtime_messages",
      {},
    );

    if (realtimeError) {
      throw realtimeError;
    }

    console.log("Realtime enabled successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
}
