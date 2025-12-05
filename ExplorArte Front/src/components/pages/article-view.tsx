import { useState } from 'react';
import { Article, Comment, User } from '../../types';
import { Calendar, User as UserIcon, ArrowLeft, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
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

interface ArticleViewProps {
  article: Article;
  comments: Comment[];
  currentUser: User | null;
  onBack: () => void;
  onAddComment: (content: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export function ArticleView({
  article,
  comments,
  currentUser,
  onBack,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: ArticleViewProps) {
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      onAddComment(commentContent);
      setCommentContent('');
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editingCommentId && editingContent.trim()) {
      onEditComment(editingCommentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const canEditComment = (comment: Comment) => {
    if (!currentUser) return false;
    return currentUser.id === comment.userId || currentUser.role === 'admin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Volver
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
          {/* Cover Image */}
          <div className="aspect-video overflow-hidden">
            <ImageWithFallback
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Category Badge */}
            <Badge className="mb-4">{article.category}</Badge>

            {/* Title */}
            <h1 className="text-4xl mb-4">{article.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <span className="flex items-center gap-2">
                <UserIcon className="size-5" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-5" />
                {formatDate(article.createdAt)}
              </span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <MessageCircle className="size-6" />
            Comentarios ({comments.length})
          </h2>

          {/* Add Comment Form */}
          {currentUser && currentUser.role !== 'visitante' ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <Textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="mb-3"
                rows={4}
              />
              <Button type="submit" disabled={!commentContent.trim()}>
                Publicar Comentario
              </Button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                {currentUser 
                  ? 'Solo los miembros y administradores pueden comentar'
                  : 'Inicia sesión para comentar'}
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Card key={comment.id} className="p-6">
                  {editingCommentId === comment.id ? (
                    // Edit Mode
                    <div>
                      <Textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="mb-3"
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit}>
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <UserIcon className="size-4 text-gray-500" />
                            <span>{comment.userName}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        
                        {canEditComment(comment) && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStartEdit(comment)}
                            >
                              <Edit2 className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteCommentId(comment.id)}
                            >
                              <Trash2 className="size-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700">{comment.content}</p>
                    </>
                  )}
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteCommentId} onOpenChange={() => setDeleteCommentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar comentario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El comentario será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteCommentId) {
                  onDeleteComment(deleteCommentId);
                  setDeleteCommentId(null);
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
