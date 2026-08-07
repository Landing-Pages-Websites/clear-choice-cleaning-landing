"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

// Fade-up 12px / 420ms on first intersection (§ motion spec). The visual
// state is driven by [data-reveal] rules in globals.css, which also force the
// final state immediately under prefers-reduced-motion.
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Sibling stagger in ms — brief typically passes i * 60. */
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={`${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
