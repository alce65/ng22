export interface Hero {
  id: number;
  name: string;
  image: string;
  alignment: "good" | "bad";
  powerStats: PowerStats;
}

export interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export type PowerStat = keyof PowerStats;
