import { Hero, PowerStat } from './hero';

export interface PowerStatsChangeEvent {
  hero: Hero;
  powerStat: PowerStat;
  delta: number;
}
