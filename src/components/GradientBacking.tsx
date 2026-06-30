interface GradientBackingProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function GradientBacking({
  className = "",
  width = "w-full lg:w-[50%]",
  height = "h-full"
}: GradientBackingProps) {
  return (
    <div
      className={`absolute right-0 top-0 bg-gradient-to-r from-transparent via-[#fbf7f1] to-[#e8d6bd] z-0 pointer-events-none ${width} ${height} ${className}`}
    />
  );
}
