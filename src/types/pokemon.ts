export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  region: string;
  stats: {
    total: number;
  };
  image: string;
}

export interface PokemonData {
  pokemon: Pokemon[];
}

export type PokemonType = 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'fighting' | 'poison' | 'ground' | 'flying' | 'bug' | 'rock' | 'ghost' | 'steel' | 'normal';

export type Region = 'All' | 'Kanto' | 'Johto' | 'Hoenn' | 'Sinnoh' | 'Unova' |  'Kalos' | 'Urobos' | 'Alola' | 'Galar' | 'Hisui' | 'Paldea';