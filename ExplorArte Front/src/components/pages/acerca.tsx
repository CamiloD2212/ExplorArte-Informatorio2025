import { Palette, Target, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Acerca() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Palette className="size-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl mb-4">Acerca de ExplorArte</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Un espacio dedicado a compartir la pasión por el arte en todas sus formas
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl mb-6">Nuestra Misión</h2>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              ExplorArte nació de la pasión por democratizar el acceso al conocimiento artístico. 
              Creemos que el arte no debe estar limitado a las paredes de los museos, sino que 
              debe ser accesible para todos aquellos que deseen explorarlo.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Nuestro objetivo es crear un puente entre el mundo del arte y el público general, 
              ofreciendo contenido de calidad que inspire, eduque y fomente la apreciación 
              artística en todas sus formas.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              A través de artículos cuidadosamente investigados y escritos por expertos y 
              entusiastas del arte, buscamos hacer que el arte sea más comprensible y 
              disfrutable para todos.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1521483756775-c37af386fce9?w=800"
              alt="Museo de arte"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="size-8 text-indigo-600" />
              </div>
              <h3 className="text-xl mb-3">Calidad</h3>
              <p className="text-gray-600">
                Nos comprometemos a ofrecer contenido bien investigado, preciso y de alta calidad 
                que eduque y entretenga a nuestros lectores.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Fomentamos un espacio inclusivo donde los amantes del arte pueden conectar, 
                compartir ideas y aprender unos de otros.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="size-8 text-pink-600" />
              </div>
              <h3 className="text-xl mb-3">Pasión</h3>
              <p className="text-gray-600">
                El amor por el arte impulsa todo lo que hacemos. Cada artículo está escrito 
                con entusiasmo y dedicación genuina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12">Nuestro Equipo</h2>
        
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-gray-700 text-center text-lg leading-relaxed mb-6">
            ExplorArte es mantenido por un equipo diverso de escritores, críticos de arte, 
            historiadores y artistas que comparten una pasión común por el arte y la cultura.
          </p>
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            Cada miembro de nuestro equipo aporta su perspectiva única y expertise, 
            enriqueciendo el contenido que ofrecemos y asegurando que cubramos una amplia 
            gama de temas artísticos.
          </p>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1623652653308-d49d335c92eb?w=800"
            alt="Equipo creativo"
            className="w-full h-96 object-cover"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">Únete a Nuestra Comunidad</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Sé parte de una comunidad vibrante de amantes del arte. Comparte tus pensamientos, 
            descubre nuevos artistas y expande tus horizontes artísticos.
          </p>
        </div>
      </section>
    </div>
  );
}
