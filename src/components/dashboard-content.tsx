import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bonus } from "@/lib/types";
import { Download, PlayCircle } from "lucide-react";

interface DashboardContentProps {
  selectedBonus: Bonus | null;
}

export default function DashboardContent({ selectedBonus }: DashboardContentProps) {
  if (!selectedBonus) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-lg text-center p-8 rounded-xl shadow-lg">
          <CardTitle className="text-2xl mb-2">Bem-vindo(a) à sua Área de Membros!</CardTitle>
          <p className="text-muted-foreground">
            Selecione um item na barra lateral para começar.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Card className="rounded-xl shadow-lg overflow-hidden">
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
            <a href={selectedBonus.content.url} download>
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                <Download className="mr-2 h-5 w-5" />
                Baixar PDF
              </Button>
            </a>
          )}

          {selectedBonus.type === "video" && selectedBonus.content.url && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={selectedBonus.content.url}
                title="YouTube video player"
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
