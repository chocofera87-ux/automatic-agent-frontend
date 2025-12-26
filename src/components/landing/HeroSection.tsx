import { MessageCircle, ArrowDown, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const scrollToFeatures = () => {
    const element = document.querySelector("#recursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
        >
          {/* Taxi/City driving video */}
          <source
            src="https://cdn.coverr.co/videos/coverr-driving-through-a-city-at-night-4866/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 via-transparent to-[#128C7E]/10 z-[1]" />

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#25D366]/20 rounded-full blur-3xl animate-pulse-subtle z-[1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#128C7E]/20 rounded-full blur-3xl animate-pulse-subtle z-[1]" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-full blur-3xl z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#25D366]" />
            <span className="text-sm font-medium text-[#25D366]">
              Tecnologia + Tradição
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Peça seu táxi pelo{" "}
            <span className="bg-gradient-to-r from-[#25D366] to-[#128C7E] bg-clip-text text-transparent">
              WhatsApp
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            O Mi Chame é o sistema mais fácil de chamar táxi na região de São Paulo.
            Basta enviar uma mensagem e nossa IA cuida do resto.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="https://wa.me/5519992753360"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chamar pelo WhatsApp
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToFeatures}
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-muted"
            >
              Saber Mais
            </Button>
          </div>

          {/* Phone Mockup */}
          <div className="relative max-w-xs mx-auto animate-float">
            <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
              {/* Phone Frame */}
              <div className="bg-background rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-[#25D366] px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Mi Chame</p>
                    <p className="text-white/70 text-xs">online</p>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[280px]">
                  {/* Bot Message */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-800">
                        Olá! Bem-vindo ao Mi Chame. Para onde você quer ir hoje?
                      </p>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:30</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-800">
                        Quero ir do Centro para o Shopping
                      </p>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:31</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-800">
                        Perfeito! O valor estimado é <strong>R$ 25,00</strong>. Confirma a corrida?
                      </p>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:31</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 rounded-[4rem] blur-2xl -z-10" />
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToFeatures}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce z-10"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
