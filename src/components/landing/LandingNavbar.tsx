import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#recursos", label: "Vantagens" },
    { href: "#como-funciona", label: "Como Funciona" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#cobertura", label: "Cobertura" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md border-b border-[#FFCC00]/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5 text-[#141414]" />
            </div>
            <span className="text-xl font-bold text-white">Mi Chame</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-300 hover:text-[#FFCC00] transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#141414]"
              >
                Entrar
              </Button>
            </Link>
            <a
              href="https://wa.me/5519992753360"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] shadow-lg font-semibold">
                Pedir Táxi
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#FFCC00]/10 bg-[#141414]/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 hover:text-[#FFCC00] transition-colors font-medium py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#FFCC00]/10">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#141414]"
                  >
                    Entrar
                  </Button>
                </Link>
                <a
                  href="https://wa.me/5519992753360"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FFCC00] hover:bg-[#E6B800] text-[#141414] font-semibold">
                    Pedir Táxi
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
