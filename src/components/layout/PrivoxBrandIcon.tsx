type PrivoxBrandIconProps = {
  className?: string;
};

export default function PrivoxBrandIcon({ className = '' }: PrivoxBrandIconProps) {
  return (
    <span className={`inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#101820] ${className}`}>
      <img
        src="/icons/privox-ptt-icon-192.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
