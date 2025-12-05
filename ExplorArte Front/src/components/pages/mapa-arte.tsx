import { useState } from 'react';
import { ArtRoute, Artwork } from '../../types';
import { MapPin, Info, Eye } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const artRoutes: ArtRoute[] = [
  {
    id: '1',
    name: 'Ruta del Arte Clásico',
    description: 'Un recorrido por las obras maestras del arte clásico en el centro de la ciudad',
    color: '#3b82f6',
    artworks: [
      {
        id: '1',
        name: 'La Fuente de Cibeles',
        artist: 'Ventura Rodríguez',
        position: [40.419, -3.693],
        description: 'Icónica fuente neoclásica del siglo XVIII, símbolo de Madrid',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800',
      },
      {
        id: '2',
        name: 'Puerta de Alcalá',
        artist: 'Francesco Sabatini',
        position: [40.420, -3.688],
        description: 'Monumento neoclásico de 1778, uno de los más emblemáticos de Madrid',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
      },
      {
        id: '3',
        name: 'Palacio de Cristal',
        artist: 'Ricardo Velázquez Bosco',
        position: [40.416, -3.682],
        description: 'Pabellón de cristal y hierro de 1887 en el Parque del Retiro',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
      },
    ],
  },
  {
    id: '2',
    name: 'Ruta del Arte Urbano',
    description: 'Explora los murales y grafitis más impresionantes de la ciudad',
    color: '#8b5cf6',
    artworks: [
      {
        id: '4',
        name: 'Mural de Malasaña',
        artist: 'Okuda San Miguel',
        position: [40.427, -3.705],
        description: 'Colorido mural geométrico en el barrio de Malasaña',
        image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800',
      },
      {
        id: '5',
        name: 'Street Art Lavapiés',
        artist: 'Diversos artistas',
        position: [40.408, -3.702],
        description: 'Colección de obras de arte urbano en el multicultural Lavapiés',
        image: 'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=800',
      },
    ],
  },
  {
    id: '3',
    name: 'Ruta Escultórica Moderna',
    description: 'Descubre esculturas contemporáneas al aire libre',
    color: '#ec4899',
    artworks: [
      {
        id: '6',
        name: 'Torres KIO',
        artist: 'Philip Johnson & John Burgee',
        position: [40.466, -3.689],
        description: 'Torres inclinadas icónicas, ejemplo de arquitectura postmoderna',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800',
      },
      {
        id: '7',
        name: 'Escultura Abstracta',
        artist: 'Joan Miró',
        position: [40.445, -3.695],
        description: 'Escultura abstracta del maestro catalán en espacio público',
        image: 'https://images.unsplash.com/photo-1691957713140-a9a042252202?w=800',
      },
    ],
  },
];

export function MapaArte() {
  const [selectedRoute, setSelectedRoute] = useState<ArtRoute | null>(artRoutes[0]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [hoveredArtwork, setHoveredArtwork] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl mb-4">Mapa de Rutas Artísticas</h1>
          <p className="text-xl max-w-2xl opacity-90">
            Explora diferentes rutas artísticas por la ciudad y descubre obras de arte en cada recorrido
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Routes */}
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="mb-4">Rutas Disponibles</h2>
              <div className="space-y-3">
                {artRoutes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedRoute?.id === route.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <h3>{route.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{route.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {route.artworks.length} obras
                    </p>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          {/* Main Content - Map and Artworks */}
          <main className="lg:col-span-3">
            {selectedRoute && (
              <>
                {/* Map Placeholder */}
                <Card className="p-8 mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="relative h-96 bg-white rounded-lg overflow-hidden shadow-inner">
                    {/* Simple map visualization */}
                    <div className="absolute inset-0 p-8">
                      <div className="relative w-full h-full">
                        {/* Grid background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="grid grid-cols-8 grid-rows-8 h-full">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div key={i} className="border border-gray-400" />
                            ))}
                          </div>
                        </div>

                        {/* Route name */}
                        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: selectedRoute.color }}
                            />
                            <span>{selectedRoute.name}</span>
                          </div>
                        </div>

                        {/* Artworks on map */}
                        {selectedRoute.artworks.map((artwork, index) => {
                          const xPos = 20 + (index * 25);
                          const yPos = 30 + (index % 2 === 0 ? 10 : 40);
                          
                          return (
                            <div
                              key={artwork.id}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                              style={{
                                left: `${xPos}%`,
                                top: `${yPos}%`,
                              }}
                              onMouseEnter={() => setHoveredArtwork(artwork.id)}
                              onMouseLeave={() => setHoveredArtwork(null)}
                              onClick={() => setSelectedArtwork(artwork)}
                            >
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  hoveredArtwork === artwork.id
                                    ? 'scale-125 shadow-lg'
                                    : 'shadow-md'
                                }`}
                                style={{ backgroundColor: selectedRoute.color }}
                              >
                                <MapPin className="size-6 text-white" />
                              </div>
                              
                              {hoveredArtwork === artwork.id && (
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                                  <p className="text-sm">{artwork.name}</p>
                                  <p className="text-xs text-gray-500">{artwork.artist}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Route lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {selectedRoute.artworks.map((_, index) => {
                            if (index === selectedRoute.artworks.length - 1) return null;
                            
                            const x1 = 20 + (index * 25);
                            const y1 = 30 + (index % 2 === 0 ? 10 : 40);
                            const x2 = 20 + ((index + 1) * 25);
                            const y2 = 30 + ((index + 1) % 2 === 0 ? 10 : 40);
                            
                            return (
                              <line
                                key={index}
                                x1={`${x1}%`}
                                y1={`${y1}%`}
                                x2={`${x2}%`}
                                y2={`${y2}%`}
                                stroke={selectedRoute.color}
                                strokeWidth="3"
                                strokeDasharray="5,5"
                                opacity="0.5"
                              />
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Info className="size-4" />
                    <p>Haz clic en los marcadores para ver más información sobre cada obra</p>
                  </div>
                </Card>

                {/* Artworks List */}
                <div>
                  <h2 className="text-2xl mb-6">Obras en esta Ruta</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedRoute.artworks.map((artwork, index) => (
                      <Card
                        key={artwork.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedArtwork(artwork)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <ImageWithFallback
                            src={artwork.image}
                            alt={artwork.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <Badge
                              style={{ backgroundColor: selectedRoute.color }}
                              className="text-white"
                            >
                              Parada {index + 1}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl mb-2">{artwork.name}</h3>
                          <p className="text-gray-600 mb-4">{artwork.artist}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {artwork.description}
                          </p>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4 gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedArtwork(artwork);
                            }}
                          >
                            <Eye className="size-4" />
                            Ver detalles
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Artwork Detail Dialog */}
      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-2xl">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArtwork.name}</DialogTitle>
                <DialogDescription>{selectedArtwork.artist}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <ImageWithFallback
                    src={selectedArtwork.image}
                    alt={selectedArtwork.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-700 mb-4">{selectedArtwork.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="size-4" />
                  <span>
                    Coordenadas: {selectedArtwork.position[0]}, {selectedArtwork.position[1]}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
