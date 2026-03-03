import { useState } from 'react';
import { useGetAllBrands } from '../hooks/useQueries';
import BrandCard from '../components/BrandCard';
import AddBrandForm from '../components/AddBrandForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function BrandsPage() {
  const { data: brands, isLoading } = useGetAllBrands();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-primary/10" />
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="T-Shirt Collection"
          className="h-[300px] w-full object-cover opacity-40 md:h-[400px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Discover T-Shirt Brands
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Explore curated collections from top t-shirt brands worldwide. Find your perfect fit and style.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Brands</h2>
            <p className="mt-1 text-muted-foreground">
              {brands ? `${brands.length} brand${brands.length !== 1 ? 's' : ''} available` : 'Loading brands...'}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Brand</DialogTitle>
                <DialogDescription>
                  Add a new t-shirt brand to the directory with pricing information.
                </DialogDescription>
              </DialogHeader>
              <AddBrandForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Brands Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4 rounded-xl border border-border bg-card p-6">
                <Skeleton className="h-32 w-32 rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : brands && brands.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((brand, index) => (
              <BrandCard key={index} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Store className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No brands yet</h3>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Get started by adding your first t-shirt brand to the directory.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Your First Brand
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
