import { MessageCircle, MapPin, Check, Car } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Mande um oi",
    description: "Abra o WhatsApp e mande uma mensagem pra gente. Pode ser texto ou áudio!",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Diga pra onde vai",
    description: "Conte de onde você quer sair e pra onde quer ir. Simples assim.",
  },
  {
    icon: Check,
    number: "03",
    title: "Veja o preço e confirme",
    description: "A gente te fala o valor antes. Gostou? É só confirmar a corrida.",
  },
  {
    icon: Car,
    number: "04",
    title: "Seu táxi tá chegando!",
    description: "Pronto! Um motorista da região já está a caminho pra te buscar.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image - WhatsApp/messaging theme */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Passo a Passo"
          title="É muito fácil de usar"
          subtitle="Qualquer pessoa consegue. É só mandar uma mensagem, igual você faz com seus amigos."
        />

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 xl:top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFCC00]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Card */}
                <div className="text-center group">
                  {/* Icon Container */}
                  <div className="relative inline-flex mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-[#FFCC00] flex items-center justify-center shadow-lg shadow-[#FFCC00]/20 group-hover:scale-110 transition-transform duration-300 touch-manipulation">
                      <step.icon className="w-7 h-7 sm:w-9 sm:h-9 text-[#141414]" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground text-background text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 px-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs mx-auto px-4">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center my-4">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#FFCC00]/50 to-transparent" />
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
