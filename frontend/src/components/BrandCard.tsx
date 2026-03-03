import { ExternalLink, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Brand } from '../backend';

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  const handleVisitWebsite = () => {
    let url = brand.website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex h-32 w-32 items-center justify-center self-center overflow-hidden rounded-lg bg-muted">
          <img
            src="/assets/generated/placeholder-brand.dim_200x200.png"
            alt={`${brand.name} logo`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardTitle className="line-clamp-2 text-center text-xl">{brand.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <DollarSign className="h-3.5 w-3.5" />
            <span className="font-medium">{brand.priceRange}</span>
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="truncate">{brand.website}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVisitWebsite}
          variant="default"
          className="w-full gap-2"
        >
          Visit Website
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
