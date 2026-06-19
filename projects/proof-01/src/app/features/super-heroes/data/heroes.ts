import { Hero } from '../types/hero';

export const HEROES: Hero[] = [
  {
    id: 6250,
    name: 'Spider-Man',
    powerStats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 75,
      power: 74,
      combat: 85,
    },
    image:
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
    alignment: 'good',
  },
  {
    id: 2245,
    name: 'Doctor Octopus',
    powerStats: {
      intelligence: 94,
      strength: 48,
      speed: 33,
      durability: 40,
      power: 53,
      combat: 65,
    },
    image:
      'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/225-doctor-octopus.jpg',
    alignment: 'bad',
  },
  {
    id: 370,
    name: 'Batman',
    powerStats: {
      intelligence: 100,
      strength: 26,
      speed: 27,
      durability: 50,
      power: 47,
      combat: 100,
    },
    image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg',
    alignment: 'good',
  },
];
