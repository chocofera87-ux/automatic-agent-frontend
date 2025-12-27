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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col justify-center h-full">
          {/* Badge - Local trust focus with enhanced styling */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00]/15 border-2 border-[#FFCC00]/40 backdrop-blur-sm mb-4 animate-fade-in shadow-lg shadow-[#FFCC00]/10">
            <MapPin className="w-4 h-4 text-[#FFCC00]" />
            <span className="text-xs font-semibold text-[#FFCC00] tracking-wide">
              Motoristas locais da sua cidade
            </span>
          </div>

          {/* Main Headline - Optimized for full screen */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-fade-in leading-tight tracking-tight" style={{ animationDelay: "0.1s" }}>
            Seu táxi de confiança,{" "}
            <span className="text-[#FFCC00] drop-shadow-[0_0_30px_rgba(255,204,0,0.5)]">
              sem baixar app
            </span>
          </h1>

          {/* Subheadline - Optimized */}
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-6 animate-fade-in leading-relaxed font-light" style={{ animationDelay: "0.2s" }}>
            Chame um táxi pelo WhatsApp em segundos. Motoristas conhecidos da região,
            atendimento rápido e sem complicação. É só mandar uma mensagem!
          </p>

          {/* Trust indicators with icons - Compact */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Car className="w-4 h-4 text-[#FFCC00]" />
              <span className="text-xs font-medium text-gray-200">Frota local</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Clock className="w-4 h-4 text-[#FFCC00]" />
              <span className="text-xs font-medium text-gray-200">Resposta rápida</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Shield className="w-4 h-4 text-[#FFCC00]" />
              <span className="text-xs font-medium text-gray-200">Confiável e seguro</span>
            </div>
          </div>

          {/* CTA Buttons - Compact design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="https://wa.me/5519992753360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                className="w-full sm:w-auto bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] text-base px-8 py-5 rounded-2xl shadow-2xl shadow-[#FFCC00]/30 hover:shadow-[#FFCC00]/50 transition-all duration-300 hover:scale-105 font-bold tracking-wide border-2 border-[#FFCC00]/50 hover:border-[#FFCC00]"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pedir um táxi agora
              </Button>
            </a>
            <Button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-base px-8 py-5 rounded-2xl shadow-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Como funciona
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Phone Mockup - Compact design */}
          <div className="relative max-w-xs mx-auto animate-float">
            <div className="relative bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border-2 border-[#FFCC00]/30">
              {/* Phone Frame */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                {/* Status Bar - Mi Chame Yellow/Black brand */}
                <div className="bg-gradient-to-r from-[#141414] to-[#1f1f1f] px-4 py-3 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-lg shadow-[#FFCC00]/50">
                    <MessageCircle className="w-5 h-5 text-[#141414]" />
                  </div>
                  <div>
                    <p className="text-[#FFCC00] font-bold text-sm">Mi Chame</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      online
                    </p>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-3 space-y-2.5 min-h-[200px]">
                  {/* Bot Message */}
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-md border border-gray-200">
                      <p className="text-xs text-gray-800 leading-relaxed">
                        Olá! Para onde você quer ir?
                      </p>
                      <p className="text-[9px] text-gray-400 text-right mt-1">10:30</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="bg-gradient-to-br from-[#FFCC00] to-[#E6B800] rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-md">
                      <p className="text-xs text-[#141414] font-medium leading-relaxed">
                        Centro para o Shopping
                      </p>
                      <p className="text-[9px] text-[#141414]/60 text-right mt-1">10:31</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-md border border-gray-200">
                      <p className="text-xs text-gray-800 leading-relaxed">
                        Perfeito! Valor: <strong className="text-[#FFCC00]">R$ 25,00</strong>
                      </p>
                      <p className="text-[9px] text-gray-400 text-right mt-1">10:31</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Glow Effect - Yellow with multiple layers */}
            <div className="absolute -inset-4 bg-[#FFCC00]/20 rounded-[4rem] blur-2xl -z-10 animate-pulse-slow" />
            <div className="absolute -inset-6 bg-[#FFCC00]/10 rounded-[5rem] blur-[80px] -z-10" />
          </div>

          {/* Scroll Indicator - Positioned at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
              onClick={scrollToFeatures}
              className="text-gray-300 hover:text-[#FFCC00] transition-all duration-300 animate-bounce p-2 rounded-full hover:bg-[#FFCC00]/10"
              aria-label="Scroll to features"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
