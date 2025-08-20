
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bonus } from "@/lib/types";
import { Download } from "lucide-react";

interface DashboardContentProps {
  selectedBonus: Bonus | null;
}

export default function DashboardContent({ selectedBonus }: DashboardContentProps) {
  if (!selectedBonus) {
    return (
      <div className="flex items-center justify-center h-full text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Bem-vindo(a) à <span className="text-primary">Profecias Bíblicas e o Apocalipse</span>!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Selecione um módulo na barra lateral para iniciar sua preparação para o fim dos tempos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Card className="rounded-xl shadow-lg overflow-hidden bg-secondary border border-accent/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            {selectedBonus.content.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            {selectedBonus.content.description}
          </p>

          {selectedBonus.type === "pdf" && selectedBonus.content.url && (
            <div className="aspect-video w-full">
               <iframe 
                src={`${selectedBonus.content.url}#toolbar=0`} 
                className="w-full h-full rounded-lg border-2 border-primary shadow-2xl shadow-primary/20"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {selectedBonus.type === "video" && selectedBonus.content.url && (
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-primary shadow-2xl shadow-primary/20">
              <iframe
                className="w-full h-full"
                src={selectedBonus.content.url}
                title="Player de vídeo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
