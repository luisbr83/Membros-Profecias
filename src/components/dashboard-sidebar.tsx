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
    <aside className="w-80 flex-shrink-0 bg-background shadow-lg flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold mb-4">📚 Área de Membros</h2>
        <Image
          src="https://placehold.co/400x200.png"
          data-ai-hint="book cover"
          alt="Capa do produto"
          width={400}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="px-2 text-sm font-semibold text-muted-foreground">Seus Bônus</h3>
        {bonuses.map((bonus) => (
          <Card
            key={bonus.id}
            onClick={() => onSelectBonus(bonus)}
            className={cn(
              "p-2 flex items-center gap-4 cursor-pointer hover:bg-muted transition-colors rounded-xl",
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
      <div className="p-4 mt-auto border-t">
        <Button
          variant="destructive"
          className="w-full"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da conta
        </Button>
      </div>
    </aside>
  );
}
