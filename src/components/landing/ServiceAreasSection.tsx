import { MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
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
      {/* Background Image - Aerial city view */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/95 via-muted/90 to-muted/95" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Cobertura"
          title="Onde atendemos"
          subtitle="Estamos presentes nas principais cidades da região de São Paulo."
        />

        <div className="max-w-4xl mx-auto">
          {/* Map Image */}
          <div className="relative mb-12">
            <div className="aspect-video rounded-2xl border border-[#25D366]/20 overflow-hidden shadow-xl relative group">
              {/* São Paulo Region Map Image */}
              <img
                src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=1200&q=80"
                alt="Região de São Paulo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              {/* Animated location pins */}
              <div className="absolute inset-0">
                <div className="absolute top-[25%] left-[30%] animate-pulse-subtle">
                  <div className="w-4 h-4 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/50" />
                  <div className="absolute -inset-2 rounded-full bg-[#25D366]/30 animate-ping" />
                </div>
                <div className="absolute top-[35%] left-[45%] animate-pulse-subtle" style={{ animationDelay: "0.3s" }}>
                  <div className="w-3 h-3 rounded-full bg-[#128C7E] shadow-lg shadow-[#128C7E]/50" />
                  <div className="absolute -inset-2 rounded-full bg-[#128C7E]/30 animate-ping" style={{ animationDelay: "0.3s" }} />
                </div>
                <div className="absolute top-[50%] left-[55%] animate-pulse-subtle" style={{ animationDelay: "0.6s" }}>
                  <div className="w-4 h-4 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/50" />
                  <div className="absolute -inset-2 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDelay: "0.6s" }} />
                </div>
                <div className="absolute top-[40%] left-[70%] animate-pulse-subtle" style={{ animationDelay: "0.9s" }}>
                  <div className="w-3 h-3 rounded-full bg-[#128C7E] shadow-lg shadow-[#128C7E]/50" />
                  <div className="absolute -inset-2 rounded-full bg-[#128C7E]/30 animate-ping" style={{ animationDelay: "0.9s" }} />
                </div>
                <div className="absolute top-[60%] left-[40%] animate-pulse-subtle" style={{ animationDelay: "1.2s" }}>
                  <div className="w-5 h-5 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/50" />
                  <div className="absolute -inset-2 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDelay: "1.2s" }} />
                </div>
              </div>

              {/* Info Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Região de São Paulo</p>
                    <p className="text-sm text-muted-foreground">DDD 19 • 8 cidades atendidas</p>
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
                    ? "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white border-none hover:from-[#128C7E] hover:to-[#25D366]"
                    : "border-[#25D366]/30 text-foreground hover:border-[#25D366] hover:bg-[#25D366]/5"
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
          <p className="text-center text-sm text-muted-foreground mt-8">
            E em breve em mais cidades da região!
          </p>
        </div>
      </div>
    </section>
  );
};
