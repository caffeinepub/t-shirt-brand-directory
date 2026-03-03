import { useState } from 'react';
import { useAddBrand } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface AddBrandFormProps {
  onSuccess?: () => void;
}

export default function AddBrandForm({ onSuccess }: AddBrandFormProps) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: addBrand, isPending } = useAddBrand();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Brand name is required';
    }

    if (!website.trim()) {
      newErrors.website = 'Website URL is required';
    } else {
      // Basic URL validation
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(website.trim())) {
        newErrors.website = 'Please enter a valid URL';
      }
    }

    if (!minPrice.trim()) {
      newErrors.minPrice = 'Minimum price is required';
    } else if (isNaN(Number(minPrice)) || Number(minPrice) < 0) {
      newErrors.minPrice = 'Please enter a valid price';
    }

    if (!maxPrice.trim()) {
      newErrors.maxPrice = 'Maximum price is required';
    } else if (isNaN(Number(maxPrice)) || Number(maxPrice) < 0) {
      newErrors.maxPrice = 'Please enter a valid price';
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      newErrors.maxPrice = 'Maximum price must be greater than minimum price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const priceRange = `$${minPrice} - $${maxPrice}`;

    addBrand(
      { name: name.trim(), website: website.trim(), priceRange },
      {
        onSuccess: () => {
          setName('');
          setWebsite('');
          setMinPrice('');
          setMaxPrice('');
          setErrors({});
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Brand Name</Label>
        <Input
          id="name"
          placeholder="e.g., Nike, Adidas"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          type="text"
          placeholder="e.g., nike.com or https://nike.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          disabled={isPending}
        />
        {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price ($)</Label>
          <Input
            id="minPrice"
            type="number"
            step="0.01"
            placeholder="20"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            disabled={isPending}
          />
          {errors.minPrice && <p className="text-sm text-destructive">{errors.minPrice}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price ($)</Label>
          <Input
            id="maxPrice"
            type="number"
            step="0.01"
            placeholder="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            disabled={isPending}
          />
          {errors.maxPrice && <p className="text-sm text-destructive">{errors.maxPrice}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Brand...
          </>
        ) : (
          'Add Brand'
        )}
      </Button>
    </form>
  );
}
