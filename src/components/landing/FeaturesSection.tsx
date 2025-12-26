import {
  MessageSquare,
  Sparkles,
  DollarSign,
  Shield,
  MapPin,
  CreditCard,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: MessageSquare,
    title: "Pelo WhatsApp",
    description:
      "Peça seu táxi diretamente pelo WhatsApp, sem instalar nenhum app adicional. Simples assim.",
  },
  {
    icon: Sparkles,
    title: "IA que Entende Você",
    description:
      "Nossa inteligência artificial entende mensagens de texto e áudio em português natural.",
  },
  {
    icon: DollarSign,
    title: "Preço na Hora",
    description:
      "Saiba o valor da corrida antes de confirmar. Transparência total, sem surpresas no final.",
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description:
      "Motoristas experientes e verificados da nossa frota local. Sua segurança é prioridade.",
  },
  {
    icon: MapPin,
    title: "Cobertura Ampla",
    description:
      "Atendemos Capivari, Rafard, Santa Bárbara d'Oeste, Americana, Nova Odessa e região.",
  },
  {
    icon: CreditCard,
    title: "Pague Como Quiser",
    description:
      "Dinheiro, débito, crédito, Pix ou PicPay. Você escolhe a forma de pagamento.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/95 via-muted/90 to-muted/95" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Recursos"
          title="Por que escolher o Mi Chame?"
          subtitle="Combinamos tecnologia moderna com o serviço de táxi tradicional que você confia."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
