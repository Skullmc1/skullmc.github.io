import { supabase } from "./newSupabase";

// Save a new persona
export async function savePersona(userId, personaConfig) {
  try {
    const { data, error } = await supabase
      .from("personas")
      .insert([
        {
          user_id: userId,
          config: personaConfig,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error saving persona:", error);
    throw error;
  }
}

// Get all personas for a user
export async function getPersonas(userId) {
  try {
    const { data, error } = await supabase
      .from("personas")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching personas:", error);
    throw error;
  }
}

// Get a single persona by ID
export async function getPersonaById(personaId) {
  try {
    const { data, error } = await supabase
      .from("personas")
      .select("*")
      .eq("id", personaId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching persona:", error);
    throw error;
  }
}

// Update an existing persona
export async function updatePersona(personaId, personaConfig) {
  try {
    const { data, error } = await supabase
      .from("personas")
      .update({
        config: personaConfig,
        updated_at: new Date().toISOString(),
      })
      .eq("id", personaId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error updating persona:", error);
    throw error;
  }
}

// Delete a persona
export async function deletePersona(personaId) {
  try {
    const { error } = await supabase
      .from("personas")
      .delete()
      .eq("id", personaId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting persona:", error);
    throw error;
  }
}

// Share a persona (create a shared link)
export async function sharePersona(personaId) {
  try {
    const { data, error } = await supabase
      .from("shared_personas")
      .insert([
        {
          persona_id: personaId,
          shared_at: new Date().toISOString(),
          share_token: generateShareToken(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error sharing persona:", error);
    throw error;
  }
}

// Helper function to generate a share token
function generateShareToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get a shared persona by token
export async function getSharedPersona(shareToken) {
  try {
    const { data, error } = await supabase
      .from("shared_personas")
      .select(
        `
        *,
        personas (*)
      `,
      )
      .eq("share_token", shareToken)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching shared persona:", error);
    throw error;
  }
}

// Duplicate a persona
export async function duplicatePersona(personaId, userId) {
  try {
    // First, get the original persona
    const original = await getPersonaById(personaId);
    if (!original) throw new Error("Original persona not found");

    // Create a new persona with the same config
    const { data, error } = await supabase
      .from("personas")
      .insert([
        {
          user_id: userId,
          config: original.config,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          name: `${original.name} (Copy)`,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error duplicating persona:", error);
    throw error;
  }
}
