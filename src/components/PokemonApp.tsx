import { useState } from 'react';
import { Search, Settings, Sparkles, Heart } from 'lucide-react';
import { Region } from '@/types/pokemon';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonCard from './PokemonCard';
import RegionFilter from './RegionFilter';
import AdminPanel from './AdminPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function PokemonApp() {
  const {
    favorites,
    loading,
    error,
    toggleFavorite,
    addPokemon,
    getFilteredPokemon,
    getPokemonCounts
  } = usePokemon();

  const [selectedRegion, setSelectedRegion] = useState<Region>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();

  const filteredPokemon = getFilteredPokemon(selectedRegion, searchTerm);
  const displayedPokemon = showFavoritesOnly 
    ? filteredPokemon.filter(p => favorites.has(p.id))
    : filteredPokemon;

  const pokemonCounts = getPokemonCounts();

  const handleAddPokemon = async (newPokemon: Parameters<typeof addPokemon>[0]) => {
    try {
      await addPokemon(newPokemon);
      toast({
        title: "Pokemon Added!",
        description: `${newPokemon.name} has been added to your collection.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add Pokemon. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="glass-panel p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white text-lg">Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="glass-panel p-8 text-center">
          <p className="text-red-300 text-lg">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pokemon opacity-20" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="animate-scale-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-glow">
              <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Pokédex
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover and collect amazing Pokemon from all regions. Build your ultimate collection!
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                onClick={() => setShowAdminPanel(true)}
                className="bg-gradient-electric hover:scale-105 transition-transform shadow-glow-yellow"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
              
              <Button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                variant={showFavoritesOnly ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  showFavoritesOnly 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-glow' 
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                {showFavoritesOnly ? 'Show All' : 'Favorites Only'} ({favorites.size})
              </Button>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input
                placeholder="Search Pokemon or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Region Filter */}
      <div className="container mx-auto px-4 py-8">
        <RegionFilter
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          pokemonCounts={pokemonCounts}
        />
      </div>

      {/* Pokemon Grid */}
      <main className="container mx-auto px-4 pb-12">
        {displayedPokemon.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-panel p-8 max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {showFavoritesOnly ? 'No Favorites Yet!' : 'No Pokemon Found'}
              </h3>
              <p className="text-white/70">
                {showFavoritesOnly 
                  ? 'Start adding some Pokemon to your favorites collection.'
                  : searchTerm 
                    ? 'Try adjusting your search or region filter.'
                    : 'No Pokemon available in this region yet.'
                }
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-white/80 text-lg">
                Showing {displayedPokemon.length} Pokemon
                {selectedRegion !== 'All' && ` from ${selectedRegion}`}
                {searchTerm && ` matching "${searchTerm}"`}
                {showFavoritesOnly && ' (favorites only)'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedPokemon.map((pokemon, index) => (
                <div
                  key={pokemon.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-scale-in"
                >
                  <PokemonCard
                    pokemon={pokemon}
                    isFavorite={favorites.has(pokemon.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        onAddPokemon={handleAddPokemon}
      />
    </div>
  );
}