export interface Game {
  id: number;
  title: string;
  tag: "played" | "want-to-play" | null;
}
