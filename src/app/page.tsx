"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // onAuthStateChanged will handle redirection
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro de Autenticação",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <Card className="rounded-xl shadow-2xl border-accent/20 bg-secondary">
          <CardHeader className="p-0">
            <Image
              src="https://i.imgur.com/cmcoLd8.png"
              data-ai-hint="man suit charisma"
              alt="O Poder do Carisma"
              width={600}
              height={400}
              className="rounded-t-xl object-cover"
            />
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 p-6">
              <CardTitle className="text-center text-2xl font-bold text-white">
                {isLogin ? "Acessar Plataforma" : "Criar Conta"}
              </CardTitle>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white font-bold" disabled={isLoading}>
                {isLoading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 p-6 pt-0">
              <Button
                variant="link"
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent"
              >
                {isLogin
                  ? "Não tem uma conta? Criar agora"
                  : "Já tem uma conta? Fazer login"}
              </Button>
              <Link
                href="https://ebooksexpress.shop/pba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline hover:text-accent"
              >
                Ainda não é cliente? Clique aqui
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
