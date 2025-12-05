import { Palette, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="size-6 text-indigo-400" />
              <span className="text-white">ExplorArte</span>
            </div>
            <p className="text-sm">
              Explorando el mundo del arte, una publicación a la vez.
            </p>
          </div>
          
          <div>
            <h3 className="text-white mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400">Inicio</a></li>
              <li><a href="#" className="hover:text-indigo-400">Categorías</a></li>
              <li><a href="#" className="hover:text-indigo-400">Mapa de Arte</a></li>
              <li><a href="#" className="hover:text-indigo-400">Acerca de</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                contacto@explorarte.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4" />
                Madrid, España
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-400">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="hover:text-indigo-400">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="hover:text-indigo-400">
                <Twitter className="size-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ExplorArte. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
