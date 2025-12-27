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
    title: "Só conversa, nada mais",
    description:
      "A IA entende você. Não precisa apertar botões, preencher formulários ou navegar menus. Só fala naturalmente.",
  },
  {
    icon: Users,
    title: "Motoristas locais de confiança",
    description:
      "Gente da sua cidade que você conhece. Não é um estranho de outro lugar.",
  },
  {
    icon: DollarSign,
    title: "Economia de tempo",
    description:
      "Não perde tempo com app complicado. A IA faz tudo automaticamente enquanto você cuida da sua vida.",
  },
  {
    icon: Shield,
    title: "Sempre disponível",
    description:
      "A IA trabalha 24h por dia. Manhã, tarde, noite, madrugada. Sempre pronta pra te atender.",
  },
  {
    icon: MapPin,
    title: "Conhece sua região",
    description:
      "A IA já sabe onde você está. Motoristas conhecem cada rua da cidade.",
  },
  {
    icon: CreditCard,
    title: "Sem complicação pra pagar",
    description:
      "Paga como quiser: dinheiro, cartão, Pix. Do jeito que for mais fácil pra você.",
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
          badge="Por que escolher Mi Chame"
          title="Automação que economiza seu tempo"
          subtitle="Enquanto apps complicados fazem você perder tempo, a IA do Mi Chame trabalha pra você."
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
