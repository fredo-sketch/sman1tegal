"use client"; 

import { useState, useEffect } from "react";

export default function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
        const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };
    
    window.requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}