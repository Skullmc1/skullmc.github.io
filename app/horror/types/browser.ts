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

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryInfo>;
    connection?: ConnectionInfo;
  }

  interface Performance {
    memory?: MemoryInfo;
  }
}
