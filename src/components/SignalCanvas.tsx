"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  tint: number;
};

export function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let particles: Particle[] = [];

    const createParticles = () => {
      const density = Math.min(90, Math.max(42, Math.floor(width / 18)));
      particles = Array.from({ length: density }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        radius: 1 + Math.random() * 1.6,
        tint: index % 4
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const drawGrid = () => {
      context.save();
      context.strokeStyle = "rgba(244, 239, 226, 0.055)";
      context.lineWidth = 1;
      const gap = 48;

      for (let x = 0; x <= width; x += gap) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y <= height; y += gap) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.restore();
    };

    const colorFor = (tint: number, alpha: number) => {
      const palette = [
        `rgba(101, 242, 194, ${alpha})`,
        `rgba(248, 193, 93, ${alpha})`,
        `rgba(255, 111, 97, ${alpha})`,
        `rgba(88, 215, 255, ${alpha})`
      ];

      return palette[tint] ?? palette[0];
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      drawGrid();

      context.save();
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) {
          particle.x = width + 20;
        }

        if (particle.x > width + 20) {
          particle.x = -20;
        }

        if (particle.y < -20) {
          particle.y = height + 20;
        }

        if (particle.y > height + 20) {
          particle.y = -20;
        }

        if (pointer.current.active) {
          const dx = particle.x - pointer.current.x;
          const dy = particle.y - pointer.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160 && distance > 1) {
            particle.x += (dx / distance) * 0.28;
            particle.y += (dy / distance) * 0.28;
          }
        }

        context.beginPath();
        context.fillStyle = colorFor(particle.tint, 0.84);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        for (let j = index + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 118) {
            context.beginPath();
            context.strokeStyle = colorFor(particle.tint, 0.18 * (1 - distance / 118));
            context.lineWidth = 0.8;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      context.restore();
      animationFrame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true
      };
    };

    const handlePointerLeave = () => {
      pointer.current.active = false;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
