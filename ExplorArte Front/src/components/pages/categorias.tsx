import { useState, useMemo } from 'react';
import { Article } from '../../types';
import { categories } from '../../lib/data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, User, ArrowRight, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CategoriasProps {
  articles: Article[];
  onArticleClick: (articleId: string) => void;
  initialCategory?: string;
}

export function Categorias({ articles, onArticleClick, initialCategory }: CategoriasProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Todas');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'alphabetical'>('recent');

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = selectedCategory === 'Todas' 
      ? articles 
      : articles.filter(a => a.category === selectedCategory);

    switch (sortBy) {
      case 'recent':
        return [...filtered].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return [...filtered].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'alphabetical':
        return [...filtered].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      default:
        return filtered;
    }
  }, [articles, selectedCategory, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = articles.filter(a => a.category === cat).length;
    });
    return counts;
  }, [articles]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl mb-4">Explorar por Categorías</h1>
          <p className="text-gray-600 text-lg">
            Descubre artículos organizados por temática artística
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="mb-4 flex items-center gap-2">
                <Filter className="size-5" />
                Categorías
              </h2>
              
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === 'Todas' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory('Todas')}
                >
                  <span className="flex-1 text-left">Todas</span>
                  <Badge variant="secondary">{articles.length}</Badge>
                </Button>
                
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="flex-1 text-left">{category}</span>
                    <Badge variant="secondary">{categoryCounts[category] || 0}</Badge>
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  Mostrando <span className="text-indigo-600">{filteredAndSortedArticles.length}</span> artículo(s)
                  {selectedCategory !== 'Todas' && (
                    <> en <span className="text-indigo-600">{selectedCategory}</span></>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                    <SelectItem value="alphabetical">Alfabético</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Articles Grid */}
            {filteredAndSortedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onArticleClick(article.id)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge>{article.category}</Badge>
                        {article.featured && <Badge variant="secondary">Destacado</Badge>}
                      </div>
                      
                      <h3 className="text-lg mb-2 hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <User className="size-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-indigo-600">Leer más</span>
                        <ArrowRight className="size-4 text-indigo-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500">No hay artículos en esta categoría</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
