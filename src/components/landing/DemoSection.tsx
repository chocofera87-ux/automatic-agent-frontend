import { MessageCircle, Sparkles, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DemoSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#141414]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-purple-500/15 text-purple-400 border-2 border-purple-500/40 mb-4 backdrop-blur-sm shadow-lg">
            Veja funcionando
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Conversa real com a IA
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            É assim que funciona. Simples, rápido e natural.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Chat Demo */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#E6B800] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-[#141414]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">IA Mi Chame</p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Online agora
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                  {/* User message 1 */}
                  <div className="flex justify-end animate-fade-in">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-lg">
                      <p className="text-white text-sm">
                        Oi, preciso de um táxi
                      </p>
                      <p className="text-xs text-blue-200 mt-1 text-right">14:32</p>
                    </div>
                  </div>

                  {/* AI response 1 */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-lg border border-white/20">
                      <p className="text-white text-sm">
                        Oi! Claro, vou te ajudar. De onde você quer sair?
                      </p>
                      <p className="text-xs text-gray-400 mt-1 text-right">14:32</p>
                    </div>
                  </div>

                  {/* User message 2 */}
                  <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-lg">
                      <p className="text-white text-sm">
                        Do centro, perto da praça. Vou pro shopping
                      </p>
                      <p className="text-xs text-blue-200 mt-1 text-right">14:33</p>
                    </div>
                  </div>

                  {/* AI response 2 */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.9s' }}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-lg border border-white/20">
                      <p className="text-white text-sm mb-3">
                        Perfeito! Encontrei um táxi pra você:
                      </p>
                      {/* Ride details card */}
                      <div className="bg-gradient-to-br from-[#FFCC00]/20 to-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Motorista</span>
                          <span className="text-white font-semibold">João Silva</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Veículo</span>
                          <span className="text-white font-mono">ABC-1234</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Valor</span>
                          <span className="text-[#FFCC00] font-bold">R$ 25,00</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Chegada</span>
                          <span className="text-green-400 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            5 minutos
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-right">14:33</p>
                    </div>
                  </div>

                  {/* User confirmation */}
                  <div className="flex justify-end animate-fade-in" style={{ animationDelay: '1.2s' }}>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-lg">
                      <p className="text-white text-sm">
                        Ótimo! Confirma pra mim
                      </p>
                      <p className="text-xs text-blue-200 mt-1 text-right">14:34</p>
                    </div>
                  </div>

                  {/* AI confirmation */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/30 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-white text-sm font-semibold">
                          Táxi confirmado!
                        </p>
                      </div>
                      <p className="text-white text-sm">
                        O João já está a caminho. Chega em 5 minutos.
                      </p>
                      <p className="text-xs text-gray-400 mt-2 text-right">14:34</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  É assim que você economiza tempo
                </h3>

                <div className="space-y-4">
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[#141414]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Conversa natural</p>
                      <p className="text-sm text-gray-400">Sem botões, sem menus. Fala como fala com um amigo.</p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">IA que entende</p>
                      <p className="text-sm text-gray-400">Não precisa ser exato. A IA entende o que você quer dizer.</p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Automação total</p>
                      <p className="text-sm text-gray-400">A IA pede o táxi automaticamente. Você só espera chegar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="https://wa.me/5519992753360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Experimentar agora
                  </Button>
                </a>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Sem cadastro • Sem complicação • Grátis pra testar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
