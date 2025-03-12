'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import { Product } from '@/types/product';
import { urlForImage } from '@/lib/sanity-image';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedAsc, setSortedAsc] = useState<boolean>(true);
  const [filterPrice, setFilterPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "varer"] {
        _id,
        title,
        price,
        image,
        category,
        description,
        _createdAt
      }`;
      const data = await client.fetch<Product[]>(query);
      setProducts(data);
    };

    fetchProducts().catch(console.error);
  }, []);

  const handleSort = () => {
    const sorted = [...products].sort((a, b) => {
      return sortedAsc
        ? a.price - b.price
        : b.price - a.price;
    });
    setProducts(sorted);
    setSortedAsc(!sortedAsc);
  };

  const handleFilter = () => {
    const maxPrice = prompt("Enter maximum price:");
    if (maxPrice === null) return;
    
    const price = parseFloat(maxPrice);
    if (isNaN(price)) {
      alert("Please enter a valid number");
      return;
    }

    setFilterPrice(price);
    setProducts(products.filter(p => p.price <= price));
  };

  return (
    <main className="flex flex-col gap-4 min-h-screen px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produkter</h1>
        <div className="flex gap-2">
          <Button onClick={handleFilter} className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {filterPrice && `Max ${filterPrice} kr`}
          </Button>
          <Button variant="outline" onClick={handleSort} className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            {sortedAsc ? 'Stigende' : 'Synkende'}
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id} className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
              {product.image ? (
                <Image
                  src={urlForImage(product.image).url()}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="object-cover rounded-lg"
                />
              ) : (
                <span className="text-muted-foreground">Ingen bilde</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{product.title}</h3>
              {product.category && (
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              )}
              <p className="text-sm text-muted-foreground">{product.price} kr</p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
