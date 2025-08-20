
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import type { Bonus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  bonuses: Bonus[];
  onSelectBonus: (bonus: Bonus) => void;
  onLogout: () => void;
  selectedBonusId?: number | null;
}

export default function DashboardSidebar({
  bonuses,
  onSelectBonus,
  onLogout,
  selectedBonusId,
}: DashboardSidebarProps) {
  return (
    <aside className="w-80 flex-shrink-0 bg-secondary shadow-lg flex flex-col h-full border-r border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold mb-4 text-white">Seja Bem-Vindo (a)</h2>
        <Image
          src="https://i.imgur.com/cmcoLd8.png"
          data-ai-hint="man suit charisma"
          alt="Capa do produto"
          width={400}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Módulos</h3>
        {bonuses.map((bonus) => (
          <Card
            key={bonus.id}
            onClick={() => onSelectBonus(bonus)}
            className={cn(
              "p-3 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-xl border-2 border-transparent bg-muted/20",
              selectedBonusId === bonus.id && "bg-muted border-primary"
            )}
          >
            <Image
              src={bonus.image}
              data-ai-hint={bonus.imageHint}
              alt={bonus.title}
              width={80}
              height={50}
              className="rounded-md object-cover"
            />
            <h4 className="font-semibold text-sm flex-1">{bonus.title}</h4>
          </Card>
        ))}
      </div>
      <div className="p-4 mt-auto border-t border-border">
        <Button
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da conta
        </Button>
      </div>
    </aside>
  );
}
