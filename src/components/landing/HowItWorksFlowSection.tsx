import { MessageCircle, Sparkles, Car } from "lucide-react";

export const HowItWorksFlowSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background to-[#141414]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFCC00]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Como funciona na prática?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Três passos simples. Economia de tempo. Automação total.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
            {/* Connection lines - Desktop only */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFCC00]/30 to-transparent" />

            {/* Step 1: User Speaks */}
            <div className="relative">
              <div className="text-center group">
                {/* Icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-xl shadow-[#FFCC00]/30 group-hover:scale-110 transition-all duration-500">
                    <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#141414]" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#141414] text-sm font-bold flex items-center justify-center shadow-lg">
                    1
                  </div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#FFCC00] opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Você fala
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                  "Preciso de um táxi do centro pro shopping"
                </p>

                {/* Demo bubble */}
                <div className="mt-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-4 max-w-xs mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-white font-medium">Você</p>
                      <p className="text-xs text-gray-400 mt-1">Preciso de um táxi...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow - Mobile */}
              <div className="md:hidden flex justify-center my-6">
                <div className="w-0.5 h-8 bg-gradient-to-b from-[#FFCC00] to-transparent" />
              </div>
            </div>

            {/* Step 2: AI Understands */}
            <div className="relative">
              <div className="text-center group">
                {/* Icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-all duration-500">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#141414] text-sm font-bold flex items-center justify-center shadow-lg">
                    2
                  </div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  A IA entende
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Processa, entende e automaticamente pede o táxi
                </p>

                {/* Demo AI processing */}
                <div className="mt-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4 max-w-xs mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-white font-medium">IA Mi Chame</p>
                      <p className="text-xs text-gray-400 mt-1">Entendido! Pedindo táxi...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow - Mobile */}
              <div className="md:hidden flex justify-center my-6">
                <div className="w-0.5 h-8 bg-gradient-to-b from-[#FFCC00] to-transparent" />
              </div>
            </div>

            {/* Step 3: Car Arrives */}
            <div className="relative">
              <div className="text-center group">
                {/* Icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/30 group-hover:scale-110 transition-all duration-500">
                    <Car className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-[#141414] text-sm font-bold flex items-center justify-center shadow-lg">
                    3
                  </div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-green-500 opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Táxi chega
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Motorista local a caminho em minutos
                </p>

                {/* Demo confirmation */}
                <div className="mt-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4 max-w-xs mx-auto">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Táxi</span>
                      <span className="text-white font-mono">ABC-1234</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Motorista</span>
                      <span className="text-white">João Silva</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Chegada</span>
                      <span className="text-green-400 font-semibold">5 minutos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-gray-400 mb-6">
            Sem app complicado. Sem formulários. Só conversa.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/20">
            <Sparkles className="w-4 h-4 text-[#FFCC00]" />
            <span className="text-sm text-[#FFCC00] font-semibold">
              Economia de tempo: automação total
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
