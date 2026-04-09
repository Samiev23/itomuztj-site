export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-0.5 font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-[var(--logo-it)] transition-colors">IT</span>
      <span className="text-[var(--logo-omuz)] transition-colors">omuz</span>
      <span className="translate-y-px text-[0.68em] font-medium text-foreground-muted transition-colors">
        TJ
      </span>
    </span>
  );
}
