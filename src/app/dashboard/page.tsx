
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogOut, X, Maximize, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ContentItem {
  id: number;
  title: string;
  image: string;
  imageHint: string;
  pdfUrl: string;
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Profecias Bíblicas e o Apocalipse",
    image: "https://i.imgur.com/cmcoLd8.png",
    imageHint: "man suit charisma",
    pdfUrl: "https://drive.google.com/file/d/1GaIyUaNIRt0_Ie2rbwOL0Is5UviZGUF8/preview",
  },
  {
    id: 2,
    title: "Compreendendo o Livro do Apocalipse",
    image: "https://i.imgur.com/TCZkfFo.png",
    imageHint: "ancient book scripture",
    pdfUrl: "https://drive.google.com/file/d/1BpX3jk-ntwleg_LgjxNBmcFMnm23Wwb6/preview",
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<ContentItem | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao Sair",
        description: "Não foi possível sair. Tente novamente.",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p>Carregando sua área de membros...</p>
      </div>
    );
  }

  if (selectedPdf) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="flex items-center justify-between p-4 border-b border-border bg-secondary flex-shrink-0">
          <Button variant="ghost" onClick={() => setSelectedPdf(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-lg font-semibold text-center truncate px-4">
            {selectedPdf.title}
          </h1>
          <Button
            variant="ghost"
            onClick={() => {
              const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement;
              if (iframe && iframe.requestFullscreen) {
                iframe.requestFullscreen();
              }
            }}
          >
            <Maximize className="mr-2 h-4 w-4" />
            Tela Cheia
          </Button>
        </header>
        <main className="flex-1 overflow-hidden">
          <div className="relative w-full h-full">
            <iframe
              id="pdf-iframe"
              src={selectedPdf.pdfUrl}
              className="absolute w-full border-0"
              style={{ height: 'calc(100% + 50px)', top: '-50px' }}
              title={selectedPdf.title}
              allowFullScreen
              allow="autoplay"
            ></iframe>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border bg-secondary">
        <div className="text-sm text-white">
          <p className="font-bold text-base">Bem-vindo(a) à sua área de membros!</p>
          <p>Estamos felizes em ter você aqui. Aproveite todo o conteúdo exclusivo preparado para o seu crescimento.</p>
        </div>
        <Button
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground flex-shrink-0"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {contentItems.map((item) => (
            <Card
              key={item.id}
              onClick={() => setSelectedPdf(item)}
              className="group rounded-xl shadow-lg overflow-hidden bg-secondary border border-accent/20 cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-accent/20 hover:-translate-y-1"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  data-ai-hint={item.imageHint}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto aspect-video transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                </div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-center text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground px-4">
            <p className="font-semibold">Precisa de ajuda?</p>
            <p>Entre em contato com nossa equipe pelo e-mail: <a href="mailto:suporte@ebooksexpress.shop" className="text-accent underline">suporte@ebooksexpress.shop</a>.</p>
            <p>Estamos prontos para te atender!</p>
        </div>
      </main>
       <footer className="text-center p-4 text-sm text-muted-foreground border-t border-border mt-auto">
          <p>&copy; {new Date().getFullYear()} Profecias Bíblicas e o Apocalipse. Todos os direitos reservados.</p>
       </footer>
    </div>
  );
}
