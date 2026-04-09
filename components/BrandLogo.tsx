export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-[#22d3ee]">IT</span>
      <span className="text-white">omuz</span>
    </span>
  );
}
