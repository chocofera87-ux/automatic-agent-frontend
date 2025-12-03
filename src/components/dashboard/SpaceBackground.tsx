import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleDirection: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  hasRing: boolean;
}

export const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
      initializePlanets();
    };

    const initializeStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      starsRef.current = [];
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.01,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const initializePlanets = () => {
      const planetColors = [
        { color: 'hsl(199, 89%, 48%)', glowColor: 'hsla(199, 89%, 48%, 0.3)' }, // Primary blue
        { color: 'hsl(142, 71%, 45%)', glowColor: 'hsla(142, 71%, 45%, 0.3)' }, // Green
        { color: 'hsl(38, 92%, 50%)', glowColor: 'hsla(38, 92%, 50%, 0.3)' }, // Orange
        { color: 'hsl(280, 60%, 50%)', glowColor: 'hsla(280, 60%, 50%, 0.3)' }, // Purple
      ];

      planetsRef.current = [];
      
      for (let i = 0; i < 4; i++) {
        const colorSet = planetColors[i];
        planetsRef.current.push({
          x: canvas.width * (0.2 + Math.random() * 0.6),
          y: canvas.height * (0.2 + Math.random() * 0.6),
          radius: 15 + Math.random() * 25,
          color: colorSet.color,
          glowColor: colorSet.glowColor,
          orbitRadius: 30 + Math.random() * 50,
          orbitSpeed: 0.0003 + Math.random() * 0.0005,
          angle: Math.random() * Math.PI * 2,
          hasRing: Math.random() > 0.6,
        });
      }
    };

    const drawStar = (star: Star) => {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(210, 40%, 98%, ${star.opacity})`;
      ctx.fill();
      
      // Glow effect
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.radius * 2
      );
      gradient.addColorStop(0, `hsla(210, 40%, 98%, ${star.opacity * 0.5})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawPlanet = (planet: Planet) => {
      if (!ctx) return;

      const currentX = planet.x + Math.cos(planet.angle) * planet.orbitRadius;
      const currentY = planet.y + Math.sin(planet.angle) * planet.orbitRadius * 0.3;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        currentX, currentY, planet.radius * 0.5,
        currentX, currentY, planet.radius * 3
      );
      glowGradient.addColorStop(0, planet.glowColor);
      glowGradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(currentX, currentY, planet.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Planet body
      const bodyGradient = ctx.createRadialGradient(
        currentX - planet.radius * 0.3, currentY - planet.radius * 0.3, 0,
        currentX, currentY, planet.radius
      );
      bodyGradient.addColorStop(0, 'hsla(210, 40%, 98%, 0.9)');
      bodyGradient.addColorStop(0.5, planet.color);
      bodyGradient.addColorStop(1, 'hsla(222, 47%, 11%, 0.8)');
      
      ctx.beginPath();
      ctx.arc(currentX, currentY, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGradient;
      ctx.fill();

      // Ring if applicable
      if (planet.hasRing) {
        ctx.beginPath();
        ctx.ellipse(currentX, currentY, planet.radius * 1.8, planet.radius * 0.4, 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = `${planet.color.replace(')', ', 0.5)')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'hsl(222, 47%, 6%)');
      bgGradient.addColorStop(0.5, 'hsl(222, 47%, 8%)');
      bgGradient.addColorStop(1, 'hsl(230, 40%, 12%)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity >= 1 || star.opacity <= 0.2) {
          star.twinkleDirection *= -1;
        }
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        drawStar(star);
      });

      // Update and draw planets
      planetsRef.current.forEach((planet) => {
        planet.angle += planet.orbitSpeed;
        drawPlanet(planet);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};
