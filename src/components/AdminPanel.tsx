import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import { Pokemon, PokemonType, Region } from '@/types/pokemon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPokemon: (pokemon: Omit<Pokemon, 'id'>) => void;
}

const pokemonTypes: PokemonType[] = ['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'fighting', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'steel', 'normal'];
const regions: Region[] = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar','Hisui', 'Paldea'];

export default function AdminPanel({ isOpen, onClose, onAddPokemon }: AdminPanelProps) {
  const [formData, setFormData] = useState({
    name: '',
    types: [] as string[],
    region: '',
    image: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.types.length === 0) newErrors.types = 'At least one type is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.hp < 1) newErrors.hp = 'HP must be at least 1';
    if (formData.attack < 1) newErrors.attack = 'Attack must be at least 1';
    if (formData.defense < 1) newErrors.defense = 'Defense must be at least 1';
    if (formData.speed < 1) newErrors.speed = 'Speed must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const total = formData.hp + formData.attack + formData.defense + formData.speed;
    
    const newPokemon: Omit<Pokemon, 'id'> = {
      name: formData.name.trim(),
      type: formData.types,
      region: formData.region as Region,
      image: formData.image.trim(),
      stats: {
        hp: formData.hp,
        attack: formData.attack,
        defense: formData.defense,
        speed: formData.speed,
        total
      }
    };

    onAddPokemon(newPokemon);
    setFormData({
      name: '',
      types: [],
      region: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0
    });
    setErrors({});
    onClose();
  };

  const handleTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const total = formData.hp + formData.attack + formData.defense + formData.speed;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="admin-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add New Pokemon
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter Pokemon name"
              />
              {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-white">Region</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && <p className="text-red-300 text-sm">{errors.region}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">Image URL</Label>
            <Textarea
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Enter image URL"
              rows={3}
            />
            {errors.image && <p className="text-red-300 text-sm">{errors.image}</p>}
          </div>

          {/* Types */}
          <div className="space-y-2">
            <Label className="text-white">Types (select 1-2)</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {pokemonTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeToggle(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.types.includes(type)
                      ? 'bg-white text-gray-800 shadow-glow'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  disabled={!formData.types.includes(type) && formData.types.length >= 2}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            {errors.types && <p className="text-red-300 text-sm">{errors.types}</p>}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Stats</Label>
              <div className="text-white">
                Total: <span className="font-bold text-accent">{total}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'hp', label: 'HP' },
                { key: 'attack', label: 'Attack' },
                { key: 'defense', label: 'Defense' },
                { key: 'speed', label: 'Speed' }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-white text-sm">{label}</Label>
                  <Input
                    id={key}
                    type="number"
                    min="1"
                    max="255"
                    value={formData[key as keyof typeof formData] || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      [key]: Math.max(0, parseInt(e.target.value) || 0) 
                    }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  {errors[key] && <p className="text-red-300 text-xs">{errors[key]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-pokemon hover:scale-105 transition-transform"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Pokemon
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}