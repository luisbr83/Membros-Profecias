"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardContent from "@/components/dashboard-content";
import type { Bonus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const bonuses: Bonus[] = [
  {
    id: 1,
    title: "Módulo 1: A Essência do Carisma",
    image: "https://placehold.co/300x200.png",
    imageHint: "charisma essence",
    type: "video",
    content: {
      title: "Módulo 1: A Essência do Carisma",
      description: "Descubra os pilares fundamentais do carisma e como aplicá-los no seu dia a dia para criar conexões autênticas.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    id: 2,
    title: "Módulo 2: Comunicação Magnética",
    image: "https://placehold.co/300x200.png",
    imageHint: "magnetic communication",
    type: "video",
    content: {
      title: "Módulo 2: Comunicação Magnética",
      description: "Aprenda técnicas de comunicação verbal e não verbal para cativar e influenciar pessoas em qualquer situação.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    id: 3,
    title: "Ebook: O Guia do Carisma",
    image: "https://placehold.co/300x200.png",
    imageHint: "book charisma",
    type: "pdf",
    content: {
      title: "Ebook: O Guia Definitivo do Carisma",
      description: "Um guia completo com exercícios práticos para desenvolver seu carisma e transformar suas interações sociais e profissionais.",
      url: "/guia-carisma.pdf",
    },
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(bonuses[0] || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleSelectBonus = (bonus: Bonus) => {
    setSelectedBonus(bonus);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p>Carregando sua área de membros...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed lg:relative z-50 h-full transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
         <DashboardSidebar
          bonuses={bonuses}
          onSelectBonus={handleSelectBonus}
          onLogout={handleLogout}
          selectedBonusId={selectedBonus?.id}
        />
      </div>
     
      <main className="flex-1 flex flex-col overflow-y-auto">
         <div className="lg:hidden p-4 flex justify-between items-center border-b border-border bg-secondary">
          <h1 className="text-xl font-bold text-primary">O Poder do Carisma</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
           <DashboardContent selectedBonus={selectedBonus} />
        </div>
      </main>
    </div>
  );
}
