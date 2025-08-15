import { Region } from '@/types/pokemon';
import { cn } from '@/lib/utils';

interface RegionFilterProps {
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
  pokemonCounts: Record<Region, number>;
}

const regions: Region[] = ['All', 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos','Urobos', 'Alola', 'Galar','Hisui', 'Paldea'];

const regionGradients: Record<Region, string> = {
  All: 'bg-gradient-pokemon',
  Kanto: 'bg-gradient-fire',
  Johto: 'bg-gradient-water',
  Hoenn: 'bg-gradient-grass',
  Sinnoh: 'bg-gradient-electric',
  Unova: 'bg-gradient-to-r from-purple-500 to-purple-700',
  Kalos: 'bg-gradient-to-r from-pink-500 to-pink-700',
  Urobos: 'bg-gradient-fire',
  Alola: 'bg-gradient-to-r from-orange-500 to-orange-700',
  Galar: 'bg-gradient-to-r from-amber-500 to-amber-700',
  Hisui: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
  Paldea: 'bg-gradient-to-r from-emerald-500 to-emerald-700'
};

export default function RegionFilter({ selectedRegion, onRegionChange, pokemonCounts }: RegionFilterProps) {
  return (
    <div className="region-filter">
      {regions.map((region) => {
        const count = pokemonCounts[region] || 0;
        const isSelected = selectedRegion === region;
        
        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={cn(
              'region-button',
              regionGradients[region],
              isSelected && 'scale-105 shadow-glow-blue',
              count === 0 && region !== 'All' && 'opacity-50 cursor-not-allowed'
            )}
            disabled={count === 0 && region !== 'All'}
          >
            <span className="flex items-center gap-2">
              {region}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}