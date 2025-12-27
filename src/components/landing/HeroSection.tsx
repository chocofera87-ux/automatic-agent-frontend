import { MessageCircle, ArrowDown, Users, MapPin } from "lucide-react";
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
          {/* City driving video - taxi/transport theme */}
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback video source */}
          <source
            src="https://videos.pexels.com/video-files/1721294/1721294-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for readability - adjusted for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/90 via-[#141414]/80 to-[#141414]/90" />
      </div>

      {/* Animated Gradient Overlay - Yellow accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/5 via-transparent to-[#FFCC00]/5 z-[1]" />

      {/* Animated Circles - Yellow theme */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFCC00]/15 rounded-full blur-3xl animate-pulse-subtle z-[1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl animate-pulse-subtle z-[1]" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FFCC00]/5 to-[#FFCC00]/10 rounded-full blur-3xl z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Local trust focus */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 mb-8 animate-fade-in">
            <MapPin className="w-4 h-4 text-[#FFCC00]" />
            <span className="text-sm font-medium text-[#FFCC00]">
              Motoristas locais da sua cidade
            </span>
          </div>

          {/* Main Headline - Human/local focus */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Seu táxi de confiança,{" "}
            <span className="text-[#FFCC00]">
              sem baixar app
            </span>
          </h1>

          {/* Subheadline - Simple, human, local */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Chame um táxi pelo WhatsApp em segundos. Motoristas conhecidos da região,
            atendimento rápido e sem complicação. É só mandar uma mensagem!
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4 text-[#FFCC00]" />
              <span className="text-sm">Usado diariamente em Capivari</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Atendimento humano quando precisar</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="https://wa.me/5519992753360"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#FFCC00]/25 hover:shadow-xl hover:shadow-[#FFCC00]/40 transition-all duration-300 hover:scale-105 font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pedir um táxi agora
              </Button>
            </a>
            <Button
              size="lg"
              onClick={scrollToFeatures}
              className="bg-white hover:bg-gray-100 text-[#141414] text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              Como funciona
            </Button>
          </div>

          {/* Phone Mockup */}
          <div className="relative max-w-xs mx-auto animate-float">
            <div className="relative bg-[#141414] rounded-[3rem] p-3 shadow-2xl border border-[#FFCC00]/20">
              {/* Phone Frame */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar - Mi Chame Yellow/Black brand */}
                <div className="bg-[#141414] px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#141414]" />
                  </div>
                  <div>
                    <p className="text-[#FFCC00] font-semibold text-sm">Mi Chame</p>
                    <p className="text-gray-400 text-xs">online</p>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="bg-gray-100 p-4 space-y-3 min-h-[280px]">
                  {/* Bot Message */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-800">
                        Olá! Bem-vindo ao Mi Chame. Para onde você quer ir hoje?
                      </p>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:30</p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#FFCC00] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-sm text-[#141414]">
                        Quero ir do Centro para o Shopping
                      </p>
                      <p className="text-[10px] text-[#141414]/60 text-right mt-1">10:31</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm border border-gray-200">
                      <p className="text-sm text-gray-800">
                        Perfeito! O valor estimado é <strong className="text-[#141414]">R$ 25,00</strong>. Confirma a corrida?
                      </p>
                      <p className="text-[10px] text-gray-500 text-right mt-1">10:31</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect - Yellow */}
            <div className="absolute -inset-4 bg-[#FFCC00]/15 rounded-[4rem] blur-2xl -z-10" />
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToFeatures}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-[#FFCC00] transition-colors animate-bounce z-10"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
