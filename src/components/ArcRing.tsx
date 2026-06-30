interface ArcRingProps {
  className?: string;
  size?: string; // e.g. "w-[340px] h-[340px] lg:w-[380px] lg:h-[380px]"
  opacity?: number; // e.g. 0.15 for 15% opacity
  strokeWidth?: number; // in pixels
}

export default function ArcRing({
  className = "",
  size = "w-[340px] h-[340px] lg:w-[380px] lg:h-[380px]",
  opacity = 0.15,
  strokeWidth = 1
}: ArcRingProps) {
  return (
    <div
      className={`absolute rounded-full border border-brand-gold pointer-events-none z-0 ${size} ${className}`}
      style={{
        opacity: opacity,
        borderWidth: `${strokeWidth}px`
      }}
    />
  );
}
