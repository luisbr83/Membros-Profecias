"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardContent from "@/components/dashboard-content";
import type { Bonus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const bonuses: Bonus[] = [
  {
    id: 1,
    title: "Compreendendo o Apocalipse",
    image: "https://placehold.co/300x200.png",
    imageHint: "book cover",
    type: "pdf",
    content: {
      title: "Bônus 1: Compreendendo o Livro do Apocalipse",
      description:
        "Este guia aprofundado oferece uma análise clara e concisa das profecias e simbolismos encontrados no Livro do Apocalipse, ajudando você a desvendar seus mistérios.",
      url: "/bonus1.pdf",
    },
  },
  {
    id: 2,
    title: "Exemplo de Vídeo",
    image: "https://placehold.co/300x200.png",
    imageHint: "video thumbnail",
    type: "video",
    content: {
      title: "Bônus 2: Exemplo de Vídeo",
      description:
        "Assista a uma aula exclusiva que explora os principais temas do apocalipse e seu impacto nos dias de hoje. (Este é um vídeo de exemplo).",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video
    },
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(bonuses[0] || null);
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
      // The onAuthStateChanged listener will handle the redirect.
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao Sair",
        description: "Não foi possível sair da sua conta. Tente novamente.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando sua área de membros...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary">
      <DashboardSidebar
        bonuses={bonuses}
        onSelectBonus={setSelectedBonus}
        onLogout={handleLogout}
        selectedBonusId={selectedBonus?.id}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <DashboardContent selectedBonus={selectedBonus} />
      </main>
    </div>
  );
}
