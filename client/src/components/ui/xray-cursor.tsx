import { useEffect, useRef } from "react";

export function XrayCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const frameRef = useRef<number>(0);
  const gridPointsRef = useRef<{ x: number; y: number; baseHue: number }[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      gridPointsRef.current = [];
      const spacing = 40;
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          gridPointsRef.current.push({
            x,
            y,
            baseHue: Math.random() * 60 + 180,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -200, y: -200 };
    };

    const animate = () => {
      timeRef.current += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const revealRadius = 150;
      const fadeRadius = 250;

      gridPointsRef.current.forEach((point) => {
        const dx = point.x - mx;
        const dy = point.y - my;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < fadeRadius) {
          const intensity = Math.max(0, 1 - distance / fadeRadius);
          const pulseIntensity = intensity * (0.5 + 0.5 * Math.sin(timeRef.current * 2 + point.x * 0.01 + point.y * 0.01));
          
          const hue = point.baseHue + Math.sin(timeRef.current + point.x * 0.005) * 30;
          const saturation = 80 + pulseIntensity * 20;
          const lightness = 50 + pulseIntensity * 20;
          
          ctx.beginPath();
          const size = 2 + intensity * 4;
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${intensity * 0.8})`;
          ctx.fill();

          if (distance < revealRadius) {
            gridPointsRef.current.forEach((otherPoint) => {
              const odx = otherPoint.x - mx;
              const ody = otherPoint.y - my;
              const otherDistance = Math.sqrt(odx * odx + ody * ody);
              
              if (otherDistance < revealRadius) {
                const pdx = otherPoint.x - point.x;
                const pdy = otherPoint.y - point.y;
                const pointDist = Math.sqrt(pdx * pdx + pdy * pdy);
                
                if (pointDist > 0 && pointDist <= 60) {
                  const lineIntensity = (1 - distance / revealRadius) * (1 - otherDistance / revealRadius) * (1 - pointDist / 60);
                  ctx.beginPath();
                  ctx.moveTo(point.x, point.y);
                  ctx.lineTo(otherPoint.x, otherPoint.y);
                  ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${lineIntensity * 0.3})`;
                  ctx.lineWidth = 1;
                  ctx.stroke();
                }
              }
            });
          }
        }
      });

      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, revealRadius);
        gradient.addColorStop(0, "rgba(100, 200, 255, 0.1)");
        gradient.addColorStop(0.5, "rgba(150, 100, 255, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mx, my, revealRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
