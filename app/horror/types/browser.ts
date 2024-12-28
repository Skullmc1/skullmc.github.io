export interface MemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

export interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
}

export interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export interface WebGLDebugInfo {
  UNMASKED_VENDOR_WEBGL: number;
  UNMASKED_RENDERER_WEBGL: number;
}

export interface GPUInfo {
  vendor: string;
  renderer: string;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryInfo>;
    connection?: ConnectionInfo;
    deviceMemory?: number;
    hardwareConcurrency?: number;
  }

  interface Performance {
    memory?: MemoryInfo;
  }
}

export interface BrowserInfo {
  timestamp: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: {
    width: number;
    height: number;
    colorDepth: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  timezone: string;
  cookiesEnabled: boolean;
  memory?: MemoryInfo;
  connection?: ConnectionInfo;
  battery?: BatteryInfo | "Not available";
  hardwareConcurrency?: number;
  deviceMemory?: number;
  gpu?: GPUInfo | string;
}
