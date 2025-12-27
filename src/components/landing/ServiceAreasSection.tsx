import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const serviceAreas = [
  { name: "Capivari", highlight: true },
  { name: "Rafard", highlight: false },
  { name: "Santa Bárbara d'Oeste", highlight: false },
  { name: "Americana", highlight: false },
  { name: "Nova Odessa", highlight: false },
  { name: "Sumaré", highlight: false },
  { name: "Mirassol", highlight: false },
  { name: "São José do Rio Preto", highlight: false },
];

export const ServiceAreasSection = () => {
  return (
    <section id="cobertura" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#141414]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#1a1a1a] to-[#141414]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/30 mb-4">
            Cobertura
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Onde atendemos
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Estamos presentes nas principais cidades da região de São Paulo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Google Map Embed */}
          <div className="relative mb-12">
            <div className="aspect-video rounded-2xl border border-[#FFCC00]/20 overflow-hidden shadow-xl relative">
              {/* Google Maps iframe - centered on Capivari, SP region */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235543.48354622tried!2d-47.5890074!3d-22.9868428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c3c3c3c3c3c3%3A0x0!2sCapivari%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1703000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de cobertura Mi Chame"
                className="absolute inset-0"
              />

              {/* Overlay gradient for branding */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-[#141414]/20 pointer-events-none" />

              {/* Info Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto pointer-events-none">
                <div className="bg-[#141414]/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#FFCC00]/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#141414]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Região de São Paulo</p>
                    <p className="text-sm text-gray-400">DDD 19 • 8 cidades atendidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <Badge
                key={area.name}
                variant={area.highlight ? "default" : "outline"}
                className={`
                  px-4 py-2 text-sm font-medium rounded-full
                  animate-fade-in cursor-default
                  ${area.highlight
                    ? "bg-[#FFCC00] text-[#141414] border-none hover:bg-[#E6B800]"
                    : "border-[#FFCC00]/30 text-white hover:border-[#FFCC00] hover:bg-[#FFCC00]/10"
                  }
                  transition-all duration-300
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {area.name}
              </Badge>
            ))}
          </div>

          {/* Expansion Note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            E em breve em mais cidades da região!
          </p>
        </div>
      </div>
    </section>
  );
};
