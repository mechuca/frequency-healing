"use client";

import { useEffect, useRef } from "react";
import { tonePreview } from "@/lib/audio";

type OscilloscopeProps = {
  active?: boolean;
  height?: number;
  color?: string;
};

export function Oscilloscope({ active = false, height = 40, color = "currentColor" }: OscilloscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const data = new Uint8Array(1024);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const mid = height / 2;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.beginPath();

      const analyser = active ? tonePreview.analyser : null;
      if (analyser) {
        analyser.getByteTimeDomainData(data);
        for (let i = 0; i < data.length; i += 1) {
          const x = (i / (data.length - 1)) * width;
          const y = (data[i] / 255) * height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        frame += 0.02;
        for (let x = 0; x <= width; x += 4) {
          const y = mid + Math.sin(x * 0.06 + frame) * (active ? 8 : 2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    draw();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [active, color, height]);

  return <canvas ref={canvasRef} className="block w-full" style={{ height }} aria-hidden="true" />;
}
