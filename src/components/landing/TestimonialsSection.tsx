import { Star, Quote, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    location: "Capivari",
    text: "Muito prático! Não preciso baixar nada, só mando mensagem e o táxi chega rapidinho. Os motoristas são conhecidos aqui da cidade.",
    rating: 5,
  },
  {
    name: "João Carlos",
    location: "Rafard",
    text: "Uso toda semana pra ir ao médico. O atendimento é rápido e sempre tem motorista disponível. Recomendo pra todo mundo!",
    rating: 5,
  },
  {
    name: "Ana Paula",
    location: "Santa Bárbara d'Oeste",
    text: "Finalmente um jeito fácil de chamar táxi! Minha mãe de 70 anos consegue usar sem problema. É só mandar mensagem no WhatsApp.",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Corridas por mês" },
  { value: "50+", label: "Motoristas parceiros" },
  { value: "8", label: "Cidades atendidas" },
  { value: "4.9", label: "Avaliação média" },
];

export const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#141414] to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/30 mb-4">
            Quem usa, recomenda
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A opinião de quem já usou
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Veja o que as pessoas da região estão falando sobre o Mi Chame.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FFCC00]/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-8 h-8 text-[#FFCC00]" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFCC00] text-[#FFCC00]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                  <span className="text-[#141414] font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Junte-se a centenas de pessoas que já usam o Mi Chame no dia a dia.
          </p>
        </div>
      </div>
    </section>
  );
};
