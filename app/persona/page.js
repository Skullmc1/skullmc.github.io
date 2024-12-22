"use client";
import { useState, useEffect } from "react";
import PersonaEditor from "./components/PersonaEditor";
import PersonaPreview from "./components/PersonaPreview";
import ShareModal from "./components/ShareModal";
import AuthButton from "./components/AuthButton";
import { initialPersonaConfig, themePresets } from "./lib/config";
import { savePersona, getPersonas } from "./lib/personaUtils";
import { supabase } from "./lib/newSupabase";

export default function PersonaPage() {
  const [personaConfig, setPersonaConfig] = useState(initialPersonaConfig);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [savedPersonas, setSavedPersonas] = useState([]);
  const [currentPersonaId, setCurrentPersonaId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Check for authenticated user and load personas
  useEffect(() => {
    const fetchUserAndPersonas = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const personas = await getPersonas(user.id);
          setSavedPersonas(personas);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStatusMessage("Error loading user data");
      }
    };

    fetchUserAndPersonas();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      if (newUser) {
        const personas = await getPersonas(newUser.id);
        setSavedPersonas(personas);
      } else {
        setSavedPersonas([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleConfigChange = (newConfig) => {
    if (newConfig.theme !== personaConfig.theme) {
      const themePreset = themePresets[newConfig.theme];
      if (themePreset) {
        newConfig = {
          ...newConfig,
          backgroundColor: themePreset.backgroundColor,
          colors: {
            ...newConfig.colors,
            ...themePreset.colors,
          },
        };
      }
    }
    setPersonaConfig(newConfig);
  };

  const handleSave = async () => {
    if (!user) {
      setStatusMessage("Please sign in to save your persona");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("Saving persona...");

      const savedPersona = await savePersona(user.id, personaConfig);
      setCurrentPersonaId(savedPersona.id);

      setSavedPersonas((prev) => {
        const existing = prev.findIndex((p) => p.id === savedPersona.id);
        if (existing >= 0) {
          return prev.map((p) => (p.id === savedPersona.id ? savedPersona : p));
        }
        return [...prev, savedPersona];
      });

      setStatusMessage("Persona saved successfully!");
    } catch (error) {
      console.error("Error saving persona:", error);
      setStatusMessage("Failed to save persona");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleLoadPersona = (persona) => {
    setPersonaConfig(persona.config);
    setCurrentPersonaId(persona.id);
    setStatusMessage("Persona loaded");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleShare = () => {
    if (!currentPersonaId) {
      setStatusMessage("Please save your persona before sharing");
      return;
    }
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Persona Forge
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Create and customize your digital persona
              </p>
            </div>
            <div className="space-x-4 flex items-center">
              <AuthButton />
              {user && (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-4 py-2 text-white rounded-md transition-all
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600"
                      }`}
                  >
                    {loading ? "Saving..." : "Save Persona"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-md hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    Share
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
              {statusMessage}
            </div>
          )}

          {user ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Editor Side */}
              <div className="space-y-6">
                {/* Saved Personas */}
                {savedPersonas.length > 0 && (
                  <div className="bg-gray-50 rounded-xl shadow-sm p-4">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">
                      Saved Personas
                    </h2>
                    <div className="space-y-2">
                      {savedPersonas.map((persona) => (
                        <button
                          key={persona.id}
                          onClick={() => handleLoadPersona(persona)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors
                            ${
                              currentPersonaId === persona.id
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                          {persona.config.name || "Unnamed Persona"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Persona Editor */}
                <PersonaEditor
                  config={personaConfig}
                  onChange={handleConfigChange}
                />
              </div>

              {/* Preview Side */}
              <div className="sticky top-8">
                <PersonaPreview config={personaConfig} onShare={handleShare} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Sign in to create your persona
              </h2>
              <p className="text-gray-600 mb-6">
                Create, customize, and share your digital persona with others.
              </p>
              <AuthButton />
            </div>
          )}

          {/* Share Modal */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            personaConfig={personaConfig}
            personaId={currentPersonaId}
          />
        </div>
      </div>
    </div>
  );
}
