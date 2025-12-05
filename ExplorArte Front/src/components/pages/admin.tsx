import { useState } from 'react';
import { Article, User } from '../../types';
import { categories } from '../../lib/data';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AdminProps {
  articles: Article[];
  currentUser: User;
  onCreateArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateArticle: (id: string, article: Partial<Article>) => void;
  onDeleteArticle: (id: string) => void;
  onViewArticle: (id: string) => void;
}

export function Admin({
  articles,
  currentUser,
  onCreateArticle,
  onUpdateArticle,
  onDeleteArticle,
  onViewArticle,
}: AdminProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: categories[0],
    coverImage: '',
    featured: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: categories[0],
      coverImage: '',
      featured: false,
    });
    setEditingArticle(null);
  };

  const handleOpenEditor = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        coverImage: article.coverImage,
        featured: article.featured,
      });
    } else {
      resetForm();
    }
    setIsEditorOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingArticle) {
      onUpdateArticle(editingArticle.id, formData);
    } else {
      onCreateArticle({
        ...formData,
        author: currentUser.name,
        authorId: currentUser.id,
      });
    }
    
    setIsEditorOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteArticleId) {
      onDeleteArticle(deleteArticleId);
      setDeleteArticleId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Panel de Administración</h1>
              <p className="opacity-90">Gestiona los artículos del blog</p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleOpenEditor()}
              className="gap-2"
            >
              <Plus className="size-5" />
              Nuevo Artículo
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Table */}
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Artículo</th>
                  <th className="text-left p-4">Categoría</th>
                  <th className="text-left p-4">Autor</th>
                  <th className="text-left p-4">Fecha</th>
                  <th className="text-left p-4">Estado</th>
                  <th className="text-right p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1">{article.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge>{article.category}</Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{article.author}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600">{formatDate(article.createdAt)}</p>
                    </td>
                    <td className="p-4">
                      {article.featured && (
                        <Badge variant="secondary">Destacado</Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewArticle(article.id)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditor(article)}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteArticleId(article.id)}
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Editar Artículo' : 'Nuevo Artículo'}
            </DialogTitle>
            <DialogDescription>
              {editingArticle
                ? 'Modifica los campos que desees actualizar'
                : 'Completa el formulario para crear un nuevo artículo'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="El título del artículo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extracto</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                placeholder="Un breve resumen del artículo"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="El contenido completo del artículo (separa párrafos con doble salto de línea)"
                rows={12}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">URL de Imagen</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  required
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Marcar como destacado
              </Label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditorOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingArticle ? 'Actualizar' : 'Crear'} Artículo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteArticleId} onOpenChange={() => setDeleteArticleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar artículo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El artículo será eliminado permanentemente
              junto con todos sus comentarios.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
