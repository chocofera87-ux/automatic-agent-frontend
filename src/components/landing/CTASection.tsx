import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image - Brazilian city street */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay with Yellow accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414]/95 via-[#141414]/90 to-[#141414]/95 z-[1]" />

      {/* Decorative Elements - Yellow glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-[2]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-[2]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#FFCC00] flex items-center justify-center animate-float shadow-lg shadow-[#FFCC00]/30">
            <Phone className="w-10 h-10 text-[#141414]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Precisa de um táxi agora?
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            É só mandar uma mensagem no WhatsApp.
            Nossos motoristas estão prontos pra te atender!
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
              className="bg-[#FFCC00] text-[#141414] hover:bg-[#E6B800] text-lg px-10 py-7 rounded-xl shadow-xl shadow-[#FFCC00]/20 hover:shadow-2xl hover:shadow-[#FFCC00]/30 hover:scale-105 transition-all duration-300 font-semibold"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Pedir um táxi agora
            </Button>
          </a>

          {/* Phone Number */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" />
            <span className="font-mono text-lg">(19) 99275-3360</span>
          </div>

          {/* Trust message */}
          <p className="mt-4 text-sm text-gray-500">
            Atendemos Capivari, Rafard, Santa Bárbara e região
          </p>
        </div>
      </div>
    </section>
  );
};
