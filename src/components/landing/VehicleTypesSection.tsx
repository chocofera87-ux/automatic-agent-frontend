import { Car, Bike, Crown, Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const vehicleTypes = [
  {
    icon: Car,
    name: "Carro",
    description: "Veículo padrão para até 4 passageiros. Confortável e seguro.",
    tag: "Mais popular",
    tagColor: "bg-[#FFCC00] text-[#141414]",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&q=80",
  },
  {
    icon: Bike,
    name: "Moto",
    description: "Ideal pra 1 pessoa com pressa. Chega rapidinho!",
    tag: "Mais rápido",
    tagColor: "bg-blue-500 text-white",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    icon: Crown,
    name: "Premium",
    description: "Veículo executivo com ar e mais espaço. Viaje com conforto.",
    tag: "Mais conforto",
    tagColor: "bg-amber-500 text-[#141414]",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80",
  },
  {
    icon: Briefcase,
    name: "Corporativo",
    description: "Pra empresas que precisam de corridas frequentes. Faturamento mensal.",
    tag: "Para empresas",
    tagColor: "bg-purple-500 text-white",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80",
  },
];

export const VehicleTypesSection = () => {
  return (
    <section id="veiculos" className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
        {/* Animated glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFCC00]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Nossa Frota"
          title="Escolha o veículo que preferir"
          subtitle="Temos opções pra todo tipo de corrida. Você escolhe o que melhor te atende."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {vehicleTypes.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="group relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#FFCC00]/50 hover:shadow-2xl hover:shadow-[#FFCC00]/20 transition-all duration-500 h-full hover:-translate-y-2 touch-manipulation">
                {/* Animated background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/0 to-[#FFCC00]/0 group-hover:from-[#FFCC00]/10 group-hover:to-transparent transition-all duration-500" />

                {/* Tag with animation */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 transform group-hover:scale-110 transition-transform duration-300">
                  <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold ${vehicle.tagColor} shadow-lg backdrop-blur-sm`}>
                    {vehicle.tag}
                  </span>
                </div>

                {/* Image with parallax effect */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent group-hover:via-card/20 transition-all duration-500" />

                  {/* Icon overlay with pulse animation */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-lg shadow-[#FFCC00]/30 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <vehicle.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#141414]" />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-xl border-2 border-[#FFCC00] opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '1.5s' }} />
                  </div>
                </div>

                {/* Content with slide-up animation */}
                <div className="relative p-4 sm:p-5 transform group-hover:-translate-y-1 transition-transform duration-500">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[#FFCC00] transition-colors duration-300">
                    {vehicle.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCC00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Corner decorative element */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#FFCC00]/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
