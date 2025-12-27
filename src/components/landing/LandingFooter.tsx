import { Link } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo.svg"
                alt="Mi Chame"
                className="h-10 w-auto hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sistema de táxi via WhatsApp para a região de São Paulo.
              Peça seu táxi de forma rápida, fácil e segura.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("#recursos")}
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Recursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#como-funciona")}
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#cobertura")}
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Cobertura
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#veiculos")}
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Veículos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5519992753360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  (19) 99275-3360
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  São Paulo, Brasil
                </div>
              </li>
            </ul>
          </div>

          {/* Access */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Acesso</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Área do Operador
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/5519992753360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FFCC00] transition-colors text-sm"
                >
                  Chamar Táxi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Mi Chame. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Feito com</span>
              <span className="text-[#FFCC00]">♥</span>
              <span>em São Paulo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
