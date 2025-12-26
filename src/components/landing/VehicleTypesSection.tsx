import { Car, Bike, Crown, Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const vehicleTypes = [
  {
    icon: Car,
    name: "Carro",
    description: "Veículo padrão para até 4 passageiros",
    tag: "Mais popular",
    tagColor: "bg-[#25D366]",
  },
  {
    icon: Bike,
    name: "Moto",
    description: "Ideal para 1 pessoa com pressa",
    tag: "Mais rápido",
    tagColor: "bg-blue-500",
  },
  {
    icon: Crown,
    name: "Premium",
    description: "Veículo executivo com mais conforto",
    tag: "Mais conforto",
    tagColor: "bg-amber-500",
  },
  {
    icon: Briefcase,
    name: "Corporativo",
    description: "Para empresas com faturamento mensal",
    tag: "Para empresas",
    tagColor: "bg-purple-500",
  },
];

export const VehicleTypesSection = () => {
  return (
    <section id="veiculos" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
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
              <div className="group relative bg-card border border-border rounded-2xl p-6 hover:border-[#25D366]/50 hover:shadow-lg hover:shadow-[#25D366]/5 transition-all duration-300 text-center h-full">
                {/* Tag */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${vehicle.tagColor} shadow-sm`}>
                    {vehicle.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mt-4 mb-6 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <vehicle.icon className="w-10 h-10 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
