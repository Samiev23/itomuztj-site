export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-[var(--logo-it)] transition-colors">IT</span>
      <span className="text-[var(--logo-omuz)] transition-colors">omuz</span>
    </span>
  );
}
