import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { toast } from 'sonner';

export function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success('¡Mensaje enviado con éxito! Te responderemos pronto.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Contacto</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl mb-6">Información de Contacto</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Mail className="size-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">Email</h3>
                    <p className="text-gray-600">contacto@explorarte.com</p>
                    <p className="text-gray-600">info@explorarte.com</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      Calle del Arte, 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Phone className="size-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="mb-1">Teléfono</h3>
                    <p className="text-gray-600">+34 912 345 678</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="mb-4">Síguenos en Redes Sociales</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <Facebook className="size-6 text-indigo-600" />
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <Instagram className="size-6 text-pink-600" />
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Twitter className="size-6 text-blue-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl mb-6">Envíanos un Mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Escribe tu mensaje aquí..."
                    rows={8}
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto gap-2">
                  <Send className="size-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl mb-4">Horario de Atención</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p><strong>Lunes - Viernes:</strong> 9:00 - 18:00</p>
              <p><strong>Sábados:</strong> 10:00 - 14:00</p>
              <p><strong>Domingos:</strong> Cerrado</p>
            </div>
            <div>
              <p className="mb-2">
                Normalmente respondemos a todos los mensajes dentro de las 24-48 horas 
                durante días laborables.
              </p>
              <p>
                Para consultas urgentes, por favor llámanos directamente durante nuestro 
                horario de atención.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
