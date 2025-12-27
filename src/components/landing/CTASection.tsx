import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Video Background - City street/taxi theme - Hidden on mobile for performance */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden sm:block absolute w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
        >
          {/* City night driving video from Pixabay (reliable CDN) */}
          <source
            src="https://cdn.pixabay.com/video/2016/09/21/5373-183629362_large.mp4"
            type="video/mp4"
          />
          {/* Fallback: Urban traffic video */}
          <source
            src="https://cdn.pixabay.com/video/2020/07/30/45913-446235982_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Mobile fallback - Image instead of video */}
        <div className="sm:hidden absolute inset-0 bg-[#141414]" />
      </div>

      {/* Dark Gradient Overlay with Yellow accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414]/98 via-[#141414]/95 to-[#141414]/98 sm:from-[#141414]/95 sm:via-[#141414]/90 sm:to-[#141414]/95 z-[1]" />

      {/* Decorative Elements - Yellow glow - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-[2]" />
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-[2]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-xl sm:rounded-2xl bg-[#FFCC00] flex items-center justify-center animate-float shadow-lg shadow-[#FFCC00]/30">
            <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-[#141414]" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Precisa de um táxi agora?
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto px-4">
            É só mandar uma mensagem no WhatsApp.
            Nossos motoristas estão prontos pra te atender!
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/5519992753360"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto px-4 sm:px-0"
          >
            <Button
              className="w-full sm:w-auto bg-[#FFCC00] text-[#141414] hover:bg-[#E6B800] active:bg-[#D4A800] text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 rounded-xl shadow-xl shadow-[#FFCC00]/20 hover:shadow-2xl hover:shadow-[#FFCC00]/30 sm:hover:scale-105 active:scale-95 transition-all duration-300 font-semibold touch-manipulation"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Pedir um táxi agora
            </Button>
          </a>

          {/* Phone Number */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-gray-400">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <a href="tel:+5519992753360" className="font-mono text-base sm:text-lg hover:text-[#FFCC00] transition-colors">
              (19) 99275-3360
            </a>
          </div>

          {/* Trust message */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 px-4">
            Atendemos Capivari, Rafard, Santa Bárbara e região
          </p>
        </div>
      </div>
    </section>
  );
};
