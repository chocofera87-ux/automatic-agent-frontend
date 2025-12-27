import { MessageCircle, ArrowDown, MapPin, Car, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToFeatures = () => {
    const element = document.querySelector("#recursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - City/taxi driving theme */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
        >
          {/* Local video - taxi/transport theme */}
          <source
            src="/215500_medium.mp4"
            type="video/mp4"
          />
        </video>
        {/* Enhanced dark overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/95 via-[#141414]/85 to-[#141414]/95" />
        {/* Vignette effect for cinematic look */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,20,20,0.4)_100%)]" />
      </div>

      {/* Animated Gradient Overlay - Subtle yellow glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/10 via-transparent to-[#FFCC00]/5 z-[1] animate-pulse-slow" />

      {/* Animated Light Effects - Yellow theme */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFCC00]/20 rounded-full blur-[100px] animate-pulse-subtle z-[1]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FFCC00]/15 rounded-full blur-[120px] animate-pulse-subtle z-[1]" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#FFCC00]/10 rounded-full blur-[80px] animate-float z-[1]" style={{ animationDelay: "0.5s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge - Local trust focus with enhanced styling */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFCC00]/15 border-2 border-[#FFCC00]/40 backdrop-blur-sm mb-8 animate-fade-in shadow-lg shadow-[#FFCC00]/10">
            <MapPin className="w-5 h-5 text-[#FFCC00]" />
            <span className="text-sm font-semibold text-[#FFCC00] tracking-wide">
              Motoristas locais da sua cidade
            </span>
          </div>

          {/* Main Headline - Enhanced typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 animate-fade-in leading-tight tracking-tight" style={{ animationDelay: "0.1s" }}>
            Seu táxi de confiança,{" "}
            <span className="text-[#FFCC00] drop-shadow-[0_0_30px_rgba(255,204,0,0.5)]">
              sem baixar app
            </span>
          </h1>

          {/* Subheadline - Enhanced readability */}
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed font-light" style={{ animationDelay: "0.2s" }}>
            Chame um táxi pelo WhatsApp em segundos. Motoristas conhecidos da região,
            atendimento rápido e sem complicação. É só mandar uma mensagem!
          </p>

          {/* Trust indicators with icons */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Car className="w-5 h-5 text-[#FFCC00]" />
              <span className="text-sm font-medium text-gray-200">Frota local</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Clock className="w-5 h-5 text-[#FFCC00]" />
              <span className="text-sm font-medium text-gray-200">Resposta rápida</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Shield className="w-5 h-5 text-[#FFCC00]" />
              <span className="text-sm font-medium text-gray-200">Confiável e seguro</span>
            </div>
          </div>

          {/* CTA Buttons - Enhanced design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="https://wa.me/5519992753360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-[#FFCC00]/30 hover:shadow-[#FFCC00]/50 transition-all duration-300 hover:scale-105 font-bold tracking-wide border-2 border-[#FFCC00]/50 hover:border-[#FFCC00]"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Pedir um táxi agora
              </Button>
            </a>
            <Button
              size="lg"
              onClick={scrollToFeatures}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg px-10 py-7 rounded-2xl shadow-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Como funciona
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Phone Mockup - Enhanced premium design */}
          <div className="relative max-w-sm mx-auto animate-float">
            <div className="relative bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-[3.5rem] p-4 shadow-2xl border-2 border-[#FFCC00]/30">
              {/* Phone Frame */}
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-inner">
                {/* Status Bar - Mi Chame Yellow/Black brand */}
                <div className="bg-gradient-to-r from-[#141414] to-[#1f1f1f] px-6 py-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-lg shadow-[#FFCC00]/50">
                    <MessageCircle className="w-6 h-6 text-[#141414]" />
                  </div>
                  <div>
                    <p className="text-[#FFCC00] font-bold text-base">Mi Chame</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      online
                    </p>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 space-y-4 min-h-[300px]">
                  {/* Bot Message */}
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md border border-gray-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        Olá! Bem-vindo ao Mi Chame. Para onde você quer ir hoje?
                      </p>
                      <p className="text-[10px] text-gray-400 text-right mt-1.5">10:30</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="bg-gradient-to-br from-[#FFCC00] to-[#E6B800] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-md">
                      <p className="text-sm text-[#141414] font-medium leading-relaxed">
                        Quero ir do Centro para o Shopping
                      </p>
                      <p className="text-[10px] text-[#141414]/60 text-right mt-1.5">10:31</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md border border-gray-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        Perfeito! O valor estimado é <strong className="text-[#FFCC00]">R$ 25,00</strong>. Confirma a corrida?
                      </p>
                      <p className="text-[10px] text-gray-400 text-right mt-1.5">10:31</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Glow Effect - Yellow with multiple layers */}
            <div className="absolute -inset-6 bg-[#FFCC00]/20 rounded-[5rem] blur-3xl -z-10 animate-pulse-slow" />
            <div className="absolute -inset-8 bg-[#FFCC00]/10 rounded-[6rem] blur-[100px] -z-10" />
          </div>

          {/* Scroll Indicator - Enhanced */}
          <button
            onClick={scrollToFeatures}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 hover:text-[#FFCC00] transition-all duration-300 animate-bounce z-10 p-2 rounded-full hover:bg-[#FFCC00]/10"
            aria-label="Scroll to features"
          >
            <ArrowDown className="w-7 h-7" />
          </button>
        </div>
      </div>
    </section>
  );
};
