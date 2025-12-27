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
    <section id="depoimentos" className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background with animated elements */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#141414] to-background" />
        {/* Animated glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with animation */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#FFCC00]/15 text-[#FFCC00] border-2 border-[#FFCC00]/40 mb-4 backdrop-blur-sm shadow-lg shadow-[#FFCC00]/10 animate-fade-in">
            Quem usa, recomenda
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A opinião de quem já usou
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Veja o que as pessoas da região estão falando sobre o Mi Chame.
          </p>
        </div>

        {/* Stats with enhanced animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[#FFCC00]/50 hover:shadow-xl hover:shadow-[#FFCC00]/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFCC00] mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
              {/* Bottom shine */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFCC00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Testimonials Grid with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-[#FFCC00]/40 hover:shadow-2xl hover:shadow-[#FFCC00]/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/0 to-[#FFCC00]/0 group-hover:from-[#FFCC00]/10 group-hover:to-transparent transition-all duration-500" />

              {/* Quote Icon with animation */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFCC00] group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Rating with stagger animation */}
              <div className="relative flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFCC00] text-[#FFCC00] transform transition-all duration-300 group-hover:scale-125"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="relative text-gray-300 text-sm sm:text-base mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                "{testimonial.text}"
              </p>

              {/* Author with avatar animation */}
              <div className="relative flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-lg shadow-[#FFCC00]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <span className="text-[#141414] font-bold text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </span>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#FFCC00] opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCC00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center mt-10 sm:mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-500 text-xs sm:text-sm">
            Junte-se a centenas de pessoas que já usam o Mi Chame no dia a dia.
          </p>
        </div>
      </div>
    </section>
  );
};
