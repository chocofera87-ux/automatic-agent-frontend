import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/95 to-[#128C7E]/95 z-[1]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-[2]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-[2]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
            <Phone className="w-10 h-10 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para experimentar?
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Chame seu táxi agora mesmo pelo WhatsApp.
            É rápido, fácil e sem complicação.
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/5519992753360"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-white text-[#25D366] hover:bg-white/90 text-lg px-10 py-7 rounded-xl shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Chamar Táxi Agora
            </Button>
          </a>

          {/* Phone Number */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
            <Phone className="w-4 h-4" />
            <span className="font-mono text-lg">(19) 99275-3360</span>
          </div>
        </div>
      </div>
    </section>
  );
};
