export const personaConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  storage: {
    bucket: "avatars",
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ["image/jpeg", "image/png", "image/gif"],
  },
};

export const initialPersonaConfig = {
  avatar: null,
  backgroundColor: "#f8f9fa", // Softer background color
  theme: "light",
  badges: [],
  badgeStyle: "rounded", // Default badge style
  name: "",
  tagline: "",
  colors: {
    primary: "#dc2626", // Warm red
    secondary: "#f59e0b", // Warm yellow
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
};

export const themePresets = {
  light: {
    backgroundColor: "#f8f9fa",
    colors: {
      primary: "#dc2626",
      secondary: "#f59e0b",
    },
  },
  dark: {
    backgroundColor: "#1f2937",
    colors: {
      primary: "#ef4444",
      secondary: "#fbbf24",
    },
  },
  custom: {
    backgroundColor: "#f8f9fa",
    colors: {
      primary: "#dc2626",
      secondary: "#f59e0b",
    },
  },
};

export const fontOptions = {
  heading: ["Inter", "Roboto", "Poppins", "Playfair Display", "Montserrat"],
  body: ["Inter", "Roboto", "Open Sans", "Lato", "Source Sans Pro"],
};

export function validateConfig(config) {
  const required = ["theme"];
  const missing = required.filter((field) => !config[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
  return true;
}

export function transformConfig(config) {
  return {
    ...initialPersonaConfig,
    ...config,
    updatedAt: new Date().toISOString(),
  };
}
