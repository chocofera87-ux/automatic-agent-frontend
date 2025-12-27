import {
  MessageSquare,
  Users,
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
    title: "Sem baixar aplicativo",
    description:
      "Peça seu táxi direto pelo WhatsApp que você já usa. Nada de instalar app novo ou criar conta.",
  },
  {
    icon: Users,
    title: "Motoristas da região",
    description:
      "Nossos motoristas são conhecidos aqui da cidade. Gente de confiança que você pode encontrar na rua.",
  },
  {
    icon: DollarSign,
    title: "Preço combinado antes",
    description:
      "Você sabe o valor antes de confirmar. Sem surpresas, sem taxas escondidas. Preço justo e transparente.",
  },
  {
    icon: Shield,
    title: "Atendimento humano",
    description:
      "Precisou de ajuda? Tem sempre alguém disponível pra te atender. Nada de robô te enrolando.",
  },
  {
    icon: MapPin,
    title: "Conhecemos a região",
    description:
      "Capivari, Rafard, Santa Bárbara, Americana... Nossos motoristas conhecem cada rua e atalho.",
  },
  {
    icon: CreditCard,
    title: "Pague do seu jeito",
    description:
      "Dinheiro, cartão, Pix ou PicPay. Você escolhe como quer pagar, sem complicação.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image - People using phones */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/95 via-muted/90 to-muted/95" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Vantagens"
          title="Por que as pessoas escolhem o Mi Chame?"
          subtitle="Serviço local de confiança, do jeito que você gosta. Simples, rápido e sem complicação."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
