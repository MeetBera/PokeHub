import { useState, useEffect } from 'react';
import { Pokemon, PokemonData, Region } from '@/types/pokemon';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemon();
    loadFavorites();
  }, []);

  const loadPokemon = async () => {
    try {
      setLoading(true);

      // Use Vite's base URL so it works in subfolders (e.g., GitHub Pages)
      const response = await fetch(`${import.meta.env.BASE_URL}pokemon-data.json`);

      if (!response.ok) throw new Error('Failed to load Pokemon data');

      const data: PokemonData = await response.json();
      setPokemon(data.pokemon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };


  const loadFavorites = () => {
    const saved = localStorage.getItem('pokemon-favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const saveFavorites = (newFavorites: Set<number>) => {
    localStorage.setItem('pokemon-favorites', JSON.stringify([...newFavorites]));
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const addPokemon = async (newPokemon: Omit<Pokemon, 'id'>) => {
    const maxId = Math.max(...pokemon.map(p => p.id), 0);
    const pokemonWithId: Pokemon = {
      ...newPokemon,
      id: maxId + 1
    };

    const updatedPokemon = [...pokemon, pokemonWithId];
    setPokemon(updatedPokemon);

    // Save to pokemon-data.json
    try {
      const updatedData = { pokemon: updatedPokemon };

      // Note: In a real application, you would need a backend API to write to files
      // For now, we'll simulate saving and the data will persist in memory during the session
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a production app, you would send this to your backend:
      // await fetch('/api/pokemon', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // });

      console.log('Pokemon added to collection:', pokemonWithId);
    } catch (err) {
      console.error('Failed to save Pokemon:', err);
      // Revert on error
      setPokemon(pokemon);
      throw err;
    }
  };

  const getFilteredPokemon = (region: Region, searchTerm: string = '') => {
    return pokemon.filter(p => {
      const matchesRegion = region === 'All' || p.region === region;
      const matchesSearch = searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesRegion && matchesSearch;
    });
  };

  const getPokemonCounts = (): Record<Region, number> => {
    const counts: Record<Region, number> = {
      All: pokemon.length,
      Kanto: 0,
      Johto: 0,
      Hoenn: 0,
      Sinnoh: 0,
      Unova: 0,
      Kalos: 0,
      Urobos: 0,
      Alola: 0,
      Galar: 0,
      Hisui: 0,
      Paldea: 0
    };

    pokemon.forEach(p => {
      if (counts[p.region as Region] !== undefined) {
        counts[p.region as Region]++;
      }
    });

    return counts;
  };

  return {
    pokemon,
    favorites,
    loading,
    error,
    toggleFavorite,
    addPokemon,
    getFilteredPokemon,
    getPokemonCounts,
    reload: loadPokemon
  };
}