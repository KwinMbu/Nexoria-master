import { Card } from "./ui/card";

export function Header() {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-start">
        <span className="text-2xl font-extrabold text-primary tracking-tight">Nexoria</span>
        <span className="text-xs text-muted-foreground font-medium mt-1">AI Productivity Platform</span>
      </div>
    </Card>
  );
}