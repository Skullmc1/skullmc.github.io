export interface StoryChoice {
  id: string;
  text: string;
  consequence: string;
  effect: {
    trust: number;
    resources: number;
    knowledge: number;
  };
  nextSceneId: string;
  requireItems?: string[];
  addItems?: string[];
  relationships?: Record<string, number>;
  flags?: Record<string, boolean>;
}

export interface GameSettings {
  musicVolume: number;
  soundVolume: number;
  textSpeed: number;
  fullscreen: boolean;
}

export interface StoryScene {
  id: string;
  title: string;
  description: string;
  location: string;
  character?: string;
  choices: StoryChoice[];
}

// Keep only one GameState interface and update inventory type
export interface GameState {
  currentScene: string;
  stats: {
    trust: number;
    resources: number;
    knowledge: number;
  };
  inventory: InventoryItem[];
  visitedLocations: string[];
  relationships: Record<string, number>;
  chapter: number;
}

export interface Location {
  id: string;
  name: string;
  isVisited: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: "quest" | "consumable" | "key" | "artifact";
  quantity: number;
}

export const items: Record<string, InventoryItem> = {
  mysteriousSymbol: {
    id: "mysteriousSymbol",
    name: "Mysterious Symbol",
    description:
      "A strange marking copied from the beach rocks. It seems to pulse with energy.",
    type: "artifact",
    quantity: 1,
  },
  fishingNet: {
    id: "fishingNet",
    name: "Fishing Net",
    description:
      "A sturdy net for catching fish. Could be useful for other purposes too.",
    type: "quest",
    quantity: 1,
  },
  healingHerbs: {
    id: "healingHerbs",
    name: "Healing Herbs",
    description: "Local medicinal plants that can treat minor wounds.",
    type: "consumable",
    quantity: 3,
  },
  ancientKey: {
    id: "ancientKey",
    name: "Ancient Key",
    description:
      "A corroded key with strange markings. Must unlock something important.",
    type: "key",
    quantity: 1,
  },
};

export const chapter1Scenes: Record<string, StoryScene> = {
  awakening: {
    id: "awakening",
    title: "The Awakening",
    location: "Haven Isle Beach",
    description:
      "Your eyes flutter open to the sound of crashing waves. Scattered debris surrounds you on the beach, remnants of what must have been a terrible shipwreck. The salty air fills your lungs as you try to gather your thoughts...",
    character: "Survivor",
    choices: [
      {
        id: "inspect",
        text: "Inspect the area",
        consequence:
          "You discover strange symbols carved into nearby rocks, pulsing with a faint blue light.",
        effect: { trust: 0, resources: 0, knowledge: 1 },
        nextSceneId: "symbols_discovery",
      },
      {
        id: "call",
        text: "Call for help",
        consequence:
          "A villager named Taren hears your calls and rushes to your aid.",
        effect: { trust: 1, resources: 0, knowledge: 0 },
        nextSceneId: "meeting_taren",
      },
      {
        id: "loot",
        text: "Loot the wreckage",
        consequence:
          "You gather some useful supplies, but footprints in the sand suggest someone has been watching.",
        effect: { trust: -1, resources: 2, knowledge: 0 },
        nextSceneId: "suspicious_village",
      },
    ],
  },
  symbols_discovery: {
    id: "symbols_discovery",
    title: "Ancient Markings",
    location: "Sacred Rocks",
    description:
      "The symbols seem to tell a story of an ancient power sleeping beneath the waves. As you study them, the scratches begin to glow more intensely...",
    character: "Explorer",
    choices: [
      {
        id: "study",
        text: "Study the symbols further",
        consequence:
          "You begin to understand fragments of an ancient prophecy.",
        effect: { trust: 0, resources: 0, knowledge: 2 },
        nextSceneId: "village_entrance",
      },
      {
        id: "copy",
        text: "Copy the symbols in the sand",
        consequence:
          "A passing villager notices your interest in their sacred markings.",
        effect: { trust: 1, resources: 0, knowledge: 1 },
        nextSceneId: "village_entrance",
      },
      {
        id: "ignore",
        text: "Head towards the smoke in the distance",
        consequence:
          "You decide to seek help first, but the memory of the symbols lingers.",
        effect: { trust: 0, resources: 0, knowledge: 0 },
        nextSceneId: "village_entrance",
      },
    ],
  },
  village_entrance: {
    id: "village_entrance",
    title: "Haven Isle Village",
    location: "Village Entrance",
    description:
      "The village of Haven Isle spreads before you. Simple huts dot the shoreline, and fishing boats gently rock in the harbor. The villagers cast wary glances in your direction.",
    character: "Village Elder Elda",
    choices: [
      {
        id: "introduce",
        text: "Formally introduce yourself to the village elder",
        consequence: "Elder Elda appreciates your respect for protocol.",
        effect: { trust: 2, resources: 0, knowledge: 0 },
        nextSceneId: "elder_conversation",
        addItems: ["healingHerbs"],
      },
      {
        id: "explore",
        text: "Explore the village on your own",
        consequence:
          "You discover useful information but make the villagers nervous.",
        effect: { trust: -1, resources: 0, knowledge: 2 },
        nextSceneId: "village_exploration",
      },
      {
        id: "help",
        text: "Offer to help with fishing",
        consequence: "The fishermen cautiously accept your help.",
        effect: { trust: 1, resources: 1, knowledge: 0 },
        nextSceneId: "fishing_dock",
        addItems: ["fishingNet"],
      },
    ],
  },

  elder_conversation: {
    id: "elder_conversation",
    title: "The Elder's Wisdom",
    location: "Elder's Hut",
    description:
      "Elder Elda's hut is filled with strange artifacts and dried herbs. She studies you intently before speaking of the island's troubles.",
    character: "Elder Elda",
    choices: [
      {
        id: "ask_heart",
        text: "Ask about the Heart of the Tides",
        consequence:
          "The elder seems pleased by your interest in their sacred relic.",
        effect: { trust: 1, resources: 0, knowledge: 2 },
        nextSceneId: "heart_revelation",
      },
      {
        id: "ask_help",
        text: "Ask how to help the village",
        consequence: "Elder Elda assigns you a crucial task.",
        effect: { trust: 2, resources: 0, knowledge: 1 },
        nextSceneId: "village_task",
      },
      {
        id: "share_symbols",
        text: "Show her the symbols you found",
        consequence:
          "The elder becomes alarmed and reveals ancient prophecies.",
        effect: { trust: 1, resources: 0, knowledge: 3 },
        nextSceneId: "prophecy_reveal",
        requireItems: ["mysteriousSymbol"],
      },
    ],
  },
};
