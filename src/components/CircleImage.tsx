import Image from "next/image";

interface CircleImageProps {
  src: string;
  alt: string;
  size?: string; // e.g. "w-[280px] h-[280px] lg:w-[330px] lg:h-[330px]"
  className?: string;
  mixBlend?: boolean;
}

export default function CircleImage({
  src,
  alt,
  size = "w-[280px] h-[280px] lg:w-[330px] lg:h-[330px]",
  className = "",
  mixBlend = true
}: CircleImageProps) {
  return (
    <div
      className={`relative rounded-full bg-white/40 border-4 border-white/60 shadow-lg overflow-hidden z-10 flex items-end select-none ${size} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={360}
        height={360}
        priority
        className={`object-cover object-top scale-105 origin-top mt-2 w-full h-full ${
          mixBlend ? "mix-blend-multiply" : ""
        }`}
      />
    </div>
  );
}
