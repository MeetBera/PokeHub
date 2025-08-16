import { useState } from 'react';
import { Heart, TrendingUp, Shield, Zap, Activity } from 'lucide-react';
import { Pokemon, PokemonType } from '@/types/pokemon';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const typeColors: Record<PokemonType, string> = {
  fire: 'bg-gradient-fire',
  water: 'bg-gradient-water',
  grass: 'bg-gradient-grass',
  electric: 'bg-gradient-electric',
  psychic: 'bg-gradient-to-r from-psychic to-purple-400',
  ice: 'bg-gradient-to-r from-ice to-cyan-300',
  dragon: 'bg-gradient-to-r from-dragon to-purple-600',
  dark: 'bg-gradient-to-r from-gray-800 to-gray-600',
  fairy: 'bg-gradient-to-r from-fairy to-pink-400',
  fighting: 'bg-gradient-to-r from-fighting to-red-600',
  poison: 'bg-gradient-to-r from-poison to-purple-600',
  ground: 'bg-gradient-to-r from-ground to-yellow-600',
  flying: 'bg-gradient-to-r from-flying to-blue-400',
  bug: 'bg-gradient-to-r from-bug to-green-600',
  rock: 'bg-gradient-to-r from-rock to-yellow-700',
  ghost: 'bg-gradient-to-r from-ghost to-purple-800',
  steel: 'bg-gradient-to-r from-steel to-gray-400',
  normal: 'bg-gradient-to-r from-normal to-gray-300'
};

export default function PokemonCard({ pokemon, isFavorite = false, onToggleFavorite }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = () => {
    onToggleFavorite?.(pokemon.id);
  };

  const getStatColor = (value: number) => {
    if (value >= 100) return 'text-dragon';
    if (value >= 80) return 'text-fire';
    if (value >= 60) return 'text-electric';
    return 'text-muted-foreground';
  };

  const getStatBarColor = (value: number) => {
    if (value >= 100) return 'bg-dragon';
    if (value >= 80) return 'bg-fire';
    if (value >= 60) return 'bg-electric';
    return 'bg-muted';
  };

  return (
    <div className="pokemon-card group animate-scale-in w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className={cn(
          'favorite-button z-10',
          isFavorite ? 'text-red-500 scale-110' : 'text-white/70 hover:text-red-500'
        )}
      >
        <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
      </button>

      {/* Pokemon Image */}
      <div className="relative p-6 flex justify-center items-center h-48 overflow-hidden">
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          typeColors[pokemon.type[0] as PokemonType]
        )} />
        
        {!imageLoaded && (
          <div className="animate-pulse bg-muted/50 w-32 h-32 rounded-full" />
        )}
        
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={cn(
            'w-32 h-32 object-contain transition-all duration-500 group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>

      {/* Pokemon Info */}
      <div className="p-6 pt-0 space-y-4">
        {/* Name and Types */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {pokemon.name}
          </h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.type.map((type) => (
              <span
                key={type}
                className={cn(
                  'type-badge',
                  typeColors[type as PokemonType]
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {pokemon.region} Region
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-card-foreground">Total Stats</span>
            <span className={cn('text-lg font-bold', getStatColor(pokemon.stats.total))}>
              {pokemon.stats.total}
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700 ease-out',
                getStatBarColor(pokemon.stats.total)
              )}
              style={{ width: `${Math.min((pokemon.stats.total / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}