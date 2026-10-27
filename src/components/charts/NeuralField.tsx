"use client";

import { useEffect, useRef } from "react";

type Props = {
  density?: "normal" | "dense";
  className?: string;
};

export default function NeuralField({ density = "normal", className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    type Node = { x: number; y: number; phase: number; radius: number; speed: number };
    let nodes: Node[] = [];
    const count = density === "dense" ? 72 : 48;
    const reach = 132;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      let seed = 831;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      nodes = Array.from({ length: count }, (_, i) => ({
        x: random() * width,
        y: random() * height,
        phase: random() * Math.PI * 2,
        radius: i % 9 === 0 ? 3.1 : 1.15 + random() * 1.2,
        speed: 0.00035 + random() * 0.0007,
      }));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const points = nodes.map((node) => ({
        x: node.x + Math.sin(now * node.speed + node.phase) * 7,
        y: node.y + Math.cos(now * node.speed * 0.83 + node.phase) * 6,
        r: node.radius,
        phase: node.phase,
      }));

      const connections: { a: (typeof points)[0]; b: (typeof points)[0]; phase: number }[] = [];
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          if (distance < reach) {
            const opacity = (1 - distance / reach) * 0.38;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(255,140,0,${opacity})`;
            context.lineWidth = 0.7;
            context.stroke();
            connections.push({ a, b, phase: (i * 13 + j * 7) % 1900 });
          }
        }
      }

      connections.forEach(({ a, b, phase }) => {
        const progress = (now * 0.00032 + phase / 1900) % 1;
        const x = a.x + (b.x - a.x) * progress;
        const y = a.y + (b.y - a.y) * progress;
        context.beginPath();
        context.arc(x, y, 1.4, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,179,71,0.85)";
        context.fill();
      });

      points.forEach((p) => {
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,140,0,0.72)";
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
