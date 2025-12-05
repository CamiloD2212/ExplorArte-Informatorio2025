import { User } from '../types';
import { Button } from './ui/button';
import { Palette, User as UserIcon, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentUser, onLoginClick, onLogout, currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'categorias', label: 'Categorías' },
    { id: 'mapa', label: 'Mapa de Arte' },
    { id: 'acerca', label: 'Acerca de' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('inicio')}>
            <Palette className="size-8 text-indigo-600" />
            <span className="text-xl text-indigo-600">ExplorArte</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-indigo-600 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <UserIcon className="size-4" />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {currentUser.role === 'admin' ? 'Administrador' : 
                    currentUser.role === 'miembro' ? 'Miembro' : 'Visitante'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentUser.role === 'admin' && (
                    <DropdownMenuItem onClick={() => onNavigate('admin')}>
                      Panel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="size-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLoginClick}>
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap hover:text-indigo-600 transition-colors text-sm ${
                currentPage === item.id ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
