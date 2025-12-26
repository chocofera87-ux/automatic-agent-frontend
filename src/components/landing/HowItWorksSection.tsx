import { MessageCircle, MapPin, Check, Car } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Envie uma mensagem",
    description: "Mande um 'oi' para nosso WhatsApp e comece a conversa",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Informe os locais",
    description: "Diga de onde você quer sair e para onde quer ir",
  },
  {
    icon: Check,
    number: "03",
    title: "Confirme o preço",
    description: "Veja o valor estimado da corrida e confirme o pedido",
  },
  {
    icon: Car,
    number: "04",
    title: "Aguarde o motorista",
    description: "Acompanhe em tempo real a chegada do seu táxi",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Passo a Passo"
          title="Como funciona?"
          subtitle="Pedir um táxi nunca foi tão fácil. Veja como é simples."
        />

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#25D366]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Card */}
                <div className="text-center group">
                  {/* Icon Container */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-[#25D366]/20 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-9 h-9 text-white" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#25D366]/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
