import { Car, Bike, Crown, Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const vehicleTypes = [
  {
    icon: Car,
    name: "Carro",
    description: "Veículo padrão para até 4 passageiros",
    tag: "Mais popular",
    tagColor: "bg-[#25D366]",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  },
  {
    icon: Bike,
    name: "Moto",
    description: "Ideal para 1 pessoa com pressa",
    tag: "Mais rápido",
    tagColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80",
  },
  {
    icon: Crown,
    name: "Premium",
    description: "Veículo executivo com mais conforto",
    tag: "Mais conforto",
    tagColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  },
  {
    icon: Briefcase,
    name: "Corporativo",
    description: "Para empresas com faturamento mensal",
    tag: "Para empresas",
    tagColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1511527844068-006b95d162c2?w=400&q=80",
  },
];

export const VehicleTypesSection = () => {
  return (
    <section id="veiculos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Frota"
          title="Escolha seu veículo"
          subtitle="Temos a opção perfeita para cada situação."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {vehicleTypes.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-[#25D366]/50 hover:shadow-xl hover:shadow-[#25D366]/10 transition-all duration-500 h-full">
                {/* Tag */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${vehicle.tagColor} shadow-lg`}>
                    {vehicle.tag}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Icon overlay */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <vehicle.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {vehicle.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
