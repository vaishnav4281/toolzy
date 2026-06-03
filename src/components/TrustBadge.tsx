/**
 * TrustBadge — rendered under every tool input.
 * Re-states the privacy guarantee in plain English to convert hesitant users.
 */
export function TrustBadge() {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
      <span aria-hidden>🔒</span>
      <span>
        <strong className="text-foreground">100% Private.</strong> Processed locally on your device.
        Your data never touches a server.
      </span>
    </div>
  );
}