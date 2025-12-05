import { useEffect, useState } from 'react';
import { User, Article, Comment } from './types';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { AuthDialog } from './components/auth-dialog';
import { Inicio } from './components/pages/inicio';
import { Categorias } from './components/pages/categorias';
import { ArticleView } from './components/pages/article-view';
import { Acerca } from './components/pages/acerca';
import { Contacto } from './components/pages/contacto';
import { MapaArte } from './components/pages/mapa-arte';
import { Admin } from './components/pages/admin';
import {
  getCurrentUser,
  logout as authLogout,
  initializeDefaultUsers,
} from './lib/auth';
import {
  getArticles,
  saveArticles,
  getComments,
  saveComments,
  initializeDefaultArticles,
  initializeDefaultComments,
} from './lib/data';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Page = 'inicio' | 'categorias' | 'article' | 'acerca' | 'contacto' | 'mapa' | 'admin';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Initialize data
  useEffect(() => {
    initializeDefaultUsers();
    initializeDefaultArticles();
    initializeDefaultComments();
    
    const user = getCurrentUser();
    setCurrentUser(user);
    
    setArticles(getArticles());
    setComments(getComments());
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    toast.success(`Bienvenido, ${user.name}!`);
  };

  const handleLogout = () => {
    authLogout();
    setCurrentUser(null);
    setCurrentPage('inicio');
    toast.success('Sesión cerrada exitosamente');
  };

  const handleNavigate = (page: string) => {
    if (page === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
      toast.error('Solo los administradores pueden acceder a esta sección');
      return;
    }
    setCurrentPage(page as Page);
    setSelectedArticleId(null);
    setSelectedCategory(null);
  };

  const handleArticleClick = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('article');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('categorias');
  };

  const handleBackFromArticle = () => {
    setSelectedArticleId(null);
    setCurrentPage('inicio');
  };

  // Article CRUD
  const handleCreateArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    toast.success('Artículo creado exitosamente');
  };

  const handleUpdateArticle = (id: string, articleData: Partial<Article>) => {
    const updatedArticles = articles.map(article =>
      article.id === id
        ? { ...article, ...articleData, updatedAt: new Date().toISOString() }
        : article
    );
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    toast.success('Artículo actualizado exitosamente');
  };

  const handleDeleteArticle = (id: string) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    
    // Also delete associated comments
    const updatedComments = comments.filter(comment => comment.articleId !== id);
    setComments(updatedComments);
    saveComments(updatedComments);
    
    toast.success('Artículo eliminado exitosamente');
  };

  // Comment CRUD
  const handleAddComment = (content: string) => {
    if (!currentUser || !selectedArticleId) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      articleId: selectedArticleId,
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      createdAt: new Date().toISOString(),
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    saveComments(updatedComments);
    toast.success('Comentario publicado');
  };

  const handleEditComment = (commentId: string, content: string) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? { ...comment, content } : comment
    );
    setComments(updatedComments);
    saveComments(updatedComments);
    toast.success('Comentario actualizado');
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    saveComments(updatedComments);
    toast.success('Comentario eliminado');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return (
          <Inicio
            articles={articles}
            onArticleClick={handleArticleClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      
      case 'categorias':
        return (
          <Categorias
            articles={articles}
            onArticleClick={handleArticleClick}
            initialCategory={selectedCategory || undefined}
          />
        );
      
      case 'article':
        if (!selectedArticleId) {
          setCurrentPage('inicio');
          return null;
        }
        const article = articles.find(a => a.id === selectedArticleId);
        if (!article) {
          setCurrentPage('inicio');
          return null;
        }
        const articleComments = comments.filter(c => c.articleId === selectedArticleId);
        return (
          <ArticleView
            article={article}
            comments={articleComments}
            currentUser={currentUser}
            onBack={handleBackFromArticle}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
        );
      
      case 'acerca':
        return <Acerca />;
      
      case 'contacto':
        return <Contacto />;
      
      case 'mapa':
        return <MapaArte />;
      
      case 'admin':
        if (!currentUser || currentUser.role !== 'admin') {
          setCurrentPage('inicio');
          return null;
        }
        return (
          <Admin
            articles={articles}
            currentUser={currentUser}
            onCreateArticle={handleCreateArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            onViewArticle={handleArticleClick}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentUser={currentUser}
        onLoginClick={() => setAuthDialogOpen(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer />
      
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={handleLogin}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}
