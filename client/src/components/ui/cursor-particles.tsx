import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

export function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const { x: prevX, y: prevY } = mouseRef.current;
      mouseRef.current = { x: e.clientX, y: e.clientY, prevX, prevY };

      const speed = Math.hypot(e.clientX - prevX, e.clientY - prevY);
      
      if (speed > 1) {
        const particleCount = Math.min(Math.floor(speed / 3), 3);
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            maxLife: 60 + Math.random() * 40,
            hue: 210 + Math.random() * 60,
            size: 2 + Math.random() * 3,
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05;
        particle.life++;

        const alpha = 1 - particle.life / particle.maxLife;
        
        if (alpha <= 0) return false;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99] opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
