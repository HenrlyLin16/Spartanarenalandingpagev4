export function SpartanHelmet({ className, color = "#F59E0B" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Helmet base */}
      <path
        d="M32 8C20 8 12 16 12 28C12 32 12 36 14 40L18 52C18 54 20 56 22 56H42C44 56 46 54 46 52L50 40C52 36 52 32 52 28C52 16 44 8 32 8Z"
        fill={color}
        opacity="0.9"
      />
      {/* Face opening */}
      <rect
        x="20"
        y="24"
        width="24"
        height="20"
        rx="2"
        fill="black"
      />
      {/* Crest */}
      <path
        d="M28 4L32 2L36 4L32 12L28 4Z"
        fill={color}
      />
      {/* Mohawk/Plume */}
      <path
        d="M30 8L32 4L34 8L32 14Z"
        fill={color}
        opacity="0.7"
      />
      {/* Eye slits */}
      <rect x="24" y="30" width="6" height="3" rx="1" fill={color} opacity="0.3" />
      <rect x="34" y="30" width="6" height="3" rx="1" fill={color} opacity="0.3" />
      {/* Nose guard */}
      <rect x="31" y="34" width="2" height="8" fill={color} opacity="0.5" />
      {/* Cheek guards */}
      <path
        d="M18 44C18 40 20 36 22 34L22 46L18 44Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M46 44C46 40 44 36 42 34L42 46L46 44Z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  );
}
