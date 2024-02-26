export interface Potion {
  gold: number;
  name: string;
  desc: string;
}
  
export interface Trump {
  name: string;
  energy: number;
  desc: string;
}
  
export interface Relic {
  name: string;
  desc: string;
}

export interface Class {
  name: string,
  energy: number,
  health: number,
  draw: number,
  cards: string,
  relic: Relic,
  trump: Trump
}

export interface Stats {
  wins: number,
  tokens: number,
  losses: number,
  gold: number,
  maxHealth: number,
  energy: number,
  draw: number,
}