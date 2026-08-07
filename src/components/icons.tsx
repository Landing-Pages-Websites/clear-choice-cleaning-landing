import type { JSX, SVGProps } from "react";

// Single icon family — lucide-style stroked SVGs (24×24, currentColor, 1.75 stroke).
// Never emoji. Keys map to the `icon` strings used in content.ts.

type IconPaths = JSX.Element;

const PATHS: Record<string, IconPaths> = {
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  star: (
    <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6L12 17.3 6.7 20.1l1-6L3.4 9.9l6-.9Z" />
  ),
  spray: (
    <>
      <path d="M9 11h5a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a2 2 0 0 1 2-2Z" />
      <path d="M9 11V7h4V4h-2" />
      <path d="M17 5h.01M20 4h.01M19 8h.01M21 7h.01" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 10 6.5C15 5 17 4.5 19 2c1.2 2.8.6 6-1.6 9S13.5 20 11 20Z" />
      <path d="M3 22c1.6-3.4 4.3-6 8-7.5" />
    </>
  ),
  boxes: (
    <>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
      <path d="m3 7 9 5 9-5M12 12v10" />
    </>
  ),
  hardhat: (
    <>
      <path d="M3 17a9 9 0 0 1 18 0" />
      <path d="M2 18h20" />
      <path d="M9 6.5A3 3 0 0 1 15 6.5V10" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  phone: (
    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9 19 10.5 13.8 12 12 17.5 10.2 12 5 10.5 10.2 9Z" />
      <path d="M18.5 4 19 6l2 .5-2 .5-.5 2-.5-2-2-.5 2-.5Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.3-4.3M4 5v4h4" />
      <path d="M4 13a8 8 0 0 0 14.3 4.3M20 19v-4h-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 9h4a1 1 0 0 1 1 1v11" />
      <path d="M3 21h18M7.5 8h.01M11 8h.01M7.5 12h.01M11 12h.01M7.5 16h.01M11 16h.01" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  chat: (
    <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-4 4Z" />
  ),
  receipt: (
    <>
      <path d="M5 3v18l2-1.4L9 21l2-1.4L13 21l2-1.4L17 21l2-1.4V3l-2 1.4L15 3l-2 1.4L11 3 9 4.4 7 3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6a1 1 0 0 1 1-1h11v11H2Z" />
      <path d="M14 8h4l3 3v4h-7Z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  quote: (
    <path d="M10 6H6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3M20 6h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h3v1a3 3 0 0 1-3 3" />
  ),
  arrow: <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />,
  check: <path d="m4.5 12.75 6 6 9-13.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 4.5v15m7.5-7.5h-15" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof PATHS | string;
}

export function Icon({ name, className, ...rest }: IconProps): JSX.Element | null {
  const path = PATHS[name];
  if (!path) return null;
  // Default size guards against a caller that omits a size class.
  const cls = className ?? "h-5 w-5";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cls}
      {...rest}
    >
      {path}
    </svg>
  );
}
