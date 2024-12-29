interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((ev: Event) => void) | null;
  onchargingtimechange: ((ev: Event) => void) | null;
  ondischargingtimechange: ((ev: Event) => void) | null;
  onlevelchange: ((ev: Event) => void) | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery(): Promise<BatteryManager>;
}

interface DeviceInfo {
  os: string;
  battery?: string;
  location?: string;
}

interface IpApiResponse {
  status: string;
  country: string;
  regionName: string;
  city: string;
  query: string;
}

const getBatteryInfo = async (): Promise<string> => {
  try {
    if ("getBattery" in navigator) {
      const battery: BatteryManager = await (
        navigator as NavigatorWithBattery
      ).getBattery();
      const percentage = Math.round(battery.level * 100);
      const charging = battery.charging ? "🔌 Charging" : "🔋 Not charging";
      return `${percentage}% ${charging}`;
    }
    return "Battery info not available";
  } catch {
    return "Battery info not available";
  }
};

const getLocationFromIP = async (): Promise<string> => {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data: IpApiResponse = await response.json();

    if (data.status === "success") {
      return `${data.city}, ${data.regionName}, ${data.country}`;
    }
    return "Location unavailable";
  } catch {
    return "Location unavailable";
  }
};

const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const ua = navigator.userAgent;

  const getOS = () => {
    if (ua.includes("Windows")) return "💻 Windows";
    if (ua.includes("Mac")) return "🍎 MacOS";
    if (ua.includes("Linux")) return "🐧 Linux";
    if (ua.includes("Android")) return "📱 Android";
    if (ua.includes("iOS")) return "📱 iOS";
    return "❓ Unknown OS";
  };

  const [batteryInfo, locationInfo] = await Promise.all([
    getBatteryInfo(),
    getLocationFromIP(),
  ]);

  return {
    os: getOS(),
    battery: batteryInfo,
    location: locationInfo,
  };
};

export const sendToDiscordWebhook = async () => {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured");
    return false;
  }

  try {
    // Get IP Address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    // Get device info
    const deviceInfo = await getDeviceInfo();

    // Get current time
    const currentTime = new Date();
    const timeString = currentTime.toLocaleString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const dateString = currentTime.toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const messageData = {
      embeds: [
        {
          title: "👤 New User Connection",
          description: "A new user has connected to the website.",
          color: 0x00ff00, // Bright green
          fields: [
            {
              name: "📍 Location",
              value: `\`\`\`${deviceInfo.location}\`\`\``,
              inline: false,
            },
            {
              name: "🌐 IP Address",
              value: `\`${ipAddress}\``,
              inline: true,
            },
            {
              name: "💻 System",
              value: deviceInfo.os,
              inline: true,
            },
            {
              name: "🔋 Battery",
              value: deviceInfo.battery,
              inline: true,
            },
          ],
          footer: {
            text: `UTC Time: ${timeString} | ${dateString}`,
          },
          thumbnail: {
            url: "https://i.imgur.com/tJKJcpm.png", // You can replace this with your own icon
          },
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Discord");
    }

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
