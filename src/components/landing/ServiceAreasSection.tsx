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
    <section id="cobertura" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Cobertura"
          title="Onde atendemos"
          subtitle="Estamos presentes nas principais cidades da região de São Paulo."
        />

        <div className="max-w-3xl mx-auto">
          {/* Map Illustration */}
          <div className="relative mb-12">
            <div className="aspect-video bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 rounded-2xl border border-[#25D366]/20 flex items-center justify-center overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#25D366] animate-pulse-subtle" />
                <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#128C7E] animate-pulse-subtle" style={{ animationDelay: "0.5s" }} />
                <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse-subtle" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-[#128C7E] animate-pulse-subtle" style={{ animationDelay: "1.5s" }} />
                <div className="absolute bottom-1/4 right-1/2 w-3 h-3 rounded-full bg-[#25D366] animate-pulse-subtle" style={{ animationDelay: "0.8s" }} />

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M25,25 L33,33 L33,66 L50,75 L75,50"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.3"
                    fill="none"
                    strokeDasharray="2,2"
                    className="opacity-50"
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#25D366" />
                      <stop offset="100%" stopColor="#128C7E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-foreground">Região de São Paulo</p>
                <p className="text-sm text-muted-foreground mt-1">DDD 19</p>
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
