import { Article } from '../../types';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface InicioProps {
  articles: Article[];
  onArticleClick: (articleId: string) => void;
  onCategoryClick: (category: string) => void;
}

export function Inicio({ articles, onArticleClick, onCategoryClick }: InicioProps) {
  const featuredArticles = articles.filter(a => a.featured).slice(0, 3);
  const recentArticles = articles.slice(0, 6);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl mb-6">Bienvenido a ExplorArte</h1>
            <p className="text-xl mb-8 opacity-90">
              Descubre el fascinante mundo del arte a través de artículos, análisis y recursos cuidadosamente seleccionados.
            </p>
            <Button variant="secondary" size="lg">
              Explorar Artículos
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Artículos Destacados</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer"
                onClick={() => onArticleClick(article.id)}
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryClick(article.category);
                      }}
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="size-4" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    {formatDate(article.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Publicaciones Recientes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
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
                  <Badge
                    className="mb-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCategoryClick(article.category);
                    }}
                  >
                    {article.category}
                  </Badge>
                  
                  <h3 className="text-lg mb-2 hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.author}</span>
                    <ArrowRight className="size-4 text-indigo-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl mb-4">Únete a Nuestra Comunidad</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Regístrate para comentar en artículos, guardar tus favoritos y recibir actualizaciones sobre nuevas publicaciones.
          </p>
          <Button variant="secondary" size="lg">
            Crear Cuenta
          </Button>
        </div>
      </section>
    </div>
  );
}
